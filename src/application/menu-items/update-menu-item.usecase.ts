import type { HttpClient } from '@/domain/http/http-client'
import type { MenuItemOptional } from '@/domain/models/menu-item.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateMenuItemUsecaseInput {
  restaurantId: string
  menuItemId: string
  name?: string
  description?: string
  categoryId?: string
  price?: number
  stock?: number
  discount?: number
  removeMedias?: string[]
  medias?: File[]
  optionals?: MenuItemOptional[]
  useCategoryOptionals?: boolean
  isActive?: boolean
}

export class UpdateMenuItemUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-item/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateMenuItemUsecaseInput): Promise<void> {
    const formData = new FormData()
    formData.append('restaurantId', params.restaurantId)
    if (params.name) formData.append('name', params.name)
    if (params.description !== undefined) formData.append('description', params.description)
    if (params.categoryId) formData.append('categoryId', params.categoryId)
    if (params.price !== undefined) formData.append('price', params.price.toString())
    if (params.stock !== undefined) formData.append('stock', params.stock.toString())
    if (params.discount !== undefined) formData.append('discount', params.discount.toString())
    if (params.removeMedias !== undefined) formData.append('removeFiles', params.removeMedias.join(','))
    if (params.medias !== undefined) {
      for (const media of params.medias) {
        formData.append('files', media)
      }
    }
    if (params.optionals !== undefined) formData.append('optionals', JSON.stringify(params.optionals))
    if (params.useCategoryOptionals !== undefined)
      formData.append('useCategoryOptionals', params.useCategoryOptionals.toString())
    if (params.isActive !== undefined) formData.append('isActive', params.isActive.toString())
    await this.httpClient.put({
      url: this.url.replace(':id', params.menuItemId),
      body: formData
    })
  }
}
