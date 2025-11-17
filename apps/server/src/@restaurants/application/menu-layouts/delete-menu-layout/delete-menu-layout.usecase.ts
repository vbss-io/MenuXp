import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { DeleteMenuLayoutType } from '@restaurants/application/menu-layouts/delete-menu-layout/delete-menu-layout.schema'
import { MenuLayoutStatus } from '@restaurants/domain/menu-layouts/enums/menu-layout-status.enum'
import { MenuLayoutRepository } from '@restaurants/infra/repositories/menu-layout.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type DeleteMenuLayoutUsecaseInput = DeleteMenuLayoutType & {
  userId: string
}

export class DeleteMenuLayoutUsecase {
  @inject('MenuLayoutRepository')
  private readonly MenuLayoutRepository!: MenuLayoutRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ layoutId, userId }: DeleteMenuLayoutUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const menuLayout = await this.MenuLayoutRepository.findById(layoutId)
    if (!menuLayout) throw new NotFoundError('MenuLayout', layoutId)
    const restaurant = await this.RestaurantRepository.findById(menuLayout.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', menuLayout.restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to delete menu layout')
    if (menuLayout.status === MenuLayoutStatus.ACTIVE) {
      throw new ForbiddenError('Cannot delete active menu layout')
    }
    await this.MenuLayoutRepository.delete({ id: layoutId })
  }
}
