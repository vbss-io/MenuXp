import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CancelSubscriptionInput } from '@restaurants/application/subscriptions/cancel-subscription/cancel-subscription.schema'
import { CancelSubscriptionUsecase } from '@restaurants/application/subscriptions/cancel-subscription/cancel-subscription.usecase'

export class CancelSubscriptionController extends BaseController {
  @inject('CancelSubscriptionValidate')
  private readonly CancelSubscriptionValidate!: InputValidate<CancelSubscriptionInput>

  @inject('CancelSubscriptionUsecase')
  private readonly CancelSubscriptionUsecase!: CancelSubscriptionUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.DELETE,
      '/subscriptions',
      async (params: CancelSubscriptionInput) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.CancelSubscriptionValidate.validate(params)
        return await this.CancelSubscriptionUsecase.execute({
          userId: id,
          ...validatedParams
        })
      },
      HttpCode.OK
    )
  }
}
