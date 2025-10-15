import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { FormDataInputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import {
  CreateMenuItemInputType,
  CreateMenuItemType
} from '@restaurants/application/menu-items/create-menu-item/create-menu-item.schema'
import { CreateMenuItemUsecase } from '@restaurants/application/menu-items/create-menu-item/create-menu-item.usecase'

export class CreateMenuItemController extends BaseController {
  @inject('CreateMenuItemValidate')
  private readonly CreateMenuItemValidate!: FormDataInputValidate<CreateMenuItemInputType, CreateMenuItemType>

  @inject('CreateMenuItemUsecase')
  private readonly CreateMenuItemUsecase!: CreateMenuItemUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/menu-item',
      async (params: CreateMenuItemInputType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.CreateMenuItemValidate.validate(params)
        return await this.CreateMenuItemUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.CREATED
    )
  }
}
