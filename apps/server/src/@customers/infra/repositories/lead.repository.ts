import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { Lead } from '@customers/domain/leads/lead.entity'
import { type LeadDocument, LeadModel } from '@customers/domain/leads/lead.schema'

export interface LeadRepository<T = unknown> extends BaseRepository<T, Lead> {
  toDomain(entity: T): Lead
}

export class LeadRepositoryMongoose
  extends BaseRepositoryMongoose<LeadDocument, Lead>
  implements LeadRepository<LeadDocument>
{
  constructor(model = LeadModel) {
    super(model)
  }

  toDomain(entity: LeadDocument): Lead {
    return Lead.restore({
      id: entity._id.toString(),
      name: entity.name,
      email: entity.email,
      whatsapp: entity.whatsapp,
      scenario: entity.scenario,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
