import type { HttpClient } from '@/domain/http/http-client'
import type { Client } from '@/domain/models/client.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface FindClientByPhoneUsecaseInput {
  restaurantId: string
  phone: string
}

export class FindClientByPhoneUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/clients/:restaurantId/:phone`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: FindClientByPhoneUsecaseInput): Promise<Client | null> {
    try {
      const url = this.url.replace(':restaurantId', params.restaurantId).replace(':phone', params.phone)
      const response = await this.httpClient.get<Client>({
        url
      })
      return response.data
    } catch (error) {
      if (error instanceof Error && error.message === 'Client not found') {
        return null
      }
      throw error
    }
  }
}
