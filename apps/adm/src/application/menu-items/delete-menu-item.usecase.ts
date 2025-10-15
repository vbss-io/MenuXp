import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DeleteMenuItemUsecaseInput {
  menuItemId: string
}

export class DeleteMenuItemUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-item/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: DeleteMenuItemUsecaseInput): Promise<void> {
    await this.httpClient.delete({
      url: this.url.replace(':id', params.menuItemId)
    })
  }
}
