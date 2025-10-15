import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { ResumeOperationType } from '@restaurants/application/operations/resume-operation/resume-operation.schema'
import { ResumeOperationUsecase } from '@restaurants/application/operations/resume-operation/resume-operation.usecase'

export class ResumeOperationController extends BaseController {
  @inject('ResumeOperationValidate')
  private readonly ResumeOperationValidate!: InputValidate<ResumeOperationType>

  @inject('ResumeOperationUsecase')
  private readonly ResumeOperationUsecase!: ResumeOperationUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PATCH,
      '/operation/:operationId/resume',
      async (params: ResumeOperationType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.ResumeOperationValidate.validate(params)
        return await this.ResumeOperationUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
