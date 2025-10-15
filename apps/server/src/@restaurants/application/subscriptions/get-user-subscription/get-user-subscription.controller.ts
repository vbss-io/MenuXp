import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetUserSubscriptionUsecase } from '@restaurants/application/subscriptions/get-user-subscription/get-user-subscription.usecase'

export class GetUserSubscriptionController extends BaseController {
  @inject('GetUserSubscriptionUsecase')
  private readonly GetUserSubscriptionUsecase!: GetUserSubscriptionUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/subscription',
      async () => {
        const { id } = this.RequestFacade.getUser()
        return await this.GetUserSubscriptionUsecase.execute({ userId: id })
      },
      HttpCode.OK
    )
  }
}
