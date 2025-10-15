import { type Model, type PipelineStage } from 'mongoose'

import { type OrderDocument } from '@restaurants/domain/orders/orders.schema'

export interface GetOrdersQueryInput {
  restaurantId: string
  operationId?: string
  status?: string
  orderType?: string
  paymentMethod?: string
  searchMask?: string
  sortField: string
  sortOrder: 'asc' | 'desc'
  page: number
  rowsPerPage: number
}

export class GetOrdersQueryBuilderMongoose {
  private readonly orderModel: Model<OrderDocument>
  private pipeline: PipelineStage[] = []
  private countPipeline: PipelineStage[] = []

  private constructor(orderModel: Model<OrderDocument>) {
    this.orderModel = orderModel
  }

  static init(orderModel: Model<OrderDocument>): GetOrdersQueryBuilderMongoose {
    return new GetOrdersQueryBuilderMongoose(orderModel)
  }

  restaurantId(restaurantId: string): GetOrdersQueryBuilderMongoose {
    this.pipeline.push({ $match: { restaurantId } })
    this.countPipeline.push({ $match: { restaurantId } })
    return this
  }

  operationId(operationId?: string): GetOrdersQueryBuilderMongoose {
    if (operationId) {
      this.pipeline.push({ $match: { operationId } })
      this.countPipeline.push({ $match: { operationId } })
    }
    return this
  }

  status(status?: string): GetOrdersQueryBuilderMongoose {
    if (status) {
      this.pipeline.push({ $match: { status } })
      this.countPipeline.push({ $match: { status } })
    }
    return this
  }

  orderType(orderType?: string): GetOrdersQueryBuilderMongoose {
    if (orderType) {
      this.pipeline.push({ $match: { orderType } })
      this.countPipeline.push({ $match: { orderType } })
    }
    return this
  }

  paymentMethod(paymentMethod?: string): GetOrdersQueryBuilderMongoose {
    if (paymentMethod) {
      this.pipeline.push({ $match: { paymentMethod } })
      this.countPipeline.push({ $match: { paymentMethod } })
    }
    return this
  }

  search(searchMask?: string): GetOrdersQueryBuilderMongoose {
    if (searchMask) {
      const searchRegex = { $regex: searchMask, $options: 'i' }
      this.pipeline.push({
        $match: {
          $or: [
            { code: searchRegex },
            { 'customer.name': searchRegex },
            { 'customer.email': searchRegex },
            { 'customer.phone': searchRegex }
          ]
        }
      })
      this.countPipeline.push({
        $match: {
          $or: [
            { code: searchRegex },
            { 'customer.name': searchRegex },
            { 'customer.email': searchRegex },
            { 'customer.phone': searchRegex }
          ]
        }
      })
    }
    return this
  }

  includeInactive(includeInactive: boolean): GetOrdersQueryBuilderMongoose {
    if (!includeInactive) {
      this.pipeline.push({ $match: { isActive: true } })
      this.countPipeline.push({ $match: { isActive: true } })
    }
    return this
  }

  sort(sortField: string, sortOrder: 'asc' | 'desc'): GetOrdersQueryBuilderMongoose {
    const sortDirection = sortOrder === 'asc' ? 1 : -1
    this.pipeline.push({ $sort: { [sortField]: sortDirection } })
    return this
  }

  paginate(page: number, rowsPerPage: number): GetOrdersQueryBuilderMongoose {
    const skip = (page - 1) * rowsPerPage
    this.pipeline.push({ $skip: skip }, { $limit: rowsPerPage })
    return this
  }

  async execute(): Promise<{ documents: OrderDocument[]; totalCount: number }> {
    this.countPipeline.push({ $count: 'total' })
    const [countResult] = (await this.orderModel.aggregate(this.countPipeline).exec()) as Array<{ total: number }>
    const totalCount = countResult?.total ?? 0
    const documents = (await this.orderModel.aggregate(this.pipeline).exec()) as OrderDocument[]
    return { documents, totalCount }
  }
}
