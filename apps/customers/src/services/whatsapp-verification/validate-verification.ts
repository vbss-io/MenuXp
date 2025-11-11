import { api } from '@/lib/api'

export interface ValidateWhatsAppVerificationParams {
  verificationId: string
  customerId: string
  code: string
}

export interface ValidateWhatsAppVerificationResponse {
  verificationToken: string
}

export const validateWhatsAppVerification = async (
  params: ValidateWhatsAppVerificationParams
): Promise<ValidateWhatsAppVerificationResponse> => {
  const response = await api.post<ValidateWhatsAppVerificationResponse>(
    '/customers/whatsapp-verification/verify',
    params
  )
  return response.data
}
