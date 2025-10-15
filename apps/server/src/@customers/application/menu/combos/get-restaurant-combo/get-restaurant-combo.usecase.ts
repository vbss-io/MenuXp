import { NotFoundError } from '@api/domain/errors'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetRestaurantComboType } from '@customers/application/menu/combos/get-restaurant-combo/get-restaurant-combo.schema'
import type { Combo } from '@restaurants/domain/combos/combo.entity'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export type GetRestaurantComboUsecaseOutput = Partial<Combo> & {
  categoryName: string
  medias: string[]
}

export class GetRestaurantComboUsecase {
  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  async execute({ restaurantId, comboId }: GetRestaurantComboType): Promise<GetRestaurantComboUsecaseOutput> {
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    const combo = await this.ComboRepository.findOne({
      id: comboId,
      restaurantId,
      isActive: true
    })
    if (!combo) throw new NotFoundError('Combo', comboId)
    const category = await this.CategoryRepository.findById(combo.categoryId)
    if (!category) throw new NotFoundError('Category', combo.categoryId)
    return {
      ...combo,
      categoryName: category.name,
      medias: combo.medias.map((media) => FileUrl.create(media).getValue() ?? '')
    }
  }
}
