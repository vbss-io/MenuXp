import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateCategoryType } from '@restaurants/application/categories/update-category/update-category.schema'
import { UpdateCategoryUsecase } from '@restaurants/application/categories/update-category/update-category.usecase'

export class UpdateCategoryController extends BaseController {
  @inject('UpdateCategoryValidate')
  private readonly UpdateCategoryValidate!: InputValidate<UpdateCategoryType>

  @inject('UpdateCategoryUsecase')
  private readonly UpdateCategoryUsecase!: UpdateCategoryUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.PUT,
      '/category/:categoryId',
      async (params: UpdateCategoryType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateCategoryValidate.validate(params)
        return await this.UpdateCategoryUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
