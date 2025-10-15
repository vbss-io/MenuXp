import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateCombosSectionType } from '@restaurants/application/menu-layouts/@sections/update-combos-section/update-combos-section.schema'
import { UpdateCombosSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-combos-section/update-combos-section.usecase'

export class UpdateCombosSectionController extends BaseController {
  @inject('UpdateCombosSectionValidate')
  private readonly UpdateCombosSectionValidate!: InputValidate<UpdateCombosSectionType>

  @inject('UpdateCombosSectionUsecase')
  private readonly UpdateCombosSectionUsecase!: UpdateCombosSectionUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/menu-layouts/:layoutId/:sectionId/combos',
      async (params: UpdateCombosSectionType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateCombosSectionValidate.validate(params)
        return await this.UpdateCombosSectionUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
