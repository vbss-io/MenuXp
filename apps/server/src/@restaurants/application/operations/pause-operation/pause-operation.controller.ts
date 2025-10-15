import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { PauseOperationType } from '@restaurants/application/operations/pause-operation/pause-operation.schema'
import { PauseOperationUsecase } from '@restaurants/application/operations/pause-operation/pause-operation.usecase'

export class PauseOperationController extends BaseController {
  @inject('PauseOperationValidate')
  private readonly PauseOperationValidate!: InputValidate<PauseOperationType>

  @inject('PauseOperationUsecase')
  private readonly PauseOperationUsecase!: PauseOperationUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PATCH,
      '/operation/:operationId/pause',
      async (params: PauseOperationType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.PauseOperationValidate.validate(params)
        return await this.PauseOperationUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
