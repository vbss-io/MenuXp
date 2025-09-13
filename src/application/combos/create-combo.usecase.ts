import type { HttpClient } from '@/domain/http/http-client'
import type { ComboItem, ComboOptional } from '@/domain/models/combo.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateComboUsecaseInput {
  restaurantId: string
  categoryId: string
  name: string
  description?: string
  price: number
  stock?: number
  discount?: number
  medias?: File[]
  items: ComboItem[]
  optionals?: ComboOptional[]
  useCategoryOptionals?: boolean
}

export interface CreateComboUsecaseOutput {
  id: string
}

export class CreateComboUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/combo`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: CreateComboUsecaseInput): Promise<CreateComboUsecaseOutput> {
    const formData = new FormData()
    formData.append('restaurantId', params.restaurantId)
    formData.append('categoryId', params.categoryId)
    formData.append('name', params.name)
    if (params.description) formData.append('description', params.description)
    formData.append('price', params.price.toString())
    if (params.stock !== undefined) formData.append('stock', params.stock.toString())
    if (params.discount !== undefined) formData.append('discount', params.discount.toString())
    if (params.medias) {
      for (const media of params.medias) {
        formData.append('files', media)
      }
    }
    formData.append('items', JSON.stringify(params.items))
    if (params.optionals) formData.append('optionals', JSON.stringify(params.optionals))
    if (params.useCategoryOptionals !== undefined) {
      formData.append('useCategoryOptionals', params.useCategoryOptionals.toString())
    }

    const response = await this.httpClient.post<CreateComboUsecaseOutput>({
      url: this.url,
      body: formData
    })
    return response.data
  }
}
