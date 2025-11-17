import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetCurrentOperationType } from '@restaurants/application/operations/get-current-operation/get-current-operation.schema'
import { GetCurrentOperationUsecase } from '@restaurants/application/operations/get-current-operation/get-current-operation.usecase'

export class GetCurrentOperationController extends BaseController {
  @inject('GetCurrentOperationValidate')
  private readonly GetCurrentOperationValidate!: InputValidate<GetCurrentOperationType>
  @inject('GetCurrentOperationUsecase')
  private readonly GetCurrentOperationUsecase!: GetCurrentOperationUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/operation/current',
      async (params: GetCurrentOperationType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.GetCurrentOperationValidate.validate(params)
        const operation = await this.GetCurrentOperationUsecase.execute({ userId: id, ...validatedParams })
        if (!operation) return { hasOperation: false }
        return { hasOperation: true, operation }
      },
      HttpCode.OK
    )
  }
}
