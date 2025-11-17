/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type PipelineStage } from 'mongoose'

import type {
  ReportFiltersType,
  ReportsSectionType
} from '@restaurants/application/reports/@schemas/report-filter.schema'
import { OrderModel } from '@restaurants/domain/orders/orders.schema'

export interface ReportsDatasetOutput {
  summary: {
    totalRevenue: number
    totalOrders: number
    averageTicket: number
    exportGeneratedAt: string
    activeCoupons: number
  }
  orders?: {
    kpis: Record<string, number>
    statusDistribution: Array<{ status: string; count: number; color: string }>
    timeSeries: Array<{ period: string; revenue: number; orders: number }>
  }
  items?: {
    topByRevenue: Array<{
      id: string
      name: string
      type: 'menu-item' | 'combo'
      revenue: number
      quantity: number
    }>
    bottomByRevenue: Array<{
      id: string
      name: string
      type: 'menu-item' | 'combo'
      revenue: number
      quantity: number
    }>
  }
  categories?: {
    contribution: Array<{
      categoryId: string
      name: string
      revenue: number
      percentage: number
    }>
    monthOverMonth: Array<{
      categoryId: string
      name: string
      deltaPercentage: number
    }>
  }
  customers?: {
    segments: Array<{
      segment: 'new' | 'returning'
      customers: number
      revenue: number
    }>
    lifetimeValueBands: Array<{
      band: 'low' | 'medium' | 'high'
      customers: number
      averageLifetimeValue: number
    }>
    topCustomers: Array<{
      clientId: string
      name: string
      phone: string
      revenue: number
      orders: number
    }>
  }
  operations?: {
    preparationTimeAvg: number
    fulfillmentTimeAvg: number
    cancellationCount: number
    timeline: Array<{ status: string; averageMinutes: number }>
  }
  coupons?: {
    usage: Array<{
      code: string
      name: string
      redemptions: number
      redemptionRate: number
      revenueImpact: number
      outstandingLiability: number
    }>
  }
}

export interface GetReportsDataQuery {
  execute: (filters: ReportFiltersType, sections?: ReportsSectionType[]) => Promise<ReportsDatasetOutput>
}

export class GetReportsDataQueryMongoose implements GetReportsDataQuery {
  async execute(filters: ReportFiltersType, sections?: ReportsSectionType[]): Promise<ReportsDatasetOutput> {
    const startDate = new Date(filters.dateRange.start)
    const endDate = new Date(filters.dateRange.end)
    const requestedSections = sections || [
      'summary',
      'orders',
      'items',
      'categories',
      'customers',
      'operations',
      'coupons'
    ]
    const matchStage = this.buildMatchStage(filters, startDate, endDate)
    const facetStages = this.buildFacetStages(filters, startDate, endDate, requestedSections)
    const pipeline: PipelineStage[] = [matchStage, { $facet: facetStages } as PipelineStage]
    const results = await OrderModel.aggregate(pipeline).exec()
    const result = results[0] as Record<string, unknown>
    return this.transformResult(result, requestedSections)
  }

  private buildMatchStage(filters: ReportFiltersType, startDate: Date, endDate: Date): PipelineStage.Match {
    const match: Record<string, unknown> = {
      restaurantId: filters.restaurantId,
      createdAt: { $gte: startDate, $lte: endDate }
    }
    if (filters.operationTypes && filters.operationTypes.length > 0) {
      match.orderType = { $in: filters.operationTypes }
    }
    if (filters.couponCodes && filters.couponCodes.length > 0) {
      match.couponCode = { $in: filters.couponCodes }
    }
    return { $match: match }
  }

  private buildFacetStages(
    filters: ReportFiltersType,
    startDate: Date,
    endDate: Date,
    sections: ReportsSectionType[]
  ): Record<string, PipelineStage[]> {
    const facets: Record<string, PipelineStage[]> = {}
    if (sections.includes('summary')) {
      facets.summary = [
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$total' },
            totalOrders: { $sum: 1 },
            activeCoupons: { $addToSet: '$couponCode' }
          }
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            totalOrders: 1,
            averageTicket: { $divide: ['$totalRevenue', '$totalOrders'] },
            activeCoupons: {
              $size: {
                $filter: {
                  input: '$activeCoupons',
                  cond: { $ne: ['$$this', null] }
                }
              }
            }
          }
        }
      ]
    }
    if (sections.includes('orders')) {
      facets.orders_kpis = [
        {
          $group: {
            _id: null,
            'Total de Pedidos': { $sum: 1 },
            'Receita Total': { $sum: '$total' },
            'Ticket Médio': { $avg: '$total' },
            'Pedidos Cancelados': {
              $sum: { $cond: [{ $eq: ['$status', 'canceled'] }, 1, 0] }
            }
          }
        },
        {
          $project: {
            _id: 0,
            'Total de Pedidos': '$Total de Pedidos',
            'Receita Total': '$Receita Total',
            'Ticket Médio': '$Ticket Médio',
            'Taxa de Cancelamento': {
              $multiply: [{ $divide: ['$Pedidos Cancelados', '$Total de Pedidos'] }, 100]
            }
          }
        }
      ]
      facets.orders_statusDistribution = [
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            status: this.translateStatus('$_id'),
            count: 1,
            color: this.getStatusColor('$_id')
          }
        }
      ]
      facets.orders_timeSeries = this.buildTimeSeriesPipeline(filters.chartGranularity || 'daily')
    }
    if (sections.includes('items')) {
      const itemsBasePipeline: PipelineStage[] = [{ $unwind: '$items' }]
      if (filters.categoryIds && filters.categoryIds.length > 0) {
        itemsBasePipeline.push({
          $match: {
            'items.categoryId': { $in: filters.categoryIds }
          }
        })
      }
      if (filters.menuItemIds && filters.menuItemIds.length > 0) {
        itemsBasePipeline.push({
          $match: {
            'items.itemId': { $in: filters.menuItemIds },
            'items.itemType': 'menu-item'
          }
        })
      }
      if (filters.comboIds && filters.comboIds.length > 0) {
        itemsBasePipeline.push({
          $match: {
            'items.itemId': { $in: filters.comboIds },
            'items.itemType': 'combo'
          }
        })
      }
      itemsBasePipeline.push(
        {
          $group: {
            _id: {
              itemId: '$items.itemId',
              name: '$items.name',
              type: '$items.itemType'
            },
            revenue: {
              $sum: { $multiply: ['$items.price', '$items.quantity'] }
            },
            quantity: { $sum: '$items.quantity' }
          }
        },
        {
          $project: {
            _id: 0,
            id: '$_id.itemId',
            name: '$_id.name',
            type: '$_id.type',
            revenue: 1,
            quantity: 1
          }
        }
      )
      facets.items_topByRevenue = [...itemsBasePipeline, { $sort: { revenue: -1 } }, { $limit: 10 }]
      facets.items_bottomByRevenue = [...itemsBasePipeline, { $sort: { revenue: 1 } }, { $limit: 10 }]
    }
    if (sections.includes('categories')) {
      const categoriesBasePipeline: PipelineStage[] = [
        { $unwind: '$items' },
        {
          $match: {
            'items.categoryId': { $exists: true, $ne: null }
          }
        }
      ]
      if (filters.categoryIds && filters.categoryIds.length > 0) {
        categoriesBasePipeline.push({
          $match: {
            'items.categoryId': { $in: filters.categoryIds }
          }
        })
      }
      categoriesBasePipeline.push(
        {
          $group: {
            _id: '$items.categoryId',
            revenue: {
              $sum: { $multiply: ['$items.price', '$items.quantity'] }
            }
          }
        },
        {
          $addFields: {
            categoryObjectId: { $toObjectId: '$_id' }
          }
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryObjectId',
            foreignField: '_id',
            as: 'category'
          }
        },
        { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 0,
            categoryId: '$_id',
            name: { $ifNull: ['$category.name', 'Unknown'] },
            revenue: 1
          }
        }
      )
      facets.categories_contribution = [
        ...categoriesBasePipeline,
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$revenue' },
            categories: { $push: '$$ROOT' }
          }
        },
        { $unwind: '$categories' },
        {
          $project: {
            _id: 0,
            categoryId: '$categories.categoryId',
            name: '$categories.name',
            revenue: '$categories.revenue',
            percentage: {
              $multiply: [{ $divide: ['$categories.revenue', '$totalRevenue'] }, 100]
            }
          }
        },
        { $sort: { revenue: -1 } }
      ]
      facets.categories_monthOverMonth = [
        ...categoriesBasePipeline,
        {
          $project: {
            _id: 0,
            categoryId: 1,
            name: 1
          }
        },
        {
          $addFields: {
            deltaPercentage: 0
          }
        }
      ]
    }
    if (sections.includes('customers')) {
      facets.customers_segments = this.buildCustomerSegmentsPipeline(startDate)
      facets.customers_lifetimeValueBands = this.buildLifetimeValueBandsPipeline()
      facets.customers_topCustomers = [
        {
          $group: {
            _id: {
              clientId: '$clientId',
              name: '$customer.name',
              phone: '$customer.phone'
            },
            revenue: { $sum: '$total' },
            orders: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            clientId: '$_id.clientId',
            name: '$_id.name',
            phone: '$_id.phone',
            revenue: 1,
            orders: 1
          }
        },
        { $sort: { revenue: -1 } },
        { $limit: 10 }
      ]
    }
    if (sections.includes('operations')) {
      facets.operations_cancellations = [
        {
          $group: {
            _id: null,
            cancellationCount: {
              $sum: { $cond: [{ $eq: ['$status', 'canceled'] }, 1, 0] }
            }
          }
        },
        {
          $project: {
            _id: 0,
            cancellationCount: 1
          }
        }
      ]
      facets.operations_preparationTime = [
        {
          $lookup: {
            from: 'order_status_histories',
            let: { orderId: { $toString: '$_id' } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$orderId', '$$orderId'] },
                  status: { $in: ['received', 'preparing', 'confirmed'] }
                }
              },
              { $sort: { changedAt: 1 } }
            ],
            as: 'prepHistory'
          }
        },
        {
          $addFields: {
            prepTime: {
              $cond: {
                if: { $gte: [{ $size: '$prepHistory' }, 2] },
                then: {
                  $divide: [
                    {
                      $subtract: [
                        { $arrayElemAt: ['$prepHistory.changedAt', 1] },
                        { $arrayElemAt: ['$prepHistory.changedAt', 0] }
                      ]
                    },
                    60000
                  ]
                },
                else: null
              }
            }
          }
        },
        {
          $match: {
            prepTime: { $ne: null }
          }
        },
        {
          $group: {
            _id: null,
            avgPrepTime: { $avg: '$prepTime' },
            count: { $sum: 1 }
          }
        }
      ]
      facets.operations_fulfillmentTime = [
        {
          $lookup: {
            from: 'order_status_histories',
            let: { orderId: { $toString: '$_id' } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$orderId', '$$orderId'] },
                  status: { $in: ['ready', 'delivered', 'sent_for_delivery'] }
                }
              },
              { $sort: { changedAt: 1 } }
            ],
            as: 'fulfillHistory'
          }
        },
        {
          $addFields: {
            fulfillTime: {
              $cond: {
                if: { $gte: [{ $size: '$fulfillHistory' }, 2] },
                then: {
                  $divide: [
                    {
                      $subtract: [
                        { $arrayElemAt: ['$fulfillHistory.changedAt', 1] },
                        { $arrayElemAt: ['$fulfillHistory.changedAt', 0] }
                      ]
                    },
                    60000
                  ]
                },
                else: null
              }
            }
          }
        },
        {
          $match: {
            fulfillTime: { $ne: null }
          }
        },
        {
          $group: {
            _id: null,
            avgFulfillTime: { $avg: '$fulfillTime' },
            count: { $sum: 1 }
          }
        }
      ]
      facets.operations_timeline = [
        {
          $lookup: {
            from: 'order_status_histories',
            let: { orderId: { $toString: '$_id' } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$orderId', '$$orderId'] }
                }
              },
              { $sort: { changedAt: 1 } }
            ],
            as: 'statusHistory'
          }
        },
        {
          $addFields: {
            hasHistory: { $gte: [{ $size: '$statusHistory' }, 2] }
          }
        },
        {
          $match: {
            hasHistory: true
          }
        },
        {
          $unwind: {
            path: '$statusHistory',
            includeArrayIndex: 'statusIndex'
          }
        },
        {
          $group: {
            _id: '$_id',
            transitions: {
              $push: {
                status: '$statusHistory.status',
                changedAt: '$statusHistory.changedAt',
                index: '$statusIndex'
              }
            }
          }
        },
        {
          $project: {
            transitions: {
              $map: {
                input: {
                  $range: [0, { $subtract: [{ $size: '$transitions' }, 1] }]
                },
                as: 'idx',
                in: {
                  fromStatus: {
                    $arrayElemAt: ['$transitions.status', '$$idx']
                  },
                  toStatus: {
                    $arrayElemAt: ['$transitions.status', { $add: ['$$idx', 1] }]
                  },
                  duration: {
                    $divide: [
                      {
                        $subtract: [
                          {
                            $arrayElemAt: ['$transitions.changedAt', { $add: ['$$idx', 1] }]
                          },
                          { $arrayElemAt: ['$transitions.changedAt', '$$idx'] }
                        ]
                      },
                      60000
                    ]
                  }
                }
              }
            }
          }
        },
        {
          $unwind: '$transitions'
        },
        {
          $group: {
            _id: {
              from: '$transitions.fromStatus',
              to: '$transitions.toStatus'
            },
            avgDuration: { $avg: '$transitions.duration' }
          }
        },
        {
          $project: {
            _id: 0,
            status: {
              $concat: [this.translateStatus('$_id.from'), ' → ', this.translateStatus('$_id.to')]
            },
            averageMinutes: { $round: ['$avgDuration', 1] }
          }
        },
        {
          $sort: { status: 1 }
        }
      ]
    }
    if (sections.includes('coupons')) {
      facets.coupons = [
        {
          $match: {
            couponCode: { $exists: true, $ne: null }
          }
        },
        {
          $group: {
            _id: {
              code: '$couponCode',
              discount: { $ifNull: ['$couponDiscount', 0] }
            },
            redemptions: { $sum: 1 },
            revenueImpact: { $sum: { $ifNull: ['$couponDiscount', 0] } }
          }
        },
        {
          $project: {
            _id: 0,
            code: '$_id.code',
            name: '$_id.code',
            redemptions: 1,
            redemptionRate: 100,
            revenueImpact: 1
          }
        },
        {
          $addFields: {
            outstandingLiability: 0
          }
        },
        { $sort: { redemptions: -1 } }
      ]
    }
    return facets
  }

  private buildTimeSeriesPipeline(granularity: 'daily' | 'weekly' | 'monthly'): PipelineStage[] {
    let dateFormat = '%Y-%m-%d'
    if (granularity === 'weekly') {
      dateFormat = '%Y-W%V'
    } else if (granularity === 'monthly') {
      dateFormat = '%Y-%m'
    }
    return [
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: '$createdAt' } },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          period: '$_id',
          revenue: 1,
          orders: 1
        }
      },
      { $sort: { period: 1 } }
    ]
  }

  private buildCustomerSegmentsPipeline(startDate: Date): PipelineStage[] {
    return [
      {
        $lookup: {
          from: 'orders',
          let: { clientId: '$clientId', startDate: startDate },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$clientId', '$$clientId'] }, { $lt: ['$createdAt', '$$startDate'] }]
                }
              }
            },
            { $limit: 1 }
          ],
          as: 'previousOrders'
        }
      },
      {
        $addFields: {
          segment: {
            $cond: [{ $eq: [{ $size: '$previousOrders' }, 0] }, 'new', 'returning']
          }
        }
      },
      {
        $group: {
          _id: '$segment',
          customers: { $addToSet: '$clientId' },
          revenue: { $sum: '$total' }
        }
      },
      {
        $project: {
          _id: 0,
          segment: '$_id',
          customers: { $size: '$customers' },
          revenue: 1
        }
      }
    ]
  }

  private buildLifetimeValueBandsPipeline(): PipelineStage[] {
    return [
      {
        $group: {
          _id: '$clientId',
          totalSpent: { $sum: '$total' }
        }
      },
      {
        $addFields: {
          band: {
            $switch: {
              branches: [
                { case: { $lt: ['$totalSpent', 100] }, then: 'low' },
                { case: { $lt: ['$totalSpent', 500] }, then: 'medium' }
              ],
              default: 'high'
            }
          }
        }
      },
      {
        $group: {
          _id: '$band',
          customers: { $sum: 1 },
          totalLifetimeValue: { $sum: '$totalSpent' }
        }
      },
      {
        $project: {
          _id: 0,
          band: '$_id',
          customers: 1,
          averageLifetimeValue: {
            $divide: ['$totalLifetimeValue', '$customers']
          }
        }
      }
    ]
  }

  private getStatusColor(status: string): Record<string, unknown> {
    return {
      $switch: {
        branches: [
          { case: { $eq: [status, 'pending'] }, then: '#FFA500' },
          { case: { $eq: [status, 'confirmed'] }, then: '#4169E1' },
          { case: { $eq: [status, 'preparing'] }, then: '#9370DB' },
          { case: { $eq: [status, 'ready'] }, then: '#32CD32' },
          { case: { $eq: [status, 'delivered'] }, then: '#228B22' },
          { case: { $eq: [status, 'canceled'] }, then: '#DC143C' }
        ],
        default: '#808080'
      }
    }
  }

  private translateStatus(status: string): Record<string, unknown> {
    return {
      $switch: {
        branches: [
          { case: { $eq: [status, 'scheduled'] }, then: 'Agendado' },
          { case: { $eq: [status, 'received'] }, then: 'Recebido' },
          { case: { $eq: [status, 'confirmed'] }, then: 'Confirmado' },
          { case: { $eq: [status, 'in_production'] }, then: 'Em Produção' },
          { case: { $eq: [status, 'preparing'] }, then: 'Preparando' },
          { case: { $eq: [status, 'ready'] }, then: 'Pronto' },
          {
            case: { $eq: [status, 'sent_for_delivery'] },
            then: 'Saiu para Entrega'
          },
          { case: { $eq: [status, 'delivered'] }, then: 'Entregue' },
          { case: { $eq: [status, 'cancelled'] }, then: 'Cancelado' },
          { case: { $eq: [status, 'canceled'] }, then: 'Cancelado' }
        ],
        default: status
      }
    }
  }

  private transformResult(result: Record<string, unknown>, sections: ReportsSectionType[]): ReportsDatasetOutput {
    const output: ReportsDatasetOutput = {
      summary: {
        totalRevenue: 0,
        totalOrders: 0,
        averageTicket: 0,
        exportGeneratedAt: new Date().toISOString(),
        activeCoupons: 0
      }
    }
    if (sections.includes('summary')) {
      const summaryData = Array.isArray(result.summary) && result.summary.length > 0 ? result.summary[0] : {}
      const summaryObj = summaryData as Record<string, unknown>
      output.summary = {
        totalRevenue: typeof summaryObj.totalRevenue === 'number' ? summaryObj.totalRevenue : 0,
        totalOrders: typeof summaryObj.totalOrders === 'number' ? summaryObj.totalOrders : 0,
        averageTicket: typeof summaryObj.averageTicket === 'number' ? summaryObj.averageTicket : 0,
        exportGeneratedAt: new Date().toISOString(),
        activeCoupons: typeof summaryObj.activeCoupons === 'number' ? summaryObj.activeCoupons : 0
      }
    }
    if (sections.includes('orders')) {
      const kpisData = Array.isArray(result.orders_kpis) && result.orders_kpis.length > 0 ? result.orders_kpis[0] : {}
      output.orders = {
        kpis: kpisData as Record<string, number>,
        statusDistribution: (result.orders_statusDistribution || []) as Array<{
          status: string
          count: number
          color: string
        }>,
        timeSeries: (result.orders_timeSeries || []) as Array<{
          period: string
          revenue: number
          orders: number
        }>
      }
    }
    if (sections.includes('items')) {
      output.items = {
        topByRevenue: (result.items_topByRevenue || []) as Array<{
          id: string
          name: string
          type: 'menu-item' | 'combo'
          revenue: number
          quantity: number
        }>,
        bottomByRevenue: (result.items_bottomByRevenue || []) as Array<{
          id: string
          name: string
          type: 'menu-item' | 'combo'
          revenue: number
          quantity: number
        }>
      }
    }
    if (sections.includes('categories')) {
      output.categories = {
        contribution: (result.categories_contribution || []) as Array<{
          categoryId: string
          name: string
          revenue: number
          percentage: number
        }>,
        monthOverMonth: (result.categories_monthOverMonth || []) as Array<{
          categoryId: string
          name: string
          deltaPercentage: number
        }>
      }
    }
    if (sections.includes('customers')) {
      output.customers = {
        segments: (result.customers_segments || []) as Array<{
          segment: 'new' | 'returning'
          customers: number
          revenue: number
        }>,
        lifetimeValueBands: (result.customers_lifetimeValueBands || []) as Array<{
          band: 'low' | 'medium' | 'high'
          customers: number
          averageLifetimeValue: number
        }>,
        topCustomers: (result.customers_topCustomers || []) as Array<{
          clientId: string
          name: string
          phone: string
          revenue: number
          orders: number
        }>
      }
    }
    if (sections.includes('operations')) {
      const cancellations =
        Array.isArray(result.operations_cancellations) && result.operations_cancellations.length > 0
          ? result.operations_cancellations[0]
          : {}
      const cancellationData = cancellations as Record<string, unknown>
      const prepTimeData =
        Array.isArray(result.operations_preparationTime) && result.operations_preparationTime.length > 0
          ? result.operations_preparationTime[0]
          : {}
      const prepTime = prepTimeData as Record<string, unknown>
      const fulfillTimeData =
        Array.isArray(result.operations_fulfillmentTime) && result.operations_fulfillmentTime.length > 0
          ? result.operations_fulfillmentTime[0]
          : {}
      const fulfillTime = fulfillTimeData as Record<string, unknown>
      const timelineData = Array.isArray(result.operations_timeline) ? result.operations_timeline : []
      const timeline = timelineData as Array<{
        status: string
        averageMinutes: number
      }>
      output.operations = {
        preparationTimeAvg: typeof prepTime.avgPrepTime === 'number' ? Math.round(prepTime.avgPrepTime) : 0,
        fulfillmentTimeAvg: typeof fulfillTime.avgFulfillTime === 'number' ? Math.round(fulfillTime.avgFulfillTime) : 0,
        cancellationCount:
          typeof cancellationData.cancellationCount === 'number' ? cancellationData.cancellationCount : 0,
        timeline: timeline.map((item) => ({
          status: item.status || '',
          averageMinutes: typeof item.averageMinutes === 'number' ? item.averageMinutes : 0
        }))
      }
    }
    if (sections.includes('coupons')) {
      output.coupons = {
        usage: (result.coupons || []) as Array<{
          code: string
          name: string
          redemptions: number
          redemptionRate: number
          revenueImpact: number
          outstandingLiability: number
        }>
      }
    }
    return output
  }
}
