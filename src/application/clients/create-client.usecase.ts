import type { HttpClient } from '@/domain/http/http-client'
import type { CreateClientInput } from '@/domain/models/client.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateClientUsecaseOutput {
  id: string
}

export class CreateClientUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/clients`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: CreateClientInput): Promise<CreateClientUsecaseOutput> {
    const response = await this.httpClient.post<CreateClientUsecaseOutput>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
