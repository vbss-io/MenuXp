import type { HttpClient } from '@/domain/http/http-client'
import type { Plan } from '@/domain/models/plan.model'
import { Registry } from '@/infra/dependency-injection/registry'

export class GetAvailablePlansUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/plans`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(): Promise<Plan[]> {
    const { data } = await this.httpClient.get<Plan[]>({
      url: this.url
    })
    return data
  }
}
