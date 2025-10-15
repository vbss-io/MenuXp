import type { Address } from './address'
import type { MenuSection } from './menu-layout'
import type { OperationType, PaymentMethod } from './order'

export enum BusinessWeekDay {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

export const BusinessWeekDayValues = Object.values(BusinessWeekDay)

export interface OperationHours {
  day: BusinessWeekDay
  openTime: string
  closeTime: string
  isOpen: boolean
}

export interface RestaurantTheme {
  logo: string
  name: string
  primaryColor: string
  secondaryColor: string
  layout: string
}

export interface RestaurantConfigValidation {
  hasAddress: boolean
  hasContactInfo: boolean
  hasOperationSettings: boolean
  hasOperationHours: boolean
  hasTemplates: boolean
  missingConfigs: string[]
  isReadyForOperation: boolean
}

export interface RestaurantSettings {
  allowDelivery: boolean
  allowPickup: boolean
  allowDineIn: boolean
  acceptsScheduling?: boolean
  minimumOrderValue?: number
  deliveryFee?: number
  estimatedDeliveryTime?: number
  operationTypes?: OperationType[]
  paymentMethods?: PaymentMethod[]
  businessHours?: { [key in BusinessWeekDay]: string }
  templates?: {
    order_received: string
    order_confirmed: string
    order_in_production: string
    order_ready: string
    order_out_for_delivery: string
    order_delivered: string
    order_canceled: string
  }
}

export interface Restaurant {
  id: string
  name: string
  description?: string
  logo?: string
  address: Address
  contactInfo: {
    phone: string
    email?: string
    website?: string
  }
  style: {
    primaryColor: string
    secondaryColor: string
    logo?: string
    backgroundImage?: string
  }
  settings: RestaurantSettings
  isActive: boolean
  slug: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface RestaurantWithInfo extends Restaurant {
  operationHours?: OperationHours[]
  isOpen?: boolean
  operationId?: string | null
  operationStatus?: string | null
  menuLayout?: {
    id: string
    layout: string
    sections: MenuSection[]
  } | null
}
