import type { HttpClient } from '@/domain/http/http-client'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'

export interface RegisterUsecaseInput {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export interface RegisterUsecaseOutput {
  message?: string
}

interface MockUser {
  username: string
  email: string
  password: string
  createdAt: string
  restaurants: Array<{ id: string; default: boolean }>
}

export class RegisterUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/auth/register`
  private readonly httpClient: HttpClient
  private readonly localStorage: LocalStorage

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
    this.localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  }

  async execute(params: RegisterUsecaseInput): Promise<RegisterUsecaseOutput> {
    const users = this.localStorage.get<MockUser[]>('users') || []
    users.push({
      username: params.username,
      email: params.email,
      password: params.password,
      createdAt: new Date().toISOString(),
      restaurants: []
    })
    this.localStorage.set('users', users)
    return { message: 'Usuário registrado com sucesso (mock).' }
    // const { data } = await this.httpClient.post<RegisterUsecaseOutput>({
    //   url: this.url,
    //   body: params
    // })
    // return data
  }
}
