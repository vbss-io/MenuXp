import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ResetPasswordUsecaseInput {
  password: string
  passwordConfirm: string
  token: string
}

export class ResetPasswordUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/auth/reset-password`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: ResetPasswordUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url,
      body: params,
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  }
}
