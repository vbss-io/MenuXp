import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetPlansUsecase } from '@restaurants/application/plans/get-plans/get-plans.usecase'

export class GetPlansController extends BaseController {
  @inject('GetPlansUsecase')
  private readonly GetPlansUsecase!: GetPlansUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/plans',
      async () => {
        return await this.GetPlansUsecase.execute()
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
