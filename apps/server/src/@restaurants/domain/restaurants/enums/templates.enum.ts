export enum Templates {
  RECEIVED = 'order_received',
  CONFIRMED = 'order_confirmed',
  IN_PRODUCTION = 'order_in_production',
  READY = 'order_ready',
  SENT_FOR_DELIVERY = 'order_out_for_delivery',
  DELIVERED = 'order_delivered',
  CANCELLED = 'order_canceled'
}

export const TemplatesValues = Object.values(Templates)
