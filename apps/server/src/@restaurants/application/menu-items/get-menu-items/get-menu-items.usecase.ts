import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetMenuItemsQuery } from '@restaurants/application/menu-items/@queries/get-menu-items.query'
import { GetMenuItemsType } from '@restaurants/application/menu-items/get-menu-items/get-menu-items.schema'
import { MenuItem } from '@restaurants/domain/menu-items/menu-item.entity'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetMenuItemsUsecaseInput = GetMenuItemsType & {
  userId: string
}

export interface GetMenuItemsUsecaseOutput {
  total: number
  menuItems: Array<
    Partial<MenuItem> & {
      categoryName: string
    }
  >
}

export class GetMenuItemsUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('GetMenuItemsQuery')
  private readonly GetMenuItemsQuery!: GetMenuItemsQuery

  async execute({ userId, restaurantId, ...input }: GetMenuItemsUsecaseInput): Promise<GetMenuItemsUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to get menu items')
    const result = await this.GetMenuItemsQuery.execute({
      restaurantId,
      ...input,
      includeInactive: input.includeInactive === 'true'
    })
    return result
  }
}
