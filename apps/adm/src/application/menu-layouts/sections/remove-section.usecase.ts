import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface RemoveSectionUsecaseInput {
  layoutId: string
  sectionId: string
}

export interface RemoveSectionUsecaseOutput {
  success: boolean
  sectionId: string
}

export class RemoveSectionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:layoutId/:sectionId/remove`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: RemoveSectionUsecaseInput): Promise<RemoveSectionUsecaseOutput> {
    const response = await this.httpClient.put<RemoveSectionUsecaseOutput>({
      url: this.url.replace(':layoutId', params.layoutId).replace(':sectionId', params.sectionId)
    })
    return response.data
  }
}
