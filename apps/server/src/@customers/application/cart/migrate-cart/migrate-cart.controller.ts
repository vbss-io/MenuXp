import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import type { MigrateCartType } from '@customers/application/cart/migrate-cart/migrate-cart.schema'
import { MigrateCartUsecase } from '@customers/application/cart/migrate-cart/migrate-cart.usecase'

export class MigrateCartController extends BaseController {
  @inject('MigrateCartSchema')
  private MigrateCartValidate!: InputValidate<MigrateCartType>

  @inject('MigrateCartUsecase')
  private MigrateCartUsecase!: MigrateCartUsecase

  constructor() {
    super()

    this.HttpServer.register(
      HttpMethod.POST,
      '/cart/migrate',
      async (params: MigrateCartType) => {
        const validatedParams = this.MigrateCartValidate.validate(params)
        return await this.MigrateCartUsecase.execute(validatedParams)
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
