import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DeleteCategoryUsecaseInput {
  categoryId: string
}

export class DeleteCategoryUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/category/:id`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: DeleteCategoryUsecaseInput): Promise<void> {
    await this.httpClient.delete({
      url: this.url.replace(':id', params.categoryId)
    })
  }
}
