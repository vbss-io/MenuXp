import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CreateBillingPortalSessionInput } from '@restaurants/application/subscriptions/create-billing-portal-session/create-billing-portal-session.schema'
import { CreateBillingPortalSessionUsecase } from '@restaurants/application/subscriptions/create-billing-portal-session/create-billing-portal-session.usecase'

export class CreateBillingPortalSessionController extends BaseController {
  @inject('CreateBillingPortalSessionValidate')
  private readonly CreateBillingPortalSessionValidate!: InputValidate<CreateBillingPortalSessionInput>

  @inject('CreateBillingPortalSessionUsecase')
  private readonly CreateBillingPortalSessionUsecase!: CreateBillingPortalSessionUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/subscriptions/billing-portal',
      async (params: CreateBillingPortalSessionInput) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.CreateBillingPortalSessionValidate.validate(params)
        return await this.CreateBillingPortalSessionUsecase.execute({
          userId: id,
          ...validatedParams
        })
      },
      HttpCode.OK
    )
  }
}
