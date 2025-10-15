import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateMenuItemsSectionType } from '@restaurants/application/menu-layouts/@sections/update-menu-item-sections/update-menu-items-section.schema'
import { UpdateMenuItemsSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-menu-item-sections/update-menu-items-section.usecase'

export class UpdateMenuItemsSectionController extends BaseController {
  @inject('UpdateMenuItemsSectionValidate')
  private readonly UpdateMenuItemsSectionValidate!: InputValidate<UpdateMenuItemsSectionType>

  @inject('UpdateMenuItemsSectionUsecase')
  private readonly UpdateMenuItemsSectionUsecase!: UpdateMenuItemsSectionUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/menu-layouts/:layoutId/:sectionId/menu-items',
      async (params: UpdateMenuItemsSectionType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateMenuItemsSectionValidate.validate(params)
        return await this.UpdateMenuItemsSectionUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
