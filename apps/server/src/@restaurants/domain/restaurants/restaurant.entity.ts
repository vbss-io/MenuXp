import { DEFAULT_BUSINESS_HOURS } from '@restaurants/domain/restaurants/consts/default-business-hours.const'
import { DEFAULT_TEMPLATES } from '@restaurants/domain/restaurants/consts/default-templates.const'
import type { OperationType } from '@restaurants/domain/restaurants/enums/operation-type.enum'
import type { PaymentMethod } from '@restaurants/domain/restaurants/enums/payment-methods.enum'

export interface RestaurantAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country?: string
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

export interface RestaurantSettings {
  operationTypes: OperationType[]
  paymentMethods: PaymentMethod[]
  deliveryFee: number
  businessHours: Record<string, string>
  templates: Record<string, string>
  acceptsScheduling: boolean
}

export interface RestaurantStyle {
  primaryColor: string
  secondaryColor: string
}

export class Restaurant {
  private constructor(
    readonly id: string | number | undefined,
    readonly name: string,
    readonly description: string,
    readonly ownerId: string | number,
    readonly isActive: boolean,
    readonly slug: string,
    readonly logoPath?: string,
    readonly address?: RestaurantAddress,
    readonly contactInfo?: RestaurantContactInfo,
    readonly settings?: RestaurantSettings,
    readonly style?: RestaurantStyle,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {}

  private static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  static create(input: RestaurantCreate): Restaurant {
    const slug = input.slug ?? Restaurant.generateSlug(input.name)
    const defaultSettings: RestaurantSettings = {
      templates: DEFAULT_TEMPLATES,
      businessHours: DEFAULT_BUSINESS_HOURS,
      operationTypes: [] as OperationType[],
      paymentMethods: [] as PaymentMethod[],
      deliveryFee: 0,
      acceptsScheduling: false
    }
    const settings = input.settings ?? defaultSettings
    return new Restaurant(
      undefined,
      input.name,
      input.description,
      input.ownerId,
      true,
      slug,
      input.logoPath,
      input.address,
      input.contactInfo,
      settings,
      input.style
    )
  }

  static restore(input: RestaurantRestore): Restaurant {
    return new Restaurant(
      input.id,
      input.name,
      input.description,
      input.ownerId,
      input.isActive,
      input.slug,
      input.logoPath,
      input.address,
      input.contactInfo,
      input.settings,
      input.style,
      input.createdAt,
      input.updatedAt
    )
  }

  updateSettings(settings: Partial<RestaurantSettings>): void {
    Object.assign(this, { settings: { ...this.settings, ...settings } })
  }

  updateContactInfo(contactInfo: Partial<RestaurantContactInfo>): void {
    Object.assign(this, { contactInfo: { ...this.contactInfo, ...contactInfo } })
  }

  updateAddress(address: Partial<RestaurantAddress>): void {
    Object.assign(this, { address: { ...this.address, ...address } })
  }

  updateBasicInfo(basicInfo: Partial<{ name: string; description: string; slug?: string; logoPath?: string }>): void {
    Object.assign(this, basicInfo)
  }

  updateStyle(style: Partial<RestaurantStyle>): void {
    Object.assign(this, { style: { ...this.style, ...style } })
  }

  hasPermission(userId: string | number): boolean {
    return this.ownerId === userId
  }
}

export interface RestaurantCreate {
  name: string
  description: string
  slug?: string
  logoPath?: string
  ownerId: string | number
  address?: RestaurantAddress
  contactInfo?: RestaurantContactInfo
  settings?: RestaurantSettings
  style?: RestaurantStyle
}

export type RestaurantRestore = RestaurantCreate & {
  id: string | number
  isActive: boolean
  slug: string
  createdAt: Date
  updatedAt: Date
}
