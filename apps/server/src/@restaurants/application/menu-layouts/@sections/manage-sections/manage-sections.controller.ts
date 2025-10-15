import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { AddSectionType } from '@restaurants/application/menu-layouts/@sections/@schemas/add-section.schema'
import { RemoveSectionType } from '@restaurants/application/menu-layouts/@sections/@schemas/remove-section.schema'
import { ReorderSectionsType } from '@restaurants/application/menu-layouts/@sections/@schemas/reorder-sections.schema'
import { ManageSectionsUsecase } from '@restaurants/application/menu-layouts/@sections/manage-sections/manage-sections.usecase'

export class ManageSectionsController extends BaseController {
  @inject('AddSectionValidate')
  private readonly AddSectionValidate!: InputValidate<AddSectionType>

  @inject('RemoveSectionValidate')
  private readonly RemoveSectionValidate!: InputValidate<RemoveSectionType>

  @inject('ReorderSectionsValidate')
  private readonly ReorderSectionsValidate!: InputValidate<ReorderSectionsType>

  @inject('ManageSectionsUsecase')
  private readonly ManageSectionsUsecase!: ManageSectionsUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.POST,
      '/menu-layouts/:layoutId/add',
      async (params: AddSectionType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.AddSectionValidate.validate(params)
        return await this.ManageSectionsUsecase.addSection({ userId: id, ...validatedParams })
      },
      HttpCode.CREATED
    )
    this.HttpServer.register(
      HttpMethod.PUT,
      '/menu-layouts/:layoutId/:sectionId/remove',
      async (params: RemoveSectionType) => {
        const { id } = this.RequestFacade.getUser()
        const { layoutId, sectionId } = this.RemoveSectionValidate.validate(params)
        return await this.ManageSectionsUsecase.removeSection({ userId: id, layoutId, sectionId })
      },
      HttpCode.NO_CONTENT
    )
    this.HttpServer.register(
      HttpMethod.PUT,
      '/menu-layouts/:layoutId/reorder',
      async (params: ReorderSectionsType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.ReorderSectionsValidate.validate(params)
        return await this.ManageSectionsUsecase.reorderSections({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
