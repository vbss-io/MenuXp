import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { AddItemToCartController } from '@customers/application/cart/add-item/add-item.controller'
import { AddItemToCartSchema } from '@customers/application/cart/add-item/add-item.schema'
import { AddItemToCartUsecase } from '@customers/application/cart/add-item/add-item.usecase'
import { ClearCartController } from '@customers/application/cart/clear-cart/clear-cart.controller'
import { ClearCartSchema } from '@customers/application/cart/clear-cart/clear-cart.schema'
import { ClearCartUsecase } from '@customers/application/cart/clear-cart/clear-cart.usecase'
import { GetCartController } from '@customers/application/cart/get-cart/get-cart.controller'
import { GetCartSchema } from '@customers/application/cart/get-cart/get-cart.schema'
import { GetCartUsecase } from '@customers/application/cart/get-cart/get-cart.usecase'
import { MigrateCartController } from '@customers/application/cart/migrate-cart/migrate-cart.controller'
import { MigrateCartSchema } from '@customers/application/cart/migrate-cart/migrate-cart.schema'
import { MigrateCartUsecase } from '@customers/application/cart/migrate-cart/migrate-cart.usecase'
import { RemoveItemFromCartController } from '@customers/application/cart/remove-item/remove-item.controller'
import { RemoveItemFromCartSchema } from '@customers/application/cart/remove-item/remove-item.schema'
import { RemoveItemFromCartUsecase } from '@customers/application/cart/remove-item/remove-item.usecase'
import { UpdateCartItemQuantityController } from '@customers/application/cart/update-quantity/update-quantity.controller'
import { UpdateCartItemQuantitySchema } from '@customers/application/cart/update-quantity/update-quantity.schema'
import { UpdateCartItemQuantityUsecase } from '@customers/application/cart/update-quantity/update-quantity.usecase'

export class CartModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('AddItemToCartValidate', new ZodAdapter(AddItemToCartSchema))
    registry.provide('AddItemToCartUsecase', new AddItemToCartUsecase())
    new AddItemToCartController()

    registry.provide('ClearCartValidate', new ZodAdapter(ClearCartSchema))
    registry.provide('ClearCartUsecase', new ClearCartUsecase())
    new ClearCartController()

    registry.provide('GetCartValidate', new ZodAdapter(GetCartSchema))
    registry.provide('GetCartUsecase', new GetCartUsecase())
    new GetCartController()

    registry.provide('RemoveItemFromCartValidate', new ZodAdapter(RemoveItemFromCartSchema))
    registry.provide('RemoveItemFromCartUsecase', new RemoveItemFromCartUsecase())
    new RemoveItemFromCartController()

    registry.provide('UpdateCartItemQuantityValidate', new ZodAdapter(UpdateCartItemQuantitySchema))
    registry.provide('UpdateCartItemQuantityUsecase', new UpdateCartItemQuantityUsecase())
    new UpdateCartItemQuantityController()

    registry.provide('MigrateCartSchema', new ZodAdapter(MigrateCartSchema))
    registry.provide('MigrateCartUsecase', new MigrateCartUsecase())
    new MigrateCartController()
  }
}
