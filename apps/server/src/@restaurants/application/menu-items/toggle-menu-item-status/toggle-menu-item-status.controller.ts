import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { ToggleMenuItemStatusType } from '@restaurants/application/menu-items/toggle-menu-item-status/toggle-menu-item-status.schema'
import { ToggleMenuItemStatusUsecase } from '@restaurants/application/menu-items/toggle-menu-item-status/toggle-menu-item-status.usecase'

export class ToggleMenuItemStatusController extends BaseController {
  @inject('ToggleMenuItemStatusValidate')
  private readonly ToggleMenuItemStatusValidate!: InputValidate<ToggleMenuItemStatusType>

  @inject('ToggleMenuItemStatusUsecase')
  private readonly ToggleMenuItemStatusUsecase!: ToggleMenuItemStatusUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PATCH,
      '/menu-item/:menuItemId/toggle-status',
      async (params: ToggleMenuItemStatusType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.ToggleMenuItemStatusValidate.validate(params)
        return await this.ToggleMenuItemStatusUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
