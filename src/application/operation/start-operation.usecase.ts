import type { HttpClient } from '@/domain/http/http-client'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'

export interface StartOperationUsecaseInput {
  restaurantId: number
}

export interface StartOperationUsecaseOutput {
  success: boolean
  startedAt: string
}

export class StartOperationUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurants/start-operation`
  private readonly httpClient: HttpClient
  private readonly localStorage: LocalStorage

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
    this.localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  }

  async execute(params: StartOperationUsecaseInput): Promise<StartOperationUsecaseOutput> {
    const startedAt = new Date().toISOString()
    this.localStorage.set('operationStatus', 'running')
    this.localStorage.set('operationStartTime', startedAt)
    this.localStorage.set('operationRestaurantId', params.restaurantId)
    return { success: true, startedAt }
    // const { data } = await this.httpClient.post<StartOperationUsecaseOutput>({
    //   url: this.url,
    //   data: params
    // })
    // return data
  }
}
