export interface OrderCustomerAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface OrderCustomer {
  name: string
  phone: string
  address: OrderCustomerAddress
}

export interface OrderItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
}

export enum OrderStatus {
  RECEIVED = 'received',
  CONFIRMED = 'confirmed',
  IN_PRODUCTION = 'in_production',
  READY = 'ready',
  SENT_FOR_DELIVERY = 'sent_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum OperationType {
  DELIVERY = 'delivery',
  BALCAO = 'balcao',
  MESA = 'mesa'
}

export enum PaymentMethod {
  CARTAO_CREDITO = 'cartao_credito',
  CARTAO_DEBITO = 'cartao_debito',
  PIX = 'pix',
  DINHEIRO = 'dinheiro'
}

export interface Order {
  id: string
  code: string
  restaurantId: string
  operationId: string
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
  createdAt: Date
  updatedAt: Date
}
