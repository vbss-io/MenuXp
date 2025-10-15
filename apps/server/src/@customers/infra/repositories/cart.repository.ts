import { type BaseRepository, BaseRepositoryMongoose } from '@api/infra/repository/@base.repository'
import { Cart } from '@customers/domain/cart/cart.entity'
import { type CartDocument, CartModel } from '@customers/domain/cart/cart.schema'

export interface CartRepository<T = unknown> extends BaseRepository<T, Cart> {
  toDomain(entity: T): Cart
}

export class CartRepositoryMongoose
  extends BaseRepositoryMongoose<CartDocument, Cart>
  implements CartRepository<CartDocument>
{
  constructor(model = CartModel) {
    super(model)
  }

  toDomain(entity: CartDocument): Cart {
    return Cart.restore({
      id: entity._id.toString(),
      clientId: entity.clientId,
      sessionId: entity.sessionId,
      restaurantId: entity.restaurantId,
      items: entity.items,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }
}
