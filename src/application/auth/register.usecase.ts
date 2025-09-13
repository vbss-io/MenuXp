import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface RegisterUsecaseInput {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface RegisterUsecaseOutput {
  message?: string
}

export class RegisterUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/auth/register`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: RegisterUsecaseInput): Promise<RegisterUsecaseOutput> {
    const { data } = await this.httpClient.post<RegisterUsecaseOutput>({
      url: this.url,
      body: params
    })
    return data
  }
}
