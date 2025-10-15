import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ResentConfirmationEmailUsecaseInput {
  email?: string
}

export class ResentConfirmationEmailUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/auth/resent-confirmation`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: ResentConfirmationEmailUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url,
      body: params
    })
  }
}
