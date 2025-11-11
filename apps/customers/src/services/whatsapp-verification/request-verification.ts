import { api } from '@/lib/api'

export interface RequestWhatsAppVerificationParams {
  clientId: string
  verificationId?: string
  preferredLanguage?: string
}

export interface RequestWhatsAppVerificationResponse {
  verificationId: string
  expiresInSeconds: number
}

export const requestWhatsAppVerification = async (
  params: RequestWhatsAppVerificationParams
): Promise<RequestWhatsAppVerificationResponse> => {
  const response = await api.post<RequestWhatsAppVerificationResponse>('/customers/whatsapp-verification/request', {
    customerId: params.clientId,
    language: params.preferredLanguage,
    context: 'checkout'
  })
  return response.data
}
