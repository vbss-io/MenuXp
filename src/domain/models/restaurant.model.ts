import type { BusinessWeekDay } from '@/domain/enums/restaurants/business-week-day.enum'
import type { OperationType } from '@/domain/enums/restaurants/operation-type.enum'
import type { PaymentMethod } from '@/domain/enums/restaurants/payment-methods.enum'

export interface RestaurantAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface RestaurantContactInfo {
  phone: string
  email: string
  website?: string
  socialMedia?: {
    instagram?: string
    facebook?: string
    whatsapp?: string
  }
}

export type BusinessHours = {
  [key in BusinessWeekDay]: string
}

export interface Templates {
  order_received: string
  order_confirmed: string
  order_in_production: string
  order_ready: string
  order_out_for_delivery: string
  order_delivered: string
  order_canceled: string
}

export interface RestaurantSettings {
  operationTypes?: OperationType[]
  paymentMethods?: PaymentMethod[]
  deliveryFee?: number
  businessHours?: BusinessHours
  templates?: Templates
  acceptsScheduling?: boolean
}

export interface RestaurantStyle {
  primaryColor: string
  secondaryColor: string
}

export interface Restaurant {
  id: string
  name: string
  description: string
  ownerId: string
  isActive: boolean
  slug: string
  logo?: string
  address?: RestaurantAddress
  contactInfo?: RestaurantContactInfo
  settings?: RestaurantSettings
  style?: RestaurantStyle
  createdAt: string
  updatedAt: string
}
