import type { BusinessHours } from '@/domain/models/business-hours.model'
import type { Template } from '@/domain/models/template.model'

export interface Settings {
  restaurant_id: number
  name: string
  logo_url: string
  theme_color: string
  whatsapp_number: string
  qr_code_url: string
  business_hours: BusinessHours
  templates: Template
  operation_types: string[]
  payment_methods: string[]
  delivery_fee: number
}
