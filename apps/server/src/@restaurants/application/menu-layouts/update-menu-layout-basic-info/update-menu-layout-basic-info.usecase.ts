import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdateMenuLayoutBasicInfoType } from '@restaurants/application/menu-layouts/update-menu-layout-basic-info/update-menu-layout-basic-info.schema'
import { MenuLayoutEntity } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import { MenuLayoutRepository } from '@restaurants/infra/repositories/menu-layout.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdateMenuLayoutBasicInfoUsecaseInput = UpdateMenuLayoutBasicInfoType & {
  userId: string
}

export class UpdateMenuLayoutBasicInfoUsecase {
  @inject('MenuLayoutRepository')
  private readonly MenuLayoutRepository!: MenuLayoutRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ userId, layoutId, ...updateData }: UpdateMenuLayoutBasicInfoUsecaseInput): Promise<MenuLayoutEntity> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const menuLayout = await this.MenuLayoutRepository.findById(layoutId)
    if (!menuLayout) throw new NotFoundError('MenuLayout', layoutId)
    const restaurant = await this.RestaurantRepository.findById(menuLayout.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', menuLayout.restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to update menu layout')
    menuLayout.update(updateData)
    return await this.MenuLayoutRepository.update({ id: layoutId }, menuLayout)
  }
}
