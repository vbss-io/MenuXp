import { randomUUID } from 'crypto'

import { BadRequestError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import { MenuItemsConfig } from '@restaurants/domain/menu-layouts/types/section-configs.type'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'

import { BaseSectionUsecase, BaseSectionUsecaseInput, BaseSectionUsecaseOutput } from '../base-section.usecase'

export interface UpdateMenuItemsSectionUsecaseInput extends BaseSectionUsecaseInput {
  type?: 'custom' | 'best_sellers' | 'discounts'
  title?: string
  menuItemIds?: string[] | null
}

export class UpdateMenuItemsSectionUsecase extends BaseSectionUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  async execute({
    userId,
    layoutId,
    sectionId,
    type,
    title,
    menuItemIds
  }: UpdateMenuItemsSectionUsecaseInput): Promise<BaseSectionUsecaseOutput> {
    const { layout, restaurant } = await this.validateAndGetContext({
      userId,
      layoutId,
      sectionId
    })
    const { section, index } = await this.findSectionInLayout(layout.sections, sectionId)
    if (section.type !== MenuSectionType.MENU_ITEMS) throw new BadRequestError('Section is not a menu items type')
    const typedSectionConfig = section.config as MenuItemsConfig
    const sectionType = type ?? typedSectionConfig?.type ?? 'custom'
    let menuItemsTitle = title ?? typedSectionConfig?.title
    if (!menuItemsTitle) menuItemsTitle = ''
    if (!menuItemsTitle && type === 'best_sellers') menuItemsTitle = 'Mais Vendidos'
    if (!menuItemsTitle && type === 'discounts') menuItemsTitle = 'Com Descontos'
    let validatedMenuItemIds: string[] | null = null
    if (sectionType === 'custom') {
      if (menuItemIds === null || menuItemIds === undefined) {
        validatedMenuItemIds = null
      } else if (Array.isArray(menuItemIds)) {
        const validIds: string[] = []
        for (const menuItemId of menuItemIds) {
          const menuItem = await this.MenuItemRepository.findById(menuItemId)
          if (menuItem && menuItem.isActive && menuItem.restaurantId === restaurant.id) {
            validIds.push(menuItemId)
          }
        }
        validatedMenuItemIds = validIds
      }
    } else {
      validatedMenuItemIds = null
    }
    const updatedSection = {
      ...section,
      id: section.id || randomUUID(),
      config: {
        type: sectionType,
        title: menuItemsTitle,
        menuItemIds: validatedMenuItemIds
      }
    }
    await this.updateSectionInLayout(layoutId, index, updatedSection)
    return {
      success: true,
      sectionId: updatedSection.id
    }
  }
}
