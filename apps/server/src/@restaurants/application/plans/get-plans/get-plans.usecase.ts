import { inject } from '@api/infra/dependency-injection/registry'
import { Plan } from '@restaurants/domain/plans/plan.entity'
import { PlanRepository } from '@restaurants/infra/repositories/plan.repository'

export class GetPlansUsecase {
  @inject('PlanRepository')
  private readonly PlanRepository!: PlanRepository

  async execute(): Promise<Plan[]> {
    return await this.PlanRepository.find({ isActive: true })
  }
}
