import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { FormDataInputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateBannerSectionType } from '@restaurants/application/menu-layouts/@sections/update-banner-section/update-banner-section.schema'
import { UpdateBannerSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-banner-section/update-banner-section.usecase'

export class UpdateBannerSectionController extends BaseController {
  @inject('UpdateBannerSectionValidate')
  private readonly UpdateBannerSectionValidate!: FormDataInputValidate<UpdateBannerSectionType, UpdateBannerSectionType>

  @inject('UpdateBannerSectionUsecase')
  private readonly UpdateBannerSectionUsecase!: UpdateBannerSectionUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/menu-layouts/:layoutId/:sectionId/banner',
      async (params: UpdateBannerSectionType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateBannerSectionValidate.validate(params)
        return await this.UpdateBannerSectionUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
