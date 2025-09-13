import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantInfoUsecaseInput {
  slug: string
}

export interface RestaurantInfo {
  id: string
  name: string
  description: string
  logo?: string
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  contactInfo?: {
    phone: string
    email: string
    website?: string
    socialMedia?: {
      instagram?: string
      facebook?: string
      whatsapp?: string
    }
  }
  style?: {
    primaryColor: string
    secondaryColor: string
  }
  settings?: {
    operationTypes: string[]
    paymentMethods: string[]
    deliveryFee: number
    businessHours: Record<string, string>
  }
}

export interface MenuLayoutInfo {
  id: string
  layout: string
  sections: Array<{
    id?: string
    type: string
    config: Record<string, unknown>
  }>
}

export interface GetRestaurantInfoUsecaseOutput {
  restaurant: RestaurantInfo
  operationId: string | null
  menuLayout: MenuLayoutInfo | null
}

export class GetRestaurantInfoUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu/restaurant/:slug`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetRestaurantInfoUsecaseInput): Promise<GetRestaurantInfoUsecaseOutput> {
    const url = this.url.replace(':slug', params.slug)
    const response = await this.httpClient.get<GetRestaurantInfoUsecaseOutput>({
      url
    })
    return response.data
  }
}
