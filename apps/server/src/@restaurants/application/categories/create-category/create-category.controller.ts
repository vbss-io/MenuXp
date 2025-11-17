import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { CreateCategoryType } from '@restaurants/application/categories/create-category/create-category.schema'
import { CreateCategoryUsecase } from '@restaurants/application/categories/create-category/create-category.usecase'

export class CreateCategoryController extends BaseController {
  @inject('CreateCategoryValidate')
  private readonly CreateCategoryValidate!: InputValidate<CreateCategoryType>

  @inject('CreateCategoryUsecase')
  private readonly CreateCategoryUsecase!: CreateCategoryUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/category',
      async (params: CreateCategoryType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.CreateCategoryValidate.validate(params)
        return await this.CreateCategoryUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.CREATED
    )
  }
}
