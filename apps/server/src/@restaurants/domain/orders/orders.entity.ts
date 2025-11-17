import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import type { OperationType } from '@restaurants/domain/restaurants/enums/operation-type.enum'
import type { PaymentMethod } from '@restaurants/domain/restaurants/enums/payment-methods.enum'

export interface OrderCustomer {
  name: string
  phone: string
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
  }
}

export interface OrderItemOptional {
  name: string
  price: number
  quantity: number
}

export interface OrderItem {
  itemId: string
  name: string
  price: number
  quantity: number
  itemType: 'menu-item' | 'combo'
  categoryId?: string
  optionals?: OrderItemOptional[]
  note?: string
}

export class Order {
  status: OrderStatus
  operationId?: string
  cancelReason?: string

  private constructor(
    readonly id: string | undefined,
    readonly restaurantId: string,
    operationId: string | undefined,
    readonly clientId: string,
    status: OrderStatus,
    readonly subtotal: number,
    readonly deliveryFee: number,
    readonly total: number,
    readonly customer: OrderCustomer,
    readonly orderType: OperationType,
    readonly paymentMethod: PaymentMethod,
    readonly items: OrderItem[],
    readonly code: string,
    readonly isScheduled: boolean,
    readonly scheduledFor?: Date,
    cancelReason?: string,
    readonly couponId?: string,
    readonly couponCode?: string,
    readonly couponDiscount?: number,
    readonly couponAppliedAt?: Date,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.status = status
    this.operationId = operationId
    this.cancelReason = cancelReason
  }

  static create(input: CreateOrder): Order {
    const code = Order.generateCode()
    const isScheduled = !!input.scheduledFor
    const status = isScheduled ? OrderStatus.SCHEDULED : OrderStatus.RECEIVED
    const operationId = isScheduled ? undefined : input.operationId
    const subtotal = Order.calculateTotal(input.items)
    const deliveryFee = input.orderType === 'delivery' ? (input.deliveryFee ?? 0) : 0
    const total = subtotal + deliveryFee - (input.couponDiscount ?? 0)
    const couponAppliedAt = input.couponId ? new Date() : undefined
    return new Order(
      undefined,
      input.restaurantId,
      operationId,
      input.clientId,
      status,
      subtotal,
      deliveryFee,
      total,
      input.customer,
      input.orderType,
      input.paymentMethod,
      input.items,
      code,
      isScheduled,
      input.scheduledFor,
      undefined,
      input.couponId,
      input.couponCode,
      input.couponDiscount,
      couponAppliedAt
    )
  }

  static restore(input: RestoreOrder): Order {
    return new Order(
      input.id,
      input.restaurantId,
      input.operationId,
      input.clientId,
      input.status,
      input.subtotal,
      input.deliveryFee || 0,
      input.total,
      input.customer,
      input.orderType,
      input.paymentMethod,
      input.items,
      input.code,
      !!input.scheduledFor,
      input.scheduledFor,
      input.cancelReason,
      input.couponId,
      input.couponCode,
      input.couponDiscount,
      input.couponAppliedAt,
      input.createdAt,
      input.updatedAt
    )
  }

  private static generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  update(input: Partial<Order>): void {
    this.status = input.status ?? this.status
    this.operationId = input.operationId ?? this.operationId
    this.cancelReason = input.cancelReason ?? this.cancelReason
  }

  assignToOperation(operationId: string): void {
    if (this.status === OrderStatus.SCHEDULED) {
      this.status = OrderStatus.RECEIVED
    }
    this.operationId = operationId
  }

  static calculateTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity
      const optionalsTotal = (item.optionals ?? []).reduce((optSum, opt) => optSum + opt.price * opt.quantity, 0)
      return sum + itemTotal + optionalsTotal
    }, 0)
  }
}

export interface CreateOrder {
  restaurantId: string
  operationId?: string
  clientId: string
  deliveryFee?: number
  customer: OrderCustomer
  orderType: OperationType
  paymentMethod: PaymentMethod
  items: OrderItem[]
  scheduledFor?: Date
  couponId?: string
  couponCode?: string
  couponDiscount?: number
}

type RestoreOrder = CreateOrder & {
  id: string
  code: string
  status: OrderStatus
  subtotal: number
  total: number
  isScheduled: boolean
  scheduledFor?: Date
  operationId?: string
  cancelReason?: string
  couponAppliedAt?: Date
  createdAt: Date
  updatedAt: Date
}
