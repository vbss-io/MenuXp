import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetCategoriesType } from '@restaurants/application/categories/get-categories/get-categories.schema'
import { GetCategoriesUsecase } from '@restaurants/application/categories/get-categories/get-categories.usecase'

export class GetCategoriesController extends BaseController {
  @inject('GetCategoriesValidate')
  private readonly GetCategoriesValidate!: InputValidate<GetCategoriesType>

  @inject('GetCategoriesUsecase')
  private readonly GetCategoriesUsecase!: GetCategoriesUsecase
  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/categories',
      async (params: GetCategoriesType) => {
        const { id } = this.RequestFacade.getUser()
        const page = Number(params.page ?? 1)
        const rowsPerPage = Number(params.rowsPerPage ?? 25)
        const validatedParams = this.GetCategoriesValidate.validate({ ...params, page, rowsPerPage })
        return await this.GetCategoriesUsecase.execute({
          userId: id,
          ...validatedParams
        })
      },
      HttpCode.OK
    )
  }
}
