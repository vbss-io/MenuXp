import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'

import { GetCurrentOperationQuery } from '@restaurants/application/operations/@queries/get-current-operation.query'
import { GetOperationStatisticsQuery } from '@restaurants/application/operations/@queries/get-operation-statistics.query'
import { FinishOperationController } from '@restaurants/application/operations/finish-operation/finish-operation.controller'
import { FinishOperationSchema } from '@restaurants/application/operations/finish-operation/finish-operation.schema'
import { FinishOperationUsecase } from '@restaurants/application/operations/finish-operation/finish-operation.usecase'
import { GetCurrentOperationController } from '@restaurants/application/operations/get-current-operation/get-current-operation.controller'
import { GetCurrentOperationSchema } from '@restaurants/application/operations/get-current-operation/get-current-operation.schema'
import { GetCurrentOperationUsecase } from '@restaurants/application/operations/get-current-operation/get-current-operation.usecase'
import { GetOperationStatisticsController } from '@restaurants/application/operations/get-operation-statistics/get-operation-statistics.controller'
import { GetOperationStatisticsSchema } from '@restaurants/application/operations/get-operation-statistics/get-operation-statistics.schema'
import { GetOperationStatisticsUsecase } from '@restaurants/application/operations/get-operation-statistics/get-operation-statistics.usecase'
import { PauseOperationController } from '@restaurants/application/operations/pause-operation/pause-operation.controller'
import { PauseOperationSchema } from '@restaurants/application/operations/pause-operation/pause-operation.schema'
import { PauseOperationUsecase } from '@restaurants/application/operations/pause-operation/pause-operation.usecase'
import { ResumeOperationController } from '@restaurants/application/operations/resume-operation/resume-operation.controller'
import { ResumeOperationSchema } from '@restaurants/application/operations/resume-operation/resume-operation.schema'
import { ResumeOperationUsecase } from '@restaurants/application/operations/resume-operation/resume-operation.usecase'
import { StartOperationController } from '@restaurants/application/operations/start-operation/start-operation.controller'
import { StartOperationSchema } from '@restaurants/application/operations/start-operation/start-operation.schema'
import { StartOperationUsecase } from '@restaurants/application/operations/start-operation/start-operation.usecase'

export class OperationsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetCurrentOperationQuery', new GetCurrentOperationQuery())
    registry.provide('GetOperationStatisticsQuery', new GetOperationStatisticsQuery())

    registry.provide('FinishOperationValidate', new ZodAdapter(FinishOperationSchema))
    registry.provide('FinishOperationUsecase', new FinishOperationUsecase())
    new FinishOperationController()

    registry.provide('GetCurrentOperationValidate', new ZodAdapter(GetCurrentOperationSchema))
    registry.provide('GetCurrentOperationUsecase', new GetCurrentOperationUsecase())
    new GetCurrentOperationController()

    registry.provide('GetOperationStatisticsValidate', new ZodAdapter(GetOperationStatisticsSchema))
    registry.provide('GetOperationStatisticsUsecase', new GetOperationStatisticsUsecase())
    new GetOperationStatisticsController()

    registry.provide('PauseOperationValidate', new ZodAdapter(PauseOperationSchema))
    registry.provide('PauseOperationUsecase', new PauseOperationUsecase())
    new PauseOperationController()

    registry.provide('ResumeOperationValidate', new ZodAdapter(ResumeOperationSchema))
    registry.provide('ResumeOperationUsecase', new ResumeOperationUsecase())
    new ResumeOperationController()

    registry.provide('StartOperationValidate', new ZodAdapter(StartOperationSchema))
    registry.provide('StartOperationUsecase', new StartOperationUsecase())
    new StartOperationController()
  }
}
