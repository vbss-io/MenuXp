import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { ActivateMenuLayoutType } from '@restaurants/application/menu-layouts/activate-menu-layout/activate-menu-layout.schema'
import { MenuLayoutStatus } from '@restaurants/domain/menu-layouts/enums/menu-layout-status.enum'
import { MenuLayoutEntity } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import { MenuLayoutRepository } from '@restaurants/infra/repositories/menu-layout.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type ActivateMenuLayoutUsecaseInput = ActivateMenuLayoutType & {
  userId: string
}

export class ActivateMenuLayoutUsecase {
  @inject('MenuLayoutRepository')
  private readonly MenuLayoutRepository!: MenuLayoutRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ userId, layoutId }: ActivateMenuLayoutUsecaseInput): Promise<MenuLayoutEntity> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const existingLayout = await this.MenuLayoutRepository.findById(layoutId)
    if (!existingLayout) throw new NotFoundError('MenuLayout', layoutId)
    const restaurant = await this.RestaurantRepository.findById(existingLayout.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', existingLayout.restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to activate menu layout')
    const activeLayouts = await this.MenuLayoutRepository.find({
      restaurantId: existingLayout.restaurantId,
      status: MenuLayoutStatus.ACTIVE
    })
    for (const layout of activeLayouts) {
      layout.deactivate()
      await this.MenuLayoutRepository.update({ id: layout.id }, layout)
    }
    existingLayout.activate()
    return await this.MenuLayoutRepository.update({ id: layoutId }, existingLayout)
  }
}
