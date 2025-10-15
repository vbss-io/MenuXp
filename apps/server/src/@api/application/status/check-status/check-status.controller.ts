import { BaseController } from '@api/application/@base.controller'
import { CheckStatusUsecase } from '@api/application/status/check-status/check-status.usecase'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { inject } from '@api/infra/dependency-injection/registry'

export class CheckStatusController extends BaseController {
  @inject('CheckStatusUsecase')
  private readonly CheckStatusUsecase!: CheckStatusUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/status',
      async () => {
        return await this.CheckStatusUsecase.execute()
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
