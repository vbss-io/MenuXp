import { inject } from '@api/infra/dependency-injection/registry'

import {
  GetOrdersQueryBuilderMongoose,
  type GetOrdersQueryInput
} from '@restaurants/application/orders/@queries/get-orders.builder'
import { Order } from '@restaurants/domain/orders/orders.entity'
import { OrderModel } from '@restaurants/domain/orders/orders.schema'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'

export interface GetOrdersQueryOutput {
  total: number
  orders: Order[]
}

export interface GetOrdersQuery {
  execute: (input: GetOrdersQueryInput) => Promise<GetOrdersQueryOutput>
}

export class GetOrdersQueryMongoose implements GetOrdersQuery {
  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  async execute(input: GetOrdersQueryInput): Promise<GetOrdersQueryOutput> {
    const query = GetOrdersQueryBuilderMongoose.init(OrderModel)
      .restaurantId(input.restaurantId)
      .operationId(input.operationId)
      .status(input.status)
      .orderType(input.orderType)
      .paymentMethod(input.paymentMethod)
      .search(input.searchMask)
      .sort(input.sortField, input.sortOrder)
      .paginate(input.page, input.rowsPerPage)
    const { documents, totalCount } = await query.execute()
    const orders = documents.map((document) => this.OrderRepository.toDomain(document))
    return { total: totalCount, orders }
  }
}
