import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ForgotPasswordUsecaseInput {
  email: string
}

export class ForgotPasswordUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/auth/forgot-password`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: ForgotPasswordUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url,
      body: params
    })
  }
}
