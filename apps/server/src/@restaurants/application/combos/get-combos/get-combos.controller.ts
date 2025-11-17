import { BaseController } from '@api/application/@base.controller'
import { HttpCode, HttpMethod } from '@api/domain/enums/http.enum'
import { InputValidate } from '@api/infra/adapters/validate/validate.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetCombosType } from '@restaurants/application/combos/get-combos/get-combos.schema'
import { GetCombosUsecase } from '@restaurants/application/combos/get-combos/get-combos.usecase'

export class GetCombosController extends BaseController {
  @inject('GetCombosValidate')
  private readonly GetCombosValidate!: InputValidate<GetCombosType>

  @inject('GetCombosUsecase')
  private readonly GetCombosUsecase!: GetCombosUsecase

  constructor() {
    super()
    this.HttpServer.register(
      HttpMethod.GET,
      '/combos',
      async (params: GetCombosType) => {
        const { id } = this.RequestFacade.getUser()
        const page = Number(params.page ?? 1)
        const rowsPerPage = Number(params.rowsPerPage ?? 25)
        const validatedParams = this.GetCombosValidate.validate({ ...params, page, rowsPerPage })
        return await this.GetCombosUsecase.execute({ userId: id, ...validatedParams })
      },
      HttpCode.OK,
      'isPublic'
    )
  }
}
