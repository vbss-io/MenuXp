import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { Plan } from '@restaurants/domain/plans/plan.entity'
import { type PlanDocument, PlanModel } from '@restaurants/domain/plans/plan.schema'

export interface PlanRepository<T = unknown> extends BaseRepository<T, Plan> {
  toDomain(plan: T): Plan
}

export class PlanRepositoryMongoose
  extends BaseRepositoryMongoose<PlanDocument, Plan>
  implements PlanRepository<PlanDocument>
{
  constructor(model = PlanModel) {
    super(model)
  }

  toDomain(entity: PlanDocument): Plan {
    return Plan.restore({
      id: entity._id.toString(),
      name: entity.name,
      code: entity.code,
      price: entity.price,
      yearlyDiscount: entity.yearlyDiscount,
      currency: entity.currency,
      isActive: entity.isActive,
      features: entity.features,
      description: entity.description,
      monthlyPriceId: entity.monthlyPriceId,
      yearlyPriceId: entity.yearlyPriceId,
      externalProductId: entity.externalProductId,
      intervals: entity.intervals,
      taxBehavior: entity.taxBehavior,
      trialDays: entity.trialDays,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
