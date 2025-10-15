import { BadRequestError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateCartItemQuantityType } from '@customers/application/cart/update-quantity/update-quantity.schema'
import { Cart } from '@customers/domain/cart/cart.entity'
import type { CartRepository } from '@customers/infra/repositories/cart.repository'
import type { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

export class UpdateCartItemQuantityUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('CartRepository')
  private readonly CartRepository!: CartRepository

  async execute(input: UpdateCartItemQuantityType): Promise<Cart> {
    if (input.clientId) {
      const client = await this.CustomerUserRepository.findById(input.clientId)
      if (!client) throw new NotFoundError('Customer User', input.clientId)
      if (client.restaurantId !== input.restaurantId)
        throw new BadRequestError('Customer does not belong to this restaurant')
    }
    const query = input.clientId
      ? { clientId: input.clientId, restaurantId: input.restaurantId }
      : { sessionId: input.sessionId, restaurantId: input.restaurantId }
    const cart = await this.CartRepository.findOne(query)
    if (!cart) throw new NotFoundError('Cart', input.clientId)
    cart.updateItemQuantity(input.itemId, input.quantity, input.optionals, input.note)
    return await this.CartRepository.update({ id: cart.id }, cart)
  }
}
