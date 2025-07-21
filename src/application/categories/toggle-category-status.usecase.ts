import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ToggleCategoryStatusUsecaseInput {
  categoryId: string
}

export class ToggleCategoryStatusUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/category/:id/toggle-status`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: ToggleCategoryStatusUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url.replace(':id', params.categoryId)
    })
  }
}
