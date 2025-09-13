import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ToggleComboStatusUsecaseInput {
  comboId: string
}

export class ToggleComboStatusUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/combo/:id/toggle-status`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: ToggleComboStatusUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url.replace(':id', params.comboId)
    })
  }
}
