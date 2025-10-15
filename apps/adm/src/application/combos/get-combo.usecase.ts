import type { HttpClient } from '@/domain/http/http-client'
import type { Combo } from '@/domain/models/combo.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetComboUsecaseInput {
  comboId: string
}

export class GetComboUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/combo/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetComboUsecaseInput): Promise<Combo> {
    const response = await this.httpClient.get<Combo>({
      url: this.url.replace(':id', params.comboId)
    })
    return response.data
  }
}
