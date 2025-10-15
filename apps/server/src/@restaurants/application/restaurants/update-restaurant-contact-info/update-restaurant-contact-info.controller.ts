import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateRestaurantContactInfoType } from '@restaurants/application/restaurants/update-restaurant-contact-info/update-restaurant-contact-info.schema'
import { UpdateRestaurantContactInfoUsecase } from '@restaurants/application/restaurants/update-restaurant-contact-info/update-restaurant-contact-info.usecase'

export class UpdateRestaurantContactInfoController extends BaseController {
  @inject('UpdateRestaurantContactInfoValidate')
  private readonly UpdateRestaurantContactInfoValidate!: InputValidate<UpdateRestaurantContactInfoType>

  @inject('UpdateRestaurantContactInfoUsecase')
  private readonly UpdateRestaurantContactInfoUsecase!: UpdateRestaurantContactInfoUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PATCH,
      '/restaurant/:restaurantId/contact-info',
      async (params: UpdateRestaurantContactInfoType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateRestaurantContactInfoValidate.validate(params)
        return await this.UpdateRestaurantContactInfoUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
