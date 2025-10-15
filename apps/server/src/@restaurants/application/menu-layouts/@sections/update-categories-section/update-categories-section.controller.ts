import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateCategoriesSectionType } from '@restaurants/application/menu-layouts/@sections/update-categories-section/update-categories-section.schema'
import { UpdateCategoriesSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-categories-section/update-categories-section.usecase'

export class UpdateCategoriesSectionController extends BaseController {
  @inject('UpdateCategoriesSectionValidate')
  private readonly UpdateCategoriesSectionValidate!: InputValidate<UpdateCategoriesSectionType>

  @inject('UpdateCategoriesSectionUsecase')
  private readonly UpdateCategoriesSectionUsecase!: UpdateCategoriesSectionUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/menu-layouts/:layoutId/:sectionId/categories',
      async (params: UpdateCategoriesSectionType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateCategoriesSectionValidate.validate(params)
        return await this.UpdateCategoriesSectionUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
