import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DeleteComboUsecaseInput {
  comboId: string
}

export class DeleteComboUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/combo/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: DeleteComboUsecaseInput): Promise<void> {
    await this.httpClient.delete({
      url: this.url.replace(':id', params.comboId)
    })
  }
}
