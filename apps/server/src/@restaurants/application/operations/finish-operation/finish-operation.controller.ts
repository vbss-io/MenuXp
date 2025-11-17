import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { FinishOperationType } from '@restaurants/application/operations/finish-operation/finish-operation.schema'
import { FinishOperationUsecase } from '@restaurants/application/operations/finish-operation/finish-operation.usecase'

export class FinishOperationController extends BaseController {
  @inject('FinishOperationValidate')
  private readonly FinishOperationValidate!: InputValidate<FinishOperationType>

  @inject('FinishOperationUsecase')
  private readonly FinishOperationUsecase!: FinishOperationUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PATCH,
      '/operation/:operationId/finish',
      async (params: FinishOperationType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.FinishOperationValidate.validate(params)
        return await this.FinishOperationUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
