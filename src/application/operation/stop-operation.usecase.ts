import type { HttpClient } from '@/domain/http/http-client'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'

export interface StopOperationUsecaseInput {
  restaurantId: number
}

export interface StopOperationUsecaseOutput {
  success: boolean
  stoppedAt: string
}

export class StopOperationUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurants/stop-operation`
  private readonly httpClient: HttpClient
  private readonly localStorage: LocalStorage

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
    this.localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  }

  async execute(params: StopOperationUsecaseInput): Promise<StopOperationUsecaseOutput> {
    const stoppedAt = new Date().toISOString()
    this.localStorage.set('operationStatus', 'stopped')
    this.localStorage.set('operationStopTime', stoppedAt)
    this.localStorage.set('operationRestaurantId', params.restaurantId)
    return { success: true, stoppedAt }
    // const { data } = await this.httpClient.post<StopOperationUsecaseOutput>({
    //   url: this.url,
    //   data: params
    // })
    // return data
  }
}
