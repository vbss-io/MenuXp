import { FormDataZodAdapter, ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'

import {
  type AddSectionInputType,
  type AddSectionType,
  AddSectionSchema
} from '@restaurants/application/menu-layouts/@sections/@schemas/add-section.schema'
import { RemoveSectionSchema } from '@restaurants/application/menu-layouts/@sections/@schemas/remove-section.schema'
import { ReorderSectionsSchema } from '@restaurants/application/menu-layouts/@sections/@schemas/reorder-sections.schema'
import { ManageSectionsController } from '@restaurants/application/menu-layouts/@sections/manage-sections/manage-sections.controller'
import { ManageSectionsUsecase } from '@restaurants/application/menu-layouts/@sections/manage-sections/manage-sections.usecase'
import { UpdateBannerSectionController } from '@restaurants/application/menu-layouts/@sections/update-banner-section/update-banner-section.controller'
import {
  type UpdateBannerSectionInputType,
  type UpdateBannerSectionType,
  UpdateBannerSectionSchema
} from '@restaurants/application/menu-layouts/@sections/update-banner-section/update-banner-section.schema'
import { UpdateBannerSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-banner-section/update-banner-section.usecase'
import { UpdateCarouselSectionController } from '@restaurants/application/menu-layouts/@sections/update-carousel-section/update-carousel-section.controller'
import {
  type UpdateCarouselSectionInputType,
  type UpdateCarouselSectionType,
  UpdateCarouselSectionSchema
} from '@restaurants/application/menu-layouts/@sections/update-carousel-section/update-carousel-section.schema'
import { UpdateCarouselSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-carousel-section/update-carousel-section.usecase'
import { UpdateCategoriesSectionController } from '@restaurants/application/menu-layouts/@sections/update-categories-section/update-categories-section.controller'
import { UpdateCategoriesSectionSchema } from '@restaurants/application/menu-layouts/@sections/update-categories-section/update-categories-section.schema'
import { UpdateCategoriesSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-categories-section/update-categories-section.usecase'
import { UpdateCombosSectionController } from '@restaurants/application/menu-layouts/@sections/update-combos-section/update-combos-section.controller'
import { UpdateCombosSectionSchema } from '@restaurants/application/menu-layouts/@sections/update-combos-section/update-combos-section.schema'
import { UpdateCombosSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-combos-section/update-combos-section.usecase'
import { UpdateMenuItemsSectionController } from '@restaurants/application/menu-layouts/@sections/update-menu-item-sections/update-menu-items-section.controller'
import { UpdateMenuItemsSectionSchema } from '@restaurants/application/menu-layouts/@sections/update-menu-item-sections/update-menu-items-section.schema'
import { UpdateMenuItemsSectionUsecase } from '@restaurants/application/menu-layouts/@sections/update-menu-item-sections/update-menu-items-section.usecase'

export class MenuLayoutSectionsModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide(
      'AddSectionValidate',
      new FormDataZodAdapter<AddSectionInputType, AddSectionType>(AddSectionSchema)
    )
    registry.provide('RemoveSectionValidate', new ZodAdapter(RemoveSectionSchema))
    registry.provide('ReorderSectionsValidate', new ZodAdapter(ReorderSectionsSchema))
    registry.provide('ManageSectionsUsecase', new ManageSectionsUsecase())
    new ManageSectionsController()

    registry.provide(
      'UpdateBannerSectionValidate',
      new FormDataZodAdapter<UpdateBannerSectionInputType, UpdateBannerSectionType>(UpdateBannerSectionSchema)
    )
    registry.provide('UpdateBannerSectionUsecase', new UpdateBannerSectionUsecase())
    new UpdateBannerSectionController()

    registry.provide(
      'UpdateCarouselSectionValidate',
      new FormDataZodAdapter<UpdateCarouselSectionInputType, UpdateCarouselSectionType>(UpdateCarouselSectionSchema)
    )
    registry.provide('UpdateCarouselSectionUsecase', new UpdateCarouselSectionUsecase())
    new UpdateCarouselSectionController()

    registry.provide('UpdateCategoriesSectionValidate', new ZodAdapter(UpdateCategoriesSectionSchema))
    registry.provide('UpdateCategoriesSectionUsecase', new UpdateCategoriesSectionUsecase())
    new UpdateCategoriesSectionController()

    registry.provide('UpdateCombosSectionValidate', new ZodAdapter(UpdateCombosSectionSchema))
    registry.provide('UpdateCombosSectionUsecase', new UpdateCombosSectionUsecase())
    new UpdateCombosSectionController()

    registry.provide('UpdateMenuItemsSectionValidate', new ZodAdapter(UpdateMenuItemsSectionSchema))
    registry.provide('UpdateMenuItemsSectionUsecase', new UpdateMenuItemsSectionUsecase())
    new UpdateMenuItemsSectionController()
  }
}
