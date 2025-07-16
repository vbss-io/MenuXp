import type { HttpClient } from '@/domain/http/http-client'
import type { User } from '@/domain/models/user.model'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'

export interface LoginUsecaseInput {
  username: string
  password: string
}

export interface LoginUsecaseOutput {
  token?: string
  user?: User
  pendingUser?: string
}

interface MockUser {
  username: string
  email: string
  password: string
  createdAt: string
  restaurants: Array<{ id: string; default: boolean }>
}

export class LoginUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/auth/login`
  private readonly httpClient: HttpClient
  private readonly localStorage: LocalStorage

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
    this.localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  }

  async execute(params: LoginUsecaseInput): Promise<LoginUsecaseOutput> {
    const users = this.localStorage.get<MockUser[]>('users') || []
    const found = users.find((u) => u.username === params.username && u.password === params.password)
    if (found) {
      return {
        token: 'mock-token',
        user: {
          id: found.username,
          username: found.username,
          email: found.email,
          name: found.username,
          role: 'user',
          status: 'active',
          restaurants: found.restaurants
        }
      }
    }
    throw new Error('Nome de usuário ou senha inválidos')
    // try {
    //   const { data } = await this.httpClient.post<LoginUsecaseOutput>({
    //     url: this.url,
    //     body: params
    //   })
    //   return data
    // } catch (error) {
    //   if (error instanceof Error && error.message === 'Email Not Confirmed') {
    //     return { pendingUser: params.username }
    //   }
    //   throw error
    // }
  }
}
