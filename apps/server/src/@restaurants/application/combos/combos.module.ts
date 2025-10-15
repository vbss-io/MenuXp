import { FormDataZodAdapter, ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import {
  type CreateComboInputType,
  type CreateComboType,
  CreateComboSchema
} from '@restaurants/application/combos/create-combos/create-combo.schema'
import { CreateComboUsecase } from '@restaurants/application/combos/create-combos/create-combo.usecase'
import { CreateComboController } from '@restaurants/application/combos/create-combos/create-combos.controller'
import { DeleteComboController } from '@restaurants/application/combos/delete-combo/delete-combo.controller'
import { DeleteComboSchema } from '@restaurants/application/combos/delete-combo/delete-combo.schema'
import { DeleteComboUsecase } from '@restaurants/application/combos/delete-combo/delete-combo.usecase'
import { GetComboController } from '@restaurants/application/combos/get-combo/get-combo.controller'
import { GetComboSchema } from '@restaurants/application/combos/get-combo/get-combo.schema'
import { GetComboUsecase } from '@restaurants/application/combos/get-combo/get-combo.usecase'
import { GetCombosController } from '@restaurants/application/combos/get-combos/get-combos.controller'
import { GetCombosSchema } from '@restaurants/application/combos/get-combos/get-combos.schema'
import { GetCombosUsecase } from '@restaurants/application/combos/get-combos/get-combos.usecase'
import { ToggleComboStatusController } from '@restaurants/application/combos/toggle-combo-status/toggle-combo-status.controller'
import { ToggleComboStatusSchema } from '@restaurants/application/combos/toggle-combo-status/toggle-combo-status.schema'
import { ToggleComboStatusUsecase } from '@restaurants/application/combos/toggle-combo-status/toggle-combo-status.usecase'
import { UpdateComboController } from '@restaurants/application/combos/update-combo/update-combo.controller'
import {
  type UpdateComboInputType,
  type UpdateComboType,
  UpdateComboSchema
} from '@restaurants/application/combos/update-combo/update-combo.schema'
import { UpdateComboUsecase } from '@restaurants/application/combos/update-combo/update-combo.usecase'

export class CombosModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide(
      'CreateComboValidate',
      new FormDataZodAdapter<CreateComboInputType, CreateComboType>(CreateComboSchema)
    )
    registry.provide('CreateComboUsecase', new CreateComboUsecase())
    new CreateComboController()

    registry.provide('DeleteComboValidate', new ZodAdapter(DeleteComboSchema))
    registry.provide('DeleteComboUsecase', new DeleteComboUsecase())
    new DeleteComboController()

    registry.provide('GetComboValidate', new ZodAdapter(GetComboSchema))
    registry.provide('GetComboUsecase', new GetComboUsecase())
    new GetComboController()

    registry.provide('GetCombosValidate', new ZodAdapter(GetCombosSchema))
    registry.provide('GetCombosUsecase', new GetCombosUsecase())
    new GetCombosController()

    registry.provide('ToggleComboStatusValidate', new ZodAdapter(ToggleComboStatusSchema))
    registry.provide('ToggleComboStatusUsecase', new ToggleComboStatusUsecase())
    new ToggleComboStatusController()

    registry.provide(
      'UpdateComboValidate',
      new FormDataZodAdapter<UpdateComboInputType, UpdateComboType>(UpdateComboSchema)
    )
    registry.provide('UpdateComboUsecase', new UpdateComboUsecase())
    new UpdateComboController()
  }
}
