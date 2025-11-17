import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'

import { GetReportsDataQueryMongoose } from '@restaurants/application/reports/@queries/get-reports-data.query'
import { GetReportsDataController } from '@restaurants/application/reports/get-reports-data/get-reports-data.controller'
import { GetReportsDataSchema } from '@restaurants/application/reports/get-reports-data/get-reports-data.schema'
import { GetReportsDataUsecase } from '@restaurants/application/reports/get-reports-data/get-reports-data.usecase'
import { GetReportsOptionsController } from '@restaurants/application/reports/get-reports-options/get-reports-options.controller'
import { GetReportsOptionsSchema } from '@restaurants/application/reports/get-reports-options/get-reports-options.schema'
import { GetReportsOptionsUsecase } from '@restaurants/application/reports/get-reports-options/get-reports-options.usecase'

export class ReportsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetReportsDataQuery', new GetReportsDataQueryMongoose())

    registry.provide('GetReportsDataValidate', new ZodAdapter(GetReportsDataSchema))
    registry.provide('GetReportsDataUsecase', new GetReportsDataUsecase())
    new GetReportsDataController()

    registry.provide('GetReportsOptionsValidate', new ZodAdapter(GetReportsOptionsSchema))
    registry.provide('GetReportsOptionsUsecase', new GetReportsOptionsUsecase())
    new GetReportsOptionsController()
  }
}
