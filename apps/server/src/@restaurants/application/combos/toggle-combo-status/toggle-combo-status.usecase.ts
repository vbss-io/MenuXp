import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { ToggleComboStatusType } from '@restaurants/application/combos/toggle-combo-status/toggle-combo-status.schema'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type ToggleComboStatusUsecaseInput = ToggleComboStatusType & {
  userId: string
}

export class ToggleComboStatusUsecase {
  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute(input: ToggleComboStatusUsecaseInput): Promise<void> {
    const { comboId, userId } = input
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const combo = await this.ComboRepository.findById(comboId)
    if (!combo) throw new NotFoundError('Combo', comboId)
    const restaurant = await this.RestaurantRepository.findById(combo.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', combo.restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to toggle combo status')
    const newStatus = !combo.isActive
    await this.ComboRepository.update({ id: comboId }, { isActive: newStatus })
  }
}
