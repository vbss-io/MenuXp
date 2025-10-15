import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { MenuLayoutSectionsModule } from '@restaurants/application/menu-layouts/@sections/menu-layout-sections.module'
import { ActivateMenuLayoutController } from '@restaurants/application/menu-layouts/activate-menu-layout/activate-menu-layout.controller'
import { ActivateMenuLayoutSchema } from '@restaurants/application/menu-layouts/activate-menu-layout/activate-menu-layout.schema'
import { ActivateMenuLayoutUsecase } from '@restaurants/application/menu-layouts/activate-menu-layout/activate-menu-layout.usecase'
import { CreateMenuLayoutController } from '@restaurants/application/menu-layouts/create-menu-layout/create-menu-layout.controller'
import { CreateMenuLayoutSchema } from '@restaurants/application/menu-layouts/create-menu-layout/create-menu-layout.schema'
import { CreateMenuLayoutUsecase } from '@restaurants/application/menu-layouts/create-menu-layout/create-menu-layout.usecase'
import { DeleteMenuLayoutController } from '@restaurants/application/menu-layouts/delete-menu-layout/delete-menu-layout.controller'
import { DeleteMenuLayoutSchema } from '@restaurants/application/menu-layouts/delete-menu-layout/delete-menu-layout.schema'
import { DeleteMenuLayoutUsecase } from '@restaurants/application/menu-layouts/delete-menu-layout/delete-menu-layout.usecase'
import { GetMenuLayoutController } from '@restaurants/application/menu-layouts/get-menu-layout/get-menu-layout.controller'
import { GetMenuLayoutSchema } from '@restaurants/application/menu-layouts/get-menu-layout/get-menu-layout.schema'
import { GetMenuLayoutUsecase } from '@restaurants/application/menu-layouts/get-menu-layout/get-menu-layout.usecase'
import { GetMenuLayoutsController } from '@restaurants/application/menu-layouts/get-menu-layouts/get-menu-layouts.controller'
import { GetMenuLayoutsSchema } from '@restaurants/application/menu-layouts/get-menu-layouts/get-menu-layouts.schema'
import { GetMenuLayoutsUsecase } from '@restaurants/application/menu-layouts/get-menu-layouts/get-menu-layouts.usecase'
import { GetMenuSectionsController } from '@restaurants/application/menu-layouts/get-menu-sections/get-menu-sections.controller'
import { GetMenuSectionsUsecase } from '@restaurants/application/menu-layouts/get-menu-sections/get-menu-sections.usecase'
import { UpdateMenuLayoutBasicInfoController } from '@restaurants/application/menu-layouts/update-menu-layout-basic-info/update-menu-layout-basic-info.controller'
import { UpdateMenuLayoutBasicInfoSchema } from '@restaurants/application/menu-layouts/update-menu-layout-basic-info/update-menu-layout-basic-info.schema'
import { UpdateMenuLayoutBasicInfoUsecase } from '@restaurants/application/menu-layouts/update-menu-layout-basic-info/update-menu-layout-basic-info.usecase'

export class MenuLayoutsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('ActivateMenuLayoutValidate', new ZodAdapter(ActivateMenuLayoutSchema))
    registry.provide('ActivateMenuLayoutUsecase', new ActivateMenuLayoutUsecase())
    new ActivateMenuLayoutController()

    registry.provide('CreateMenuLayoutValidate', new ZodAdapter(CreateMenuLayoutSchema))
    registry.provide('CreateMenuLayoutUsecase', new CreateMenuLayoutUsecase())
    new CreateMenuLayoutController()

    registry.provide('DeleteMenuLayoutValidate', new ZodAdapter(DeleteMenuLayoutSchema))
    registry.provide('DeleteMenuLayoutUsecase', new DeleteMenuLayoutUsecase())
    new DeleteMenuLayoutController()

    registry.provide('GetMenuLayoutValidate', new ZodAdapter(GetMenuLayoutSchema))
    registry.provide('GetMenuLayoutUsecase', new GetMenuLayoutUsecase())
    new GetMenuLayoutController()

    registry.provide('GetMenuLayoutsValidate', new ZodAdapter(GetMenuLayoutsSchema))
    registry.provide('GetMenuLayoutsUsecase', new GetMenuLayoutsUsecase())
    new GetMenuLayoutsController()

    registry.provide('GetMenuSectionsUsecase', new GetMenuSectionsUsecase())
    new GetMenuSectionsController()

    registry.provide('UpdateMenuLayoutBasicInfoValidate', new ZodAdapter(UpdateMenuLayoutBasicInfoSchema))
    registry.provide('UpdateMenuLayoutBasicInfoUsecase', new UpdateMenuLayoutBasicInfoUsecase())
    new UpdateMenuLayoutBasicInfoController()

    new MenuLayoutSectionsModule()
  }
}
