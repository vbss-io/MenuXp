export enum PaymentMethod {
  CARTAO_CREDITO = 'cartao_credito',
  CARTAO_DEBITO = 'cartao_debito',
  PIX = 'pix',
  DINHEIRO = 'dinheiro'
}

export const paymentMethods = Object.values(PaymentMethod)
