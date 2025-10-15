import { z } from 'zod'

import { api } from '@/lib/api'

export const createLeadSchema = z.object({
  name: z
    .string({ message: 'Nome é obrigatório' })
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  email: z
    .string({ message: 'E-mail é obrigatório' })
    .min(1, 'E-mail é obrigatório')
    .max(255, 'E-mail deve ter no máximo 255 caracteres')
    .email('E-mail inválido'),
  whatsapp: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true
      const cleanPhone = value.replace(/\D/g, '')
      return cleanPhone.length >= 10 && cleanPhone.length <= 11
    }, 'WhatsApp deve ter 10 ou 11 dígitos'),
  scenario: z.string().max(1000, 'Descrição deve ter no máximo 1000 caracteres').optional()
})

export type CreateLeadInput = z.infer<typeof createLeadSchema>

export interface CreateLeadOutput {
  id: string
}

export const createLead = async (data: CreateLeadInput): Promise<CreateLeadOutput> => {
  const response = await api.post<CreateLeadOutput>('/leads', data)
  return response.data
}
