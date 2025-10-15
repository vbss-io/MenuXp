import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdatePasswordUsecaseInput {
  password: string
  passwordConfirm: string
}

export class UpdatePasswordUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/auth/update-password`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdatePasswordUsecaseInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url,
      body: params
    })
  }
}
