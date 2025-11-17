import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { DeleteMenuItemType } from '@restaurants/application/menu-items/delete-menu-item/delete-menu-item.schema'
import { DeleteMenuItemUsecase } from '@restaurants/application/menu-items/delete-menu-item/delete-menu-item.usecase'

export class DeleteMenuItemController extends BaseController {
  @inject('DeleteMenuItemValidate')
  private readonly DeleteMenuItemValidate!: InputValidate<DeleteMenuItemType>
  @inject('DeleteMenuItemUsecase')
  private readonly DeleteMenuItemUsecase!: DeleteMenuItemUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.DELETE,
      '/menu-item/:menuItemId',
      async (params: DeleteMenuItemType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.DeleteMenuItemValidate.validate(params)
        return await this.DeleteMenuItemUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
