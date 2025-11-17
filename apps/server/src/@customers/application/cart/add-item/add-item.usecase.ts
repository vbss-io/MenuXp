import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import type { AddItemToCartType } from '@customers/application/cart/add-item/add-item.schema'
import { Cart, type CartItem } from '@customers/domain/cart/cart.entity'
import type { CartRepository } from '@customers/infra/repositories/cart.repository'
import type { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

import type { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'

export class AddItemToCartUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  @inject('CartRepository')
  private readonly CartRepository!: CartRepository

  async execute(input: AddItemToCartType): Promise<Cart> {
    if (input.clientId) {
      const client = await this.CustomerUserRepository.findById(input.clientId)
      if (!client) throw new NotFoundError('Customer User', input.clientId)
      if (client.restaurantId !== input.restaurantId) throw new NotFoundError('Customer User', input.clientId)
    }
    let itemName: string = ''
    let itemPrice: number = 0
    if (input.itemId && input.itemType === 'menu-item') {
      const menuItem = await this.MenuItemRepository.findById(input.itemId)
      if (!menuItem) throw new NotFoundError('Menu Item', input.itemId)
      if (menuItem.restaurantId !== input.restaurantId) throw new NotFoundError('Menu Item', input.itemId)
      if (!menuItem.isActive) throw new NotFoundError('Menu Item', input.itemId)
      itemName = menuItem.name
      itemPrice = menuItem.price
    }
    if (input.itemId && input.itemType === 'combo') {
      const combo = await this.ComboRepository.findById(input.itemId)
      if (!combo) throw new NotFoundError('Combo', input.itemId)
      if (combo.restaurantId !== input.restaurantId) throw new NotFoundError('Combo', input.itemId)
      if (!combo.isActive) throw new NotFoundError('Combo', input.itemId)
      itemName = combo.name
      itemPrice = combo.price
    }
    const query = input.clientId
      ? { clientId: input.clientId, restaurantId: input.restaurantId }
      : { sessionId: input.sessionId, restaurantId: input.restaurantId }
    let cart = await this.CartRepository.findOne(query)
    if (!cart) {
      cart = Cart.create({
        clientId: input.clientId,
        sessionId: input.sessionId,
        restaurantId: input.restaurantId
      })
    }
    const cartItem: CartItem = {
      itemId: input.itemId,
      name: itemName,
      price: itemPrice,
      quantity: input.quantity,
      itemType: input.itemType,
      optionals: input.optionals,
      note: input.note
    }
    cart.addItem(cartItem)
    return await this.CartRepository.update({ id: cart.id }, cart)
  }
}
