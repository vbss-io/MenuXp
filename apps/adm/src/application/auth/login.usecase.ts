import type { HttpClient } from '@/domain/http/http-client'
import type { User } from '@/domain/models/user.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface LoginUsecaseInput {
  email: string
  password: string
}

export interface LoginUsecaseOutput {
  token?: string
  user?: User
  restaurantId?: string
  pendingUser?: string
}

export class LoginUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/auth/login`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: LoginUsecaseInput): Promise<LoginUsecaseOutput> {
    try {
      const { data } = await this.httpClient.post<LoginUsecaseOutput>({
        url: this.url,
        body: params
      })
      return data
    } catch (error) {
      if (error instanceof Error && error.message === 'Email Not Confirmed') {
        return { pendingUser: params.email }
      }
      throw error
    }
  }
}
