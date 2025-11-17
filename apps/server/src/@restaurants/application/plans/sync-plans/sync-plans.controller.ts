import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { inject } from '@api/infra/dependency-injection/registry'

import { SyncPlansUsecase } from '@restaurants/application/plans/sync-plans/sync-plans.usecase'

export class SyncPlansController extends BaseController {
  @inject('SyncPlansUsecase')
  private readonly syncPlansUsecase!: SyncPlansUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/admin/plans/sync',
      async () => {
        return await this.syncPlansUsecase.execute()
      },
      HttpCode.OK,
      'isPrivate'
    )
  }
}
