import type { Address } from './address'

export enum OrderStatus {
  SCHEDULED = 'scheduled',
  RECEIVED = 'received',
  CONFIRMED = 'confirmed',
  IN_PRODUCTION = 'in_production',
  READY = 'ready',
  SENT_FOR_DELIVERY = 'sent_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export const OrderStatusValues = Object.values(OrderStatus)

export enum OperationType {
  DELIVERY = 'delivery',
  BALCAO = 'balcao',
  MESA = 'mesa'
}

export const OperationTypeValues = Object.values(OperationType)

export enum PaymentMethod {
  CARTAO_CREDITO = 'cartao_credito',
  CARTAO_DEBITO = 'cartao_debito',
  PIX = 'pix',
  DINHEIRO = 'dinheiro'
}

export const PaymentMethodValues = Object.values(PaymentMethod)

export interface OrderCustomer {
  name: string
  phone: string
  address: Address
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
  optionals?: OrderItemOptional[]
  note?: string
}

export interface Order {
  id: string
  code: string
  restaurantId: string
  operationId?: string
  clientId: string
  customer: OrderCustomer
  orderType: OperationType
  paymentMethod: PaymentMethod
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  deliveryFee?: number
  discount?: number
  total: number
  notes?: string
  scheduledFor?: string
  createdAt: Date
  updatedAt: Date
}
