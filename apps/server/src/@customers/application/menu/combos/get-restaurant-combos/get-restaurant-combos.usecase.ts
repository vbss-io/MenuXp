import { NotFoundError } from '@api/domain/errors'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantCombosType } from '@customers/application/menu/combos/get-restaurant-combos/get-restaurant-combos.schema'

import type { Combo } from '@restaurants/domain/combos/combo.entity'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export type GetRestaurantCombosUsecaseOutput = (Partial<Combo> & { medias: string[] })[]

export class GetRestaurantCombosUsecase {
  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute({ restaurantId, type, comboIds }: GetRestaurantCombosType): Promise<GetRestaurantCombosUsecaseOutput> {
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    let activeCombos = await this.ComboRepository.find({
      restaurantId,
      isActive: true
    })
    if (type) {
      switch (type) {
        case 'best_sellers':
          // To-Do: Implement logic to get the 5 best sellers combos
          activeCombos = activeCombos.slice(0, 5)
          break
        case 'discounts':
          activeCombos = activeCombos.filter((combo) => combo.discount > 0)
          break
        case 'custom':
          if (comboIds && comboIds.length > 0) {
            activeCombos = activeCombos.filter((combo) => comboIds?.includes(combo.id as string))
          }
          break
        default:
          break
      }
    }
    return activeCombos.map((combo) => ({
      ...combo,
      medias: combo.medias.map((media) => FileUrl.create(media).getValue() ?? '')
    }))
  }
}
