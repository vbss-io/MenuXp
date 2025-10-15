export const DEFAULT_TEMPLATES: Record<string, string> = {
  order_received:
    'Olá, seu pedido #{order_id} foi recebido! Estamos confirmando os itens e logo iniciaremos o preparo.',
  order_confirmed: 'Seu pedido #{order_id} está confirmado! Tempo estimado de preparo: 30 minutos.',
  order_canceled: 'Infelizmente seu pedido #{order_id} foi cancelado. Motivo: #{cancel_reason}',
  order_in_production: 'Seu pedido #{order_id} está em produção. Não demorará muito!',
  order_ready: 'Seu pedido #{order_id} está pronto para entrega/retirada. Bom apetite!',
  order_out_for_delivery: 'Seu pedido #{order_id} saiu para entrega! O entregador chegará em breve.',
  order_delivered: 'Seu pedido #{order_id} foi entregue! Esperamos que tenha gostado. Obrigado pela preferência!'
}
