import { Registry } from '@api/infra/dependency-injection/registry'

import { GetPlansController } from '@restaurants/application/plans/get-plans/get-plans.controller'
import { GetPlansUsecase } from '@restaurants/application/plans/get-plans/get-plans.usecase'
import { PlanSyncHealthController } from '@restaurants/application/plans/health/plan-sync-health.controller'
import { SyncPlansController } from '@restaurants/application/plans/sync-plans/sync-plans.controller'
import { SyncPlansScheduler } from '@restaurants/application/plans/sync-plans/sync-plans.scheduler'
import { SyncPlansUsecase } from '@restaurants/application/plans/sync-plans/sync-plans.usecase'

export class PlansModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetPlansUsecase', new GetPlansUsecase())
    new GetPlansController()

    registry.provide('SyncPlansUsecase', new SyncPlansUsecase())
    new SyncPlansController()

    const syncPlansScheduler = new SyncPlansScheduler()
    syncPlansScheduler.start()
    registry.provide('SyncPlansScheduler', syncPlansScheduler)
    new PlanSyncHealthController()
  }
}
