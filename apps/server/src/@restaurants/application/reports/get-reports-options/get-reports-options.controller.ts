import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetReportsOptionsType } from '@restaurants/application/reports/get-reports-options/get-reports-options.schema'
import { GetReportsOptionsUsecase } from '@restaurants/application/reports/get-reports-options/get-reports-options.usecase'

export class GetReportsOptionsController extends BaseController {
  @inject('GetReportsOptionsValidate')
  private readonly GetReportsOptionsValidate!: InputValidate<GetReportsOptionsType>

  @inject('GetReportsOptionsUsecase')
  private readonly GetReportsOptionsUsecase!: GetReportsOptionsUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/reports/options',
      async (params: GetReportsOptionsType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.GetReportsOptionsValidate.validate(params)
        return await this.GetReportsOptionsUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK,
      'isPrivate'
    )
  }
}
