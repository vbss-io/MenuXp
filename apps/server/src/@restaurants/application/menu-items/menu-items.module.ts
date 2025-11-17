import { FormDataZodAdapter, ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'

import { GetMenuItemsQueryMongoose } from '@restaurants/application/menu-items/@queries/get-menu-items.query'
import { CreateMenuItemController } from '@restaurants/application/menu-items/create-menu-item/create-menu-item.controller'
import {
  type CreateMenuItemInputType,
  type CreateMenuItemType,
  CreateMenuItemSchema
} from '@restaurants/application/menu-items/create-menu-item/create-menu-item.schema'
import { CreateMenuItemUsecase } from '@restaurants/application/menu-items/create-menu-item/create-menu-item.usecase'
import { DeleteMenuItemController } from '@restaurants/application/menu-items/delete-menu-item/delete-menu-item.controller'
import { DeleteMenuItemSchema } from '@restaurants/application/menu-items/delete-menu-item/delete-menu-item.schema'
import { DeleteMenuItemUsecase } from '@restaurants/application/menu-items/delete-menu-item/delete-menu-item.usecase'
import { GetMenuItemController } from '@restaurants/application/menu-items/get-menu-item/get-menu-item.controller'
import { GetMenuItemSchema } from '@restaurants/application/menu-items/get-menu-item/get-menu-item.schema'
import { GetMenuItemUsecase } from '@restaurants/application/menu-items/get-menu-item/get-menu-item.usecase'
import { GetMenuItemOptionalsController } from '@restaurants/application/menu-items/get-menu-item-optionals/get-menu-item-optionals.controller'
import { GetMenuItemOptionalsSchema } from '@restaurants/application/menu-items/get-menu-item-optionals/get-menu-item-optionals.schema'
import { GetMenuItemOptionalsUsecase } from '@restaurants/application/menu-items/get-menu-item-optionals/get-menu-item-optionals.usecase'
import { GetMenuItemsController } from '@restaurants/application/menu-items/get-menu-items/get-menu-items.controller'
import { GetMenuItemsSchema } from '@restaurants/application/menu-items/get-menu-items/get-menu-items.schema'
import { GetMenuItemsUsecase } from '@restaurants/application/menu-items/get-menu-items/get-menu-items.usecase'
import { ToggleMenuItemStatusController } from '@restaurants/application/menu-items/toggle-menu-item-status/toggle-menu-item-status.controller'
import { ToggleMenuItemStatusSchema } from '@restaurants/application/menu-items/toggle-menu-item-status/toggle-menu-item-status.schema'
import { ToggleMenuItemStatusUsecase } from '@restaurants/application/menu-items/toggle-menu-item-status/toggle-menu-item-status.usecase'
import { UpdateMenuItemController } from '@restaurants/application/menu-items/update-menu-item/update-menu-item.controller'
import {
  type UpdateMenuItemInputType,
  type UpdateMenuItemType,
  UpdateMenuItemSchema
} from '@restaurants/application/menu-items/update-menu-item/update-menu-item.schema'
import { UpdateMenuItemUsecase } from '@restaurants/application/menu-items/update-menu-item/update-menu-item.usecase'

export class MenuItemsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetMenuItemsQuery', new GetMenuItemsQueryMongoose())

    registry.provide(
      'CreateMenuItemValidate',
      new FormDataZodAdapter<CreateMenuItemInputType, CreateMenuItemType>(CreateMenuItemSchema)
    )
    registry.provide('CreateMenuItemUsecase', new CreateMenuItemUsecase())
    new CreateMenuItemController()

    registry.provide('DeleteMenuItemValidate', new ZodAdapter(DeleteMenuItemSchema))
    registry.provide('DeleteMenuItemUsecase', new DeleteMenuItemUsecase())
    new DeleteMenuItemController()

    registry.provide('GetMenuItemValidate', new ZodAdapter(GetMenuItemSchema))
    registry.provide('GetMenuItemUsecase', new GetMenuItemUsecase())
    new GetMenuItemController()

    registry.provide('GetMenuItemOptionalsValidate', new ZodAdapter(GetMenuItemOptionalsSchema))
    registry.provide('GetMenuItemOptionalsUsecase', new GetMenuItemOptionalsUsecase())
    new GetMenuItemOptionalsController()

    registry.provide('GetMenuItemsValidate', new ZodAdapter(GetMenuItemsSchema))
    registry.provide('GetMenuItemsUsecase', new GetMenuItemsUsecase())
    new GetMenuItemsController()

    registry.provide('ToggleMenuItemStatusValidate', new ZodAdapter(ToggleMenuItemStatusSchema))
    registry.provide('ToggleMenuItemStatusUsecase', new ToggleMenuItemStatusUsecase())
    new ToggleMenuItemStatusController()

    registry.provide(
      'UpdateMenuItemValidate',
      new FormDataZodAdapter<UpdateMenuItemInputType, UpdateMenuItemType>(UpdateMenuItemSchema)
    )
    registry.provide('UpdateMenuItemUsecase', new UpdateMenuItemUsecase())
    new UpdateMenuItemController()
  }
}
