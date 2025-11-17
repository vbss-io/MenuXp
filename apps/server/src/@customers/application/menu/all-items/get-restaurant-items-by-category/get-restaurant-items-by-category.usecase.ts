import { NotFoundError } from '@api/domain/errors'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantItemsByCategoryType } from '@customers/application/menu/all-items/get-restaurant-items-by-category/get-restaurant-items-by-category.schema'

import type { Combo } from '@restaurants/domain/combos/combo.entity'
import type { MenuItem } from '@restaurants/domain/menu-items/menu-item.entity'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export interface GetRestaurantItemsByCategoryUsecaseOutput {
  items: (Partial<MenuItem | Combo> & { medias: string[] })[]
  total: number
}

export class GetRestaurantItemsByCategoryUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute({
    restaurantId,
    categoryId
  }: GetRestaurantItemsByCategoryType): Promise<GetRestaurantItemsByCategoryUsecaseOutput> {
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    const activeMenuItems = await this.MenuItemRepository.find({
      restaurantId,
      categoryId,
      isActive: true
    })
    const activeCombos = await this.ComboRepository.find({
      restaurantId,
      categoryId,
      isActive: true
    })
    const processedMenuItems = activeMenuItems.map((menuItem) => ({
      ...menuItem,
      medias: menuItem.medias.map((media) => FileUrl.create(media).getValue() ?? '')
    }))
    const processedCombos = activeCombos.map((combo) => ({
      ...combo,
      medias: combo.medias.map((media) => FileUrl.create(media).getValue() ?? '')
    }))
    return {
      items: [...processedMenuItems, ...processedCombos],
      total: processedMenuItems.length + processedCombos.length
    }
  }
}
