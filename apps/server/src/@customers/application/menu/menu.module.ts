import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'

import { GetRestaurantItemsByCategoryController } from '@customers/application/menu/all-items/get-restaurant-items-by-category/get-restaurant-items-by-category.controller'
import { GetRestaurantItemsByCategorySchema } from '@customers/application/menu/all-items/get-restaurant-items-by-category/get-restaurant-items-by-category.schema'
import { GetRestaurantItemsByCategoryUsecase } from '@customers/application/menu/all-items/get-restaurant-items-by-category/get-restaurant-items-by-category.usecase'
import { GetRestaurantMenuCategoriesController } from '@customers/application/menu/categories/get-restaurant-menu-categories/get-restaurant-menu-categories.controller'
import { GetRestaurantMenuCategoriesSchema } from '@customers/application/menu/categories/get-restaurant-menu-categories/get-restaurant-menu-categories.schema'
import { GetRestaurantMenuCategoriesUsecase } from '@customers/application/menu/categories/get-restaurant-menu-categories/get-restaurant-menu-categories.usecase'
import { GetRestaurantComboController } from '@customers/application/menu/combos/get-restaurant-combo/get-restaurant-combo.controller'
import { GetRestaurantComboSchema } from '@customers/application/menu/combos/get-restaurant-combo/get-restaurant-combo.schema'
import { GetRestaurantComboUsecase } from '@customers/application/menu/combos/get-restaurant-combo/get-restaurant-combo.usecase'
import { GetRestaurantCombosController } from '@customers/application/menu/combos/get-restaurant-combos/get-restaurant-combos.controller'
import { GetRestaurantCombosSchema } from '@customers/application/menu/combos/get-restaurant-combos/get-restaurant-combos.schema'
import { GetRestaurantCombosUsecase } from '@customers/application/menu/combos/get-restaurant-combos/get-restaurant-combos.usecase'
import { GetRestaurantCombosByCategoryController } from '@customers/application/menu/combos/get-restaurant-combos-by-category/get-restaurant-combos-by-category.controller'
import { GetRestaurantCombosByCategorySchema } from '@customers/application/menu/combos/get-restaurant-combos-by-category/get-restaurant-combos-by-category.schema'
import { GetRestaurantCombosByCategoryUsecase } from '@customers/application/menu/combos/get-restaurant-combos-by-category/get-restaurant-combos-by-category.usecase'
import { GetRestaurantMenuItemController } from '@customers/application/menu/menu-items/get-restaurant-menu-item/get-restaurant-menu-item.controller'
import { GetRestaurantMenuItemSchema } from '@customers/application/menu/menu-items/get-restaurant-menu-item/get-restaurant-menu-item.schema'
import { GetRestaurantMenuItemUsecase } from '@customers/application/menu/menu-items/get-restaurant-menu-item/get-restaurant-menu-item.usecase'
import { GetRestaurantMenuItemsByCategoryController } from '@customers/application/menu/menu-items/get-restaurant-menu-item-by-category/get-restaurant-menu-items-by-category.controller'
import { GetRestaurantMenuItemsByCategorySchema } from '@customers/application/menu/menu-items/get-restaurant-menu-item-by-category/get-restaurant-menu-items-by-category.schema'
import { GetRestaurantMenuItemsByCategoryUsecase } from '@customers/application/menu/menu-items/get-restaurant-menu-item-by-category/get-restaurant-menu-items-by-category.usecase'
import { GetRestaurantMenuItemsController } from '@customers/application/menu/menu-items/get-restaurant-menu-items/get-restaurant-menu-items.controller'
import { GetRestaurantMenuItemsSchema } from '@customers/application/menu/menu-items/get-restaurant-menu-items/get-restaurant-menu-items.schema'
import { GetRestaurantMenuItemsUsecase } from '@customers/application/menu/menu-items/get-restaurant-menu-items/get-restaurant-menu-items.usecase'

export class MenuModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetRestaurantMenuCategoriesValidate', new ZodAdapter(GetRestaurantMenuCategoriesSchema))
    registry.provide('GetRestaurantMenuCategoriesUsecase', new GetRestaurantMenuCategoriesUsecase())
    new GetRestaurantMenuCategoriesController()

    registry.provide('GetRestaurantMenuItemValidate', new ZodAdapter(GetRestaurantMenuItemSchema))
    registry.provide('GetRestaurantMenuItemUsecase', new GetRestaurantMenuItemUsecase())
    new GetRestaurantMenuItemController()

    registry.provide('GetRestaurantMenuItemsByCategoryValidate', new ZodAdapter(GetRestaurantMenuItemsByCategorySchema))
    registry.provide('GetRestaurantMenuItemsByCategoryUsecase', new GetRestaurantMenuItemsByCategoryUsecase())
    new GetRestaurantMenuItemsByCategoryController()

    registry.provide('GetRestaurantMenuItemsValidate', new ZodAdapter(GetRestaurantMenuItemsSchema))
    registry.provide('GetRestaurantMenuItemsUsecase', new GetRestaurantMenuItemsUsecase())
    new GetRestaurantMenuItemsController()

    registry.provide('GetRestaurantComboValidate', new ZodAdapter(GetRestaurantComboSchema))
    registry.provide('GetRestaurantComboUsecase', new GetRestaurantComboUsecase())
    new GetRestaurantComboController()

    registry.provide('GetRestaurantCombosByCategoryValidate', new ZodAdapter(GetRestaurantCombosByCategorySchema))
    registry.provide('GetRestaurantCombosByCategoryUsecase', new GetRestaurantCombosByCategoryUsecase())
    new GetRestaurantCombosByCategoryController()

    registry.provide('GetRestaurantCombosValidate', new ZodAdapter(GetRestaurantCombosSchema))
    registry.provide('GetRestaurantCombosUsecase', new GetRestaurantCombosUsecase())
    new GetRestaurantCombosController()

    registry.provide('GetRestaurantItemsByCategoryValidate', new ZodAdapter(GetRestaurantItemsByCategorySchema))
    registry.provide('GetRestaurantItemsByCategoryUsecase', new GetRestaurantItemsByCategoryUsecase())
    new GetRestaurantItemsByCategoryController()
  }
}
