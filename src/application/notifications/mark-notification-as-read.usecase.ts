import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface MarkNotificationAsReadUsecaseInput {
  notificationId: string
}

export class MarkNotificationAsReadUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/notification/:notificationId/read`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: MarkNotificationAsReadUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url.replace(':notificationId', params.notificationId)
    })
  }
}
