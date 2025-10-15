import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetCategoriesNamesUsecase } from '@restaurants/application/categories/get-categories-names/get-categories-names.usecase'
import { GetCategoriesType } from '@restaurants/application/categories/get-categories/get-categories.schema'

export class GetCategoriesNamesController extends BaseController {
  @inject('GetCategoriesValidate')
  private readonly GetCategoriesValidate!: InputValidate<GetCategoriesType>

  @inject('GetCategoriesNamesUsecase')
  private readonly GetCategoriesNamesUsecase!: GetCategoriesNamesUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.GET,
      '/categories/names',
      async (params: GetCategoriesType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.GetCategoriesValidate.validate(params)
        return await this.GetCategoriesNamesUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK
    )
  }
}
