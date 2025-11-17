import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetCombosType } from '@restaurants/application/combos/get-combos/get-combos.schema'
import { Combo } from '@restaurants/domain/combos/combo.entity'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetCombosUsecaseInput = GetCombosType & {
  userId: string
}

export interface GetCombosUsecaseOutput {
  total: number
  combos: Combo[]
}

export class GetCombosUsecase {
  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ userId, restaurantId, ...input }: GetCombosUsecaseInput): Promise<GetCombosUsecaseOutput> {
    // TODO: implement query and add category name and medias
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to get combos')
    const criteria: Record<string, unknown> = { restaurantId }
    if (input.categoryId) criteria.categoryId = input.categoryId
    if (input.includeInactive === 'false') criteria.isActive = true
    const combos = await this.ComboRepository.find(criteria)
    const startIndex = (input.page - 1) * input.rowsPerPage
    const endIndex = startIndex + input.rowsPerPage
    const paginatedCombos = combos.slice(startIndex, endIndex)
    return {
      total: combos.length,
      combos: paginatedCombos
    }
  }
}
