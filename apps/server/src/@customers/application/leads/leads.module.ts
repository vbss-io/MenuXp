import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { CreateLeadController } from '@customers/application/leads/create-lead/create-lead.controller'
import { CreateLeadSchema } from '@customers/application/leads/create-lead/create-lead.schema'
import { CreateLeadUsecase } from '@customers/application/leads/create-lead/create-lead.usecase'

export class LeadsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('CreateLeadValidate', new ZodAdapter(CreateLeadSchema))
    registry.provide('CreateLeadUsecase', new CreateLeadUsecase())
    new CreateLeadController()
  }
}
