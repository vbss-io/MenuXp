import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetMenuSectionsUsecase } from '@restaurants/application/menu-layouts/get-menu-sections/get-menu-sections.usecase'

export class GetMenuSectionsController extends BaseController {
  @inject('GetMenuSectionsUsecase')
  private readonly GetMenuSectionsUsecase!: GetMenuSectionsUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/menu-layout-sections',
      async () => {
        const { id } = this.RequestFacade.getUser()
        return await this.GetMenuSectionsUsecase.execute({ userId: id })
      },
      HttpCode.OK
    )
  }
}
