import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetOperationStatisticsType } from '@restaurants/application/operations/get-operation-statistics/get-operation-statistics.schema'
import { GetOperationStatisticsUsecase } from '@restaurants/application/operations/get-operation-statistics/get-operation-statistics.usecase'

export class GetOperationStatisticsController extends BaseController {
  @inject('GetOperationStatisticsValidate')
  private readonly GetOperationStatisticsValidate!: InputValidate<GetOperationStatisticsType>
  @inject('GetOperationStatisticsUsecase')
  private readonly GetOperationStatisticsUsecase!: GetOperationStatisticsUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/operation/:operationId/statistics',
      async (params: GetOperationStatisticsType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.GetOperationStatisticsValidate.validate(params)
        return await this.GetOperationStatisticsUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK
    )
  }
}
