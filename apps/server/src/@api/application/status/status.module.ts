import { CheckStatusController } from '@api/application/status/check-status/check-status.controller'
import { CheckStatusQueryMongoose } from '@api/application/status/check-status/check-status.query'
import { CheckStatusUsecase } from '@api/application/status/check-status/check-status.usecase'
import { Registry } from '@api/infra/dependency-injection/registry'

export class StatusModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('CheckStatusQuery', new CheckStatusQueryMongoose())
    registry.provide('CheckStatusUsecase', new CheckStatusUsecase())
    new CheckStatusController()
  }
}
