import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { inject } from '@api/infra/dependency-injection/registry'
import { ListSectionsUsecase } from '@restaurants/application/admin/list-sections/list-sections.usecase'

export class ListSectionsController extends BaseController {
  @inject('ListSectionsUsecase')
  private readonly ListSectionsUsecase!: ListSectionsUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/admin/sections',
      async () => {
        return await this.ListSectionsUsecase.execute()
      },
      HttpCode.OK,
      'isAdmin'
    )
  }
}
