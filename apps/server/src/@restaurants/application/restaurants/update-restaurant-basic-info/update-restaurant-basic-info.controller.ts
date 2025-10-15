import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { FormDataInputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import {
  UpdateRestaurantBasicInfoInputType,
  UpdateRestaurantBasicInfoType
} from '@restaurants/application/restaurants/update-restaurant-basic-info/update-restaurant-basic-info.schema'
import { UpdateRestaurantBasicInfoUsecase } from '@restaurants/application/restaurants/update-restaurant-basic-info/update-restaurant-basic-info.usecase'

export class UpdateRestaurantBasicInfoController extends BaseController {
  @inject('UpdateRestaurantBasicInfoValidate')
  private readonly UpdateRestaurantBasicInfoValidate!: FormDataInputValidate<
    UpdateRestaurantBasicInfoInputType,
    UpdateRestaurantBasicInfoType
  >

  @inject('UpdateRestaurantBasicInfoUsecase')
  private readonly UpdateRestaurantBasicInfoUsecase!: UpdateRestaurantBasicInfoUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PATCH,
      '/restaurant/:restaurantId/basic-info',
      async (params: UpdateRestaurantBasicInfoInputType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateRestaurantBasicInfoValidate.validate(params)
        return await this.UpdateRestaurantBasicInfoUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
