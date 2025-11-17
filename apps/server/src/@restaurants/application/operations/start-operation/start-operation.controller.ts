import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { StartOperationType } from '@restaurants/application/operations/start-operation/start-operation.schema'
import { StartOperationUsecase } from '@restaurants/application/operations/start-operation/start-operation.usecase'

export class StartOperationController extends BaseController {
  @inject('StartOperationValidate')
  private readonly StartOperationValidate!: InputValidate<StartOperationType>

  @inject('StartOperationUsecase')
  private readonly StartOperationUsecase!: StartOperationUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/operation/start',
      async (params: StartOperationType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.StartOperationValidate.validate(params)
        return await this.StartOperationUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.CREATED
    )
  }
}
