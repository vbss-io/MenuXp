import type { HttpClient } from '@/domain/http/http-client'
import type { ComboItem, ComboOptional } from '@/domain/models/combo.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateComboUsecaseInput {
  comboId: string
  restaurantId: string
  categoryId?: string
  name?: string
  description?: string
  price?: number
  stock?: number
  discount?: number
  medias?: File[]
  items?: ComboItem[]
  optionals?: ComboOptional[]
  useCategoryOptionals?: boolean
}

export class UpdateComboUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/combo/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateComboUsecaseInput): Promise<void> {
    const formData = new FormData()
    formData.append('restaurantId', params.restaurantId)
    if (params.categoryId) formData.append('categoryId', params.categoryId)
    if (params.name) formData.append('name', params.name)
    if (params.description !== undefined) formData.append('description', params.description)
    if (params.price !== undefined) formData.append('price', params.price.toString())
    if (params.stock !== undefined) formData.append('stock', params.stock.toString())
    if (params.discount !== undefined) formData.append('discount', params.discount.toString())
    if (params.medias) {
      for (const media of params.medias) {
        formData.append('files', media)
      }
    }
    if (params.items) formData.append('items', JSON.stringify(params.items))
    if (params.optionals) formData.append('optionals', JSON.stringify(params.optionals))
    if (params.useCategoryOptionals !== undefined) {
      formData.append('useCategoryOptionals', params.useCategoryOptionals.toString())
    }

    await this.httpClient.put({
      url: this.url.replace(':id', params.comboId),
      body: formData
    })
  }
}
