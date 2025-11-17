import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { CreateMenuLayoutType } from '@restaurants/application/menu-layouts/create-menu-layout/create-menu-layout.schema'
import { createMenuLayoutTemplate } from '@restaurants/domain/menu-layouts/consts/menu-layout-template.const'
import { MenuLayoutEntity } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import { MenuLayoutRepository } from '@restaurants/infra/repositories/menu-layout.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type CreateMenuLayoutUsecaseInput = CreateMenuLayoutType & {
  userId: string
}

export class CreateMenuLayoutUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('MenuLayoutRepository')
  private readonly MenuLayoutRepository!: MenuLayoutRepository

  async execute({ userId, restaurantId }: CreateMenuLayoutUsecaseInput): Promise<MenuLayoutEntity> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to create menu layout')
    const existingLayouts = await this.MenuLayoutRepository.find({ restaurantId })
    for (const layout of existingLayouts) {
      layout.deactivate()
      await this.MenuLayoutRepository.update({ id: layout.id }, layout)
    }
    const template = createMenuLayoutTemplate()
    const menuLayout = MenuLayoutEntity.create({
      name: template.name as string,
      restaurantId,
      description: template.description,
      layout: template.layout,
      sections: template.sections
    })
    return await this.MenuLayoutRepository.create(menuLayout)
  }
}
