import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ReorderSectionsUsecaseInput {
  layoutId: string
  newOrder: string[]
}

export interface ReorderSectionsUsecaseOutput {
  success: boolean
  sectionId: string
}

export class ReorderSectionsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-layouts/:layoutId/reorder`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: ReorderSectionsUsecaseInput): Promise<ReorderSectionsUsecaseOutput> {
    const response = await this.httpClient.put<ReorderSectionsUsecaseOutput>({
      url: this.url.replace(':layoutId', params.layoutId),
      body: {
        newOrder: params.newOrder
      }
    })
    return response.data
  }
}
