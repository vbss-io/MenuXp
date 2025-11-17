import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetCategoryType } from '@restaurants/application/categories/get-category/get-category.schema'
import { GetCategoryUsecase } from '@restaurants/application/categories/get-category/get-category.usecase'

export class GetCategoryController extends BaseController {
  @inject('GetCategoryValidate')
  private readonly GetCategoryValidate!: InputValidate<GetCategoryType>

  @inject('GetCategoryUsecase')
  private readonly GetCategoryUsecase!: GetCategoryUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/category/:categoryId',
      async (params: GetCategoryType) => {
        const { id } = this.RequestFacade.getUser()
        const { categoryId } = this.GetCategoryValidate.validate(params)
        return await this.GetCategoryUsecase.execute({ categoryId, userId: id })
      },
      HttpCode.OK
    )
  }
}
