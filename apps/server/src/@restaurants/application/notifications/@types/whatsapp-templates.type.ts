export enum WhatsAppTemplateKey {
  ORDER_VERIFICATION_CODE = 'order_verification_code',
  ORDER_SCHEDULED = 'order_scheduled',
  ORDER_RECEIVED = 'order_received',
  ORDER_CONFIRMED = 'order_confirmed',
  ORDER_IN_PREPARATION = 'order_in_preparation',
  ORDER_READY = 'order_ready',
  ORDER_OUT_FOR_DELIVERY = 'order_out_for_delivery',
  ORDER_DELIVERED = 'order_delivered',
  ORDER_COMPLETED = 'order_completed',
  ORDER_CANCELLED = 'order_cancelled'
}

export const WhatsAppTemplateKeyValues = Object.values(WhatsAppTemplateKey)