import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { inject } from '@api/infra/dependency-injection/registry'

import { SyncPlansScheduler } from '@restaurants/application/plans/sync-plans/sync-plans.scheduler'

export class PlanSyncHealthController extends BaseController {
  @inject('SyncPlansScheduler')
  private readonly scheduler!: SyncPlansScheduler

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/admin/plans/health',
      async () => {
        return this.scheduler.getHealthStatus()
      },
      HttpCode.OK,
      'isAdmin'
    )
  }
}
