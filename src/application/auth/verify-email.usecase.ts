import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface VerifyEmailUsecaseInput {
  token: string
}

export class VerifyEmailUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/auth/verify-email`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: VerifyEmailUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url,
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  }
}
