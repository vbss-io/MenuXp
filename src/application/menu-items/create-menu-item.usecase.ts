import type { HttpClient } from '@/domain/http/http-client'
import type { MenuItemOptional } from '@/domain/models/menu-item.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateMenuItemUsecaseInput {
  name: string
  description?: string
  categoryId: string
  restaurantId: string
  price: number
  stock?: number
  discount?: number
  medias?: File[]
  optionals?: MenuItemOptional[]
}

export interface CreateMenuItemUsecaseOutput {
  id: string
}

export class CreateMenuItemUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-item`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: CreateMenuItemUsecaseInput): Promise<CreateMenuItemUsecaseOutput> {
    const formData = new FormData()
    formData.append('name', params.name)
    formData.append('categoryId', params.categoryId)
    formData.append('restaurantId', params.restaurantId)
    formData.append('price', params.price.toString())
    if (params.description) formData.append('description', params.description)
    if (params.stock !== undefined) formData.append('stock', params.stock.toString())
    if (params.discount !== undefined) formData.append('discount', params.discount.toString())
    if (params.medias) {
      for (const media of params.medias) {
        formData.append('files', media)
      }
    }
    if (params.optionals) formData.append('optionals', JSON.stringify(params.optionals))
    const response = await this.httpClient.post<CreateMenuItemUsecaseOutput>({
      url: this.url,
      body: formData
    })
    return response.data
  }
}
