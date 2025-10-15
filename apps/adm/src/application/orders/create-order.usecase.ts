import type { HttpClient } from '@/domain/http/http-client'
import type { OrderCustomer, OrderItem, OperationType, PaymentMethod } from '@/domain/models/order.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateOrderUsecaseInput {
  restaurantId: string
  operationId: string
  clientId: string
  customer: OrderCustomer
  orderType: OperationType
  paymentMethod: PaymentMethod
  items: OrderItem[]
}

export interface CreateOrderUsecaseOutput {
  id: string
  code: string
}

export class CreateOrderUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/order`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: CreateOrderUsecaseInput): Promise<CreateOrderUsecaseOutput> {
    const response = await this.httpClient.post<CreateOrderUsecaseOutput>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
