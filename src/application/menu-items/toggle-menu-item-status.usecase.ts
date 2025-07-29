import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ToggleMenuItemStatusUsecaseInput {
  menuItemId: string
}

export class ToggleMenuItemStatusUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-item/:id/toggle-status`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: ToggleMenuItemStatusUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url.replace(':id', params.menuItemId)
    })
  }
}
