import { api } from '@/lib/api'

export interface ResentWhatsAppVerificationParams {
  clientId: string
  verificationId?: string
  preferredLanguage?: string
}

export interface ResentWhatsAppVerificationResponse {
  verificationId: string
  expiresInSeconds: number
}

export const resentWhatsAppVerification = async (
  params: ResentWhatsAppVerificationParams
): Promise<ResentWhatsAppVerificationResponse> => {
  const response = await api.post<ResentWhatsAppVerificationResponse>('/customers/whatsapp-verification/resend', {
    customerId: params.clientId,
    verificationId: params.verificationId
  })
  return response.data
}
