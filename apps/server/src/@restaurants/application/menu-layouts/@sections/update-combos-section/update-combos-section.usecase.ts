import { randomUUID } from 'crypto'

import { BadRequestError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import { CombosConfig } from '@restaurants/domain/menu-layouts/types/section-configs.type'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'

import { BaseSectionUsecase, BaseSectionUsecaseInput, BaseSectionUsecaseOutput } from '../base-section.usecase'

export interface UpdateCombosSectionUsecaseInput extends BaseSectionUsecaseInput {
  type?: 'custom' | 'best_sellers' | 'discounts'
  title?: string
  comboIds?: string[] | null
}

export class UpdateCombosSectionUsecase extends BaseSectionUsecase {
  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  async execute({
    userId,
    layoutId,
    sectionId,
    type,
    title,
    comboIds
  }: UpdateCombosSectionUsecaseInput): Promise<BaseSectionUsecaseOutput> {
    const { layout, restaurant } = await this.validateAndGetContext({
      userId,
      layoutId,
      sectionId
    })
    const { section, index } = await this.findSectionInLayout(layout.sections, sectionId)
    if (section.type !== MenuSectionType.COMBOS) throw new BadRequestError('Section is not a combos type')
    const typedSectionConfig = section.config as CombosConfig
    const sectionType = type ?? typedSectionConfig?.type ?? 'custom'
    let combosTitle = title ?? typedSectionConfig?.title
    if (!combosTitle) combosTitle = ''
    if (!combosTitle && type === 'best_sellers') combosTitle = 'Combos Mais Vendidos'
    if (!combosTitle && type === 'discounts') combosTitle = 'Combos com Descontos'
    let validatedComboIds: string[] | null = null
    if (sectionType === 'custom') {
      if (comboIds === null || comboIds === undefined) {
        validatedComboIds = null
      } else if (Array.isArray(comboIds)) {
        const validIds: string[] = []
        for (const comboId of comboIds) {
          const combo = await this.ComboRepository.findById(comboId)
          if (combo && combo.isActive && combo.restaurantId === restaurant.id) {
            validIds.push(comboId)
          }
        }
        validatedComboIds = validIds
      }
    } else {
      validatedComboIds = null
    }
    const updatedSection = {
      ...section,
      id: section.id || randomUUID(),
      config: {
        type: sectionType,
        title: combosTitle,
        comboIds: validatedComboIds
      }
    }
    await this.updateSectionInLayout(layoutId, index, updatedSection)
    return {
      success: true,
      sectionId: updatedSection.id
    }
  }
}
