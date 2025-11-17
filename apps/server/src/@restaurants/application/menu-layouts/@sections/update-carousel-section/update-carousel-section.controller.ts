import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { FormDataInputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateCarouselSectionType } from '@restaurants/application/menu-layouts/@sections/update-carousel-section/update-carousel-section.schema'
import { UpdateCarouselSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-carousel-section/update-carousel-section.usecase'

export class UpdateCarouselSectionController extends BaseController {
  @inject('UpdateCarouselSectionValidate')
  private readonly UpdateCarouselSectionValidate!: FormDataInputValidate<
    UpdateCarouselSectionType,
    UpdateCarouselSectionType
  >

  @inject('UpdateCarouselSectionUsecase')
  private readonly UpdateCarouselSectionUsecase!: UpdateCarouselSectionUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/menu-layouts/:layoutId/:sectionId/carousel',
      async (params: UpdateCarouselSectionType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateCarouselSectionValidate.validate(params)
        return await this.UpdateCarouselSectionUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
