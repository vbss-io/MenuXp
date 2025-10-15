import { CheckStatusQuery } from '@api/application/status/check-status/check-status.query'
import { inject } from '@api/infra/dependency-injection/registry'

export interface CheckStatusUsecaseOutput {
  status: string
  database: string
}

export class CheckStatusUsecase {
  @inject('CheckStatusQuery')
  private readonly CheckStatusQuery!: CheckStatusQuery

  async execute(): Promise<CheckStatusUsecaseOutput> {
    const { status: isDatabaseOk } = await this.CheckStatusQuery.execute()
    if (isDatabaseOk) return { status: 'OK', database: 'UP' }
    return { status: 'OK', database: 'DOWN' }
  }
}
