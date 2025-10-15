import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CheckSlugType } from '@restaurants/application/restaurants/check-slug-available/check-slug-available.schema'
import { CheckSlugAvailableUsecase } from '@restaurants/application/restaurants/check-slug-available/check-slug-available.usecase'

export class CheckSlugAvailableController extends BaseController {
  @inject('CheckSlugAvailableValidate')
  private readonly CheckSlugAvailableValidate!: InputValidate<CheckSlugType>
  @inject('CheckSlugAvailableUsecase')
  private readonly CheckSlugAvailableUsecase!: CheckSlugAvailableUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/restaurants/check-slug',
      async (params: CheckSlugType) => {
        const validatedParams = this.CheckSlugAvailableValidate.validate(params)
        return await this.CheckSlugAvailableUsecase.execute(validatedParams)
      },
      HttpCode.OK
    )
  }
}
