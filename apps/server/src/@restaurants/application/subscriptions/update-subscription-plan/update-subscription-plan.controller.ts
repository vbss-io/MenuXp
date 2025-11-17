import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateSubscriptionPlanInput } from '@restaurants/application/subscriptions/update-subscription-plan/update-subscription-plan.schema'
import { UpdateSubscriptionPlanUsecase } from '@restaurants/application/subscriptions/update-subscription-plan/update-subscription-plan.usecase'

export class UpdateSubscriptionPlanController extends BaseController {
  @inject('UpdateSubscriptionPlanValidate')
  private readonly UpdateSubscriptionPlanValidate!: InputValidate<UpdateSubscriptionPlanInput>

  @inject('UpdateSubscriptionPlanUsecase')
  private readonly UpdateSubscriptionPlanUsecase!: UpdateSubscriptionPlanUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PATCH,
      '/subscriptions/plan',
      async (params: UpdateSubscriptionPlanInput) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateSubscriptionPlanValidate.validate(params)
        return await this.UpdateSubscriptionPlanUsecase.execute({
          userId: id,
          ...validatedParams
        })
      },
      HttpCode.OK
    )
  }
}
