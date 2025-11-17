import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { FormDataInputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import {
  UpdateUserProfileInputType,
  UpdateUserProfileType
} from '@restaurants/application/users/update-user-profile/update-user-profile.schema'
import { UpdateUserProfileUsecase } from '@restaurants/application/users/update-user-profile/update-user-profile.usecase'

export class UpdateUserProfileController extends BaseController {
  @inject('UpdateUserProfileValidate')
  private readonly UpdateUserProfileValidate!: FormDataInputValidate<UpdateUserProfileInputType, UpdateUserProfileType>

  @inject('UpdateUserProfileUsecase')
  private readonly UpdateUserProfileUsecase!: UpdateUserProfileUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/user/profile',
      async (params: UpdateUserProfileInputType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateUserProfileValidate.validate(params)
        return await this.UpdateUserProfileUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
