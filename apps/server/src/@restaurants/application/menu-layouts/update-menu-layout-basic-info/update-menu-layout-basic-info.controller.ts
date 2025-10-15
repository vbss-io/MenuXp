import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateMenuLayoutBasicInfoType } from '@restaurants/application/menu-layouts/update-menu-layout-basic-info/update-menu-layout-basic-info.schema'
import { UpdateMenuLayoutBasicInfoUsecase } from '@restaurants/application/menu-layouts/update-menu-layout-basic-info/update-menu-layout-basic-info.usecase'

export class UpdateMenuLayoutBasicInfoController extends BaseController {
  @inject('UpdateMenuLayoutBasicInfoValidate')
  private readonly UpdateMenuLayoutBasicInfoValidate!: InputValidate<UpdateMenuLayoutBasicInfoType>

  @inject('UpdateMenuLayoutBasicInfoUsecase')
  private readonly UpdateMenuLayoutBasicInfoUsecase!: UpdateMenuLayoutBasicInfoUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.PUT,
      '/menu-layouts/:layoutId/basic-info',
      async (params: UpdateMenuLayoutBasicInfoType) => {
        const { id } = this.RequestFacade.getUser()
        const validatedParams = this.UpdateMenuLayoutBasicInfoValidate.validate(params)
        return await this.UpdateMenuLayoutBasicInfoUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.NO_CONTENT
    )
  }
}
