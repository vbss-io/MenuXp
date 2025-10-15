import { Registry } from '@api/infra/dependency-injection/registry'
import { GetPlansController } from '@restaurants/application/plans/get-plans/get-plans.controller'
import { GetPlansUsecase } from '@restaurants/application/plans/get-plans/get-plans.usecase'
import { SyncPlansUsecase } from '@restaurants/application/plans/sync-plans/sync-plans.usecase'

export class PlansModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetPlansUsecase', new GetPlansUsecase())
    new GetPlansController()

    const syncPlansUsecase = new SyncPlansUsecase()
    void syncPlansUsecase.execute()
  }
}
