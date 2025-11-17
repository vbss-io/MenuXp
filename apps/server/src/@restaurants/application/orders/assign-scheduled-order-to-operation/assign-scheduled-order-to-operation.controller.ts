import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { AssignScheduledOrderToOperationType } from '@restaurants/application/orders/assign-scheduled-order-to-operation/assign-scheduled-order-to-operation.schema'
import { AssignScheduledOrderToOperationUsecase } from '@restaurants/application/orders/assign-scheduled-order-to-operation/assign-scheduled-order-to-operation.usecase'

export class AssignScheduledOrderToOperationController extends BaseController {
  @inject('AssignScheduledOrderToOperationValidate')
  private readonly AssignScheduledOrderToOperationValidate!: InputValidate<AssignScheduledOrderToOperationType>

  @inject('AssignScheduledOrderToOperationUsecase')
  private readonly AssignScheduledOrderToOperationUsecase!: AssignScheduledOrderToOperationUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/order/:orderId/assign-to-operation/:operationId',
      async (params: AssignScheduledOrderToOperationType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.AssignScheduledOrderToOperationValidate.validate(params)
        return await this.AssignScheduledOrderToOperationUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
