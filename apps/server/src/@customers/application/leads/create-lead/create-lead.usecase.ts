import { inject } from '@api/infra/dependency-injection/registry'

import { CreateLeadType } from '@customers/application/leads/create-lead/create-lead.schema'
import { Lead } from '@customers/domain/leads/lead.entity'
import type { LeadRepository } from '@customers/infra/repositories/lead.repository'

export class CreateLeadUsecase {
  @inject('LeadRepository')
  private readonly LeadRepository!: LeadRepository

  async execute(input: CreateLeadType): Promise<Lead> {
    const lead = Lead.create(input)
    return await this.LeadRepository.create(lead)
  }
}
