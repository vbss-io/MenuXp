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
