import type { HttpClient } from '@/domain/http/http-client'
import type { GetReportsDataInput, GetReportsDataResponse, ReportsDataset } from '@/domain/models/reports.model'
import { Registry } from '@/infra/dependency-injection/registry'

const convertDateToStartOfDay = (dateString: string): string => {
  const date = new Date(`${dateString}T00:00:00.000Z`)
  return date.toISOString()
}

const convertDateToEndOfDay = (dateString: string): string => {
  const date = new Date(`${dateString}T23:59:59.999Z`)
  return date.toISOString()
}

export class GetReportsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/reports/query`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(input: GetReportsDataInput): Promise<GetReportsDataResponse> {
    const requestBody = {
      ...input,
      filters: {
        ...input.filters,
        dateRange: {
          start: convertDateToStartOfDay(input.filters.dateRange.start),
          end: convertDateToEndOfDay(input.filters.dateRange.end)
        }
      }
    }
    const response = await this.httpClient.post<ReportsDataset>({
      url: this.url,
      body: requestBody
    })
    return { data: response.data }
  }
}
