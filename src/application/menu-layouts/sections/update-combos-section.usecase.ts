import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateCombosSectionUsecaseInput {
  layoutId: string
  sectionId: string
  type?: 'custom' | 'best_sellers' | 'discounts'
  title?: string
  comboIds?: string[] | null
}

export class UpdateCombosSectionUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:layoutId/:sectionId/combos`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateCombosSectionUsecaseInput): Promise<void> {
    await this.httpClient.put({
      url: this.url.replace(':layoutId', params.layoutId).replace(':sectionId', params.sectionId),
      body: {
        type: params.type,
        title: params.title,
        comboIds: params.comboIds
      }
    })
  }
}
