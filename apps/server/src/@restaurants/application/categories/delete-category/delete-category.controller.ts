import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { DeleteCategoryType } from '@restaurants/application/categories/delete-category/delete-category.schema'
import { DeleteCategoryUsecase } from '@restaurants/application/categories/delete-category/delete-category.usecase'

export class DeleteCategoryController extends BaseController {
  @inject('DeleteCategoryValidate')
  private readonly DeleteCategoryValidate!: InputValidate<DeleteCategoryType>

  @inject('DeleteCategoryUsecase')
  private readonly DeleteCategoryUsecase!: DeleteCategoryUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.DELETE,
      '/category/:categoryId',
      async (params: DeleteCategoryType) => {
        const { id } = this.RequestFacade.getUser()
        const { categoryId } = this.DeleteCategoryValidate.validate(params)
        return await this.DeleteCategoryUsecase.execute({ categoryId, userId: id })
      },
      HttpCode.NO_CONTENT
    )
  }
}
