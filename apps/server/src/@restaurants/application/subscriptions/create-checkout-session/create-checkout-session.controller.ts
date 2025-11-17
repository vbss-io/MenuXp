import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { CreateCheckoutSessionInput } from '@restaurants/application/subscriptions/create-checkout-session/create-checkout-session.schema'
import { CreateCheckoutSessionUsecase } from '@restaurants/application/subscriptions/create-checkout-session/create-checkout-session.usecase'

export class CreateCheckoutSessionController extends BaseController {
  @inject('CreateCheckoutSessionValidate')
  private readonly CreateCheckoutSessionValidate!: InputValidate<CreateCheckoutSessionInput>

  @inject('CreateCheckoutSessionUsecase')
  private readonly CreateCheckoutSessionUsecase!: CreateCheckoutSessionUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/subscriptions/checkout-session',
      async (params: CreateCheckoutSessionInput) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.CreateCheckoutSessionValidate.validate(params)
        return await this.CreateCheckoutSessionUsecase.execute({
          userId: id,
          ...validatedParams
        })
      },
      HttpCode.CREATED
    )
  }
}
