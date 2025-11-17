import { FormDataZodAdapter, ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'

import { GetCategoriesNamesQueryMongoose } from '@restaurants/application/categories/@queries/get-categories-names.query'
import { GetCategoriesQueryMongoose } from '@restaurants/application/categories/@queries/get-categories.query'
import { CreateCategoryController } from '@restaurants/application/categories/create-category/create-category.controller'
import {
  type CreateCategoryInputType,
  type CreateCategoryType,
  CreateCategorySchema
} from '@restaurants/application/categories/create-category/create-category.schema'
import { CreateCategoryUsecase } from '@restaurants/application/categories/create-category/create-category.usecase'
import { DeleteCategoryController } from '@restaurants/application/categories/delete-category/delete-category.controller'
import { DeleteCategorySchema } from '@restaurants/application/categories/delete-category/delete-category.schema'
import { DeleteCategoryUsecase } from '@restaurants/application/categories/delete-category/delete-category.usecase'
import { GetCategoriesController } from '@restaurants/application/categories/get-categories/get-categories.controller'
import { GetCategoriesSchema } from '@restaurants/application/categories/get-categories/get-categories.schema'
import { GetCategoriesUsecase } from '@restaurants/application/categories/get-categories/get-categories.usecase'
import { GetCategoriesNamesController } from '@restaurants/application/categories/get-categories-names/get-categories-names.controller'
import { GetCategoriesNamesUsecase } from '@restaurants/application/categories/get-categories-names/get-categories-names.usecase'
import { GetCategoryController } from '@restaurants/application/categories/get-category/get-category.controller'
import { GetCategorySchema } from '@restaurants/application/categories/get-category/get-category.schema'
import { GetCategoryUsecase } from '@restaurants/application/categories/get-category/get-category.usecase'
import { ToggleCategoryStatusController } from '@restaurants/application/categories/toggle-category-status/toggle-category-status.controller'
import { ToggleCategoryStatusSchema } from '@restaurants/application/categories/toggle-category-status/toggle-category-status.schema'
import { ToggleCategoryStatusUsecase } from '@restaurants/application/categories/toggle-category-status/toggle-category-status.usecase'
import { UpdateCategoryController } from '@restaurants/application/categories/update-category/update-category.controller'
import {
  type UpdateCategoryInputType,
  type UpdateCategoryType,
  UpdateCategorySchema
} from '@restaurants/application/categories/update-category/update-category.schema'
import { UpdateCategoryUsecase } from '@restaurants/application/categories/update-category/update-category.usecase'

export class CategoriesModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('GetCategoriesNamesQuery', new GetCategoriesNamesQueryMongoose())
    registry.provide('GetCategoriesQuery', new GetCategoriesQueryMongoose())

    registry.provide(
      'CreateCategoryValidate',
      new FormDataZodAdapter<CreateCategoryInputType, CreateCategoryType>(CreateCategorySchema)
    )
    registry.provide('CreateCategoryUsecase', new CreateCategoryUsecase())
    new CreateCategoryController()

    registry.provide('DeleteCategoryValidate', new ZodAdapter(DeleteCategorySchema))
    registry.provide('DeleteCategoryUsecase', new DeleteCategoryUsecase())
    new DeleteCategoryController()

    registry.provide('GetCategoriesValidate', new ZodAdapter(GetCategoriesSchema))
    registry.provide('GetCategoriesUsecase', new GetCategoriesUsecase())
    new GetCategoriesController()

    registry.provide('GetCategoriesNamesUsecase', new GetCategoriesNamesUsecase())
    new GetCategoriesNamesController()

    registry.provide('GetCategoryValidate', new ZodAdapter(GetCategorySchema))
    registry.provide('GetCategoryUsecase', new GetCategoryUsecase())
    new GetCategoryController()

    registry.provide('ToggleCategoryStatusValidate', new ZodAdapter(ToggleCategoryStatusSchema))
    registry.provide('ToggleCategoryStatusUsecase', new ToggleCategoryStatusUsecase())
    new ToggleCategoryStatusController()

    registry.provide(
      'UpdateCategoryValidate',
      new FormDataZodAdapter<UpdateCategoryInputType, UpdateCategoryType>(UpdateCategorySchema)
    )
    registry.provide('UpdateCategoryUsecase', new UpdateCategoryUsecase())
    new UpdateCategoryController()
  }
}
