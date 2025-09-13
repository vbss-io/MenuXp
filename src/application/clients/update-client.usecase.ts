import type { HttpClient } from '@/domain/http/http-client'
import type { Client, UpdateClientInput } from '@/domain/models/client.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateClientUsecaseInput extends UpdateClientInput {
  id: string
}

export class UpdateClientUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/clients/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: UpdateClientUsecaseInput): Promise<Client> {
    const { id, ...updates } = params
    const url = this.url.replace(':id', id)
    const response = await this.httpClient.put<Client>({
      url,
      body: updates
    })
    return response.data
  }
}
