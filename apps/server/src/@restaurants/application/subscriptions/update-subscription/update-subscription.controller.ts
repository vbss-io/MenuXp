import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateSubscriptionInput } from '@restaurants/application/subscriptions/update-subscription/update-subscription.schema'
import { UpdateSubscriptionUsecase } from '@restaurants/application/subscriptions/update-subscription/update-subscription.usecase'

export class UpdateSubscriptionController extends BaseController {
  @inject('UpdateSubscriptionValidate')
  private readonly UpdateSubscriptionValidate!: InputValidate<UpdateSubscriptionInput>

  @inject('UpdateSubscriptionUsecase')
  private readonly UpdateSubscriptionUsecase!: UpdateSubscriptionUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/subscriptions',
      async (params: UpdateSubscriptionInput) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateSubscriptionValidate.validate(params)
        return await this.UpdateSubscriptionUsecase.execute({
          userId: id,
          ...validatedParams
        })
      },
      HttpCode.OK
    )
  }
}
