import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetReportsDataType } from '@restaurants/application/reports/get-reports-data/get-reports-data.schema'
import { GetReportsDataUsecase } from '@restaurants/application/reports/get-reports-data/get-reports-data.usecase'

export class GetReportsDataController extends BaseController {
  @inject('GetReportsDataValidate')
  private readonly GetReportsDataValidate!: InputValidate<GetReportsDataType>

  @inject('GetReportsDataUsecase')
  private readonly GetReportsDataUsecase!: GetReportsDataUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/reports/query',
      async (params: GetReportsDataType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.GetReportsDataValidate.validate(params)
        return await this.GetReportsDataUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK,
      'isPrivate'
    )
  }
}
