import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { FormDataInputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import {
  UpdateMenuItemInputType,
  UpdateMenuItemType
} from '@restaurants/application/menu-items/update-menu-item/update-menu-item.schema'
import { UpdateMenuItemUsecase } from '@restaurants/application/menu-items/update-menu-item/update-menu-item.usecase'

export class UpdateMenuItemController extends BaseController {
  @inject('UpdateMenuItemValidate')
  private readonly UpdateMenuItemValidate!: FormDataInputValidate<UpdateMenuItemInputType, UpdateMenuItemType>
  @inject('UpdateMenuItemUsecase')
  private readonly UpdateMenuItemUsecase!: UpdateMenuItemUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/menu-item/:menuItemId',
      async (params: UpdateMenuItemInputType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateMenuItemValidate.validate(params)
        return await this.UpdateMenuItemUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
