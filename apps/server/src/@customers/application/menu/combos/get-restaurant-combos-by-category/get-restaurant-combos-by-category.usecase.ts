import { NotFoundError } from '@api/domain/errors'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantCombosByCategoryType } from '@customers/application/menu/combos/get-restaurant-combos-by-category/get-restaurant-combos-by-category.schema'
import type { Combo } from '@restaurants/domain/combos/combo.entity'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export type GetRestaurantCombosByCategoryUsecaseOutput = (Partial<Combo> & { medias: string[] })[]

export class GetRestaurantCombosByCategoryUsecase {
  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute(input: GetRestaurantCombosByCategoryType): Promise<GetRestaurantCombosByCategoryUsecaseOutput> {
    const { restaurantId, categoryId } = input
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    const activeCombos = await this.ComboRepository.find({
      restaurantId,
      categoryId,
      isActive: true
    })
    return activeCombos.map((combo) => ({
      ...combo,
      medias: combo.medias.map((media) => FileUrl.create(media).getValue() ?? '')
    }))
  }
}
