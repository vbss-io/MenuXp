import { randomUUID } from 'crypto'

import { BadRequestError } from '@api/domain/errors/bad-request.error'
import { inject } from '@api/infra/dependency-injection/registry'

import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'

import { BaseSectionUsecase, BaseSectionUsecaseInput, BaseSectionUsecaseOutput } from '../base-section.usecase'

export interface UpdateCategoriesSectionUsecaseInput extends BaseSectionUsecaseInput {
  categoryIds?: string[] | null
}

export class UpdateCategoriesSectionUsecase extends BaseSectionUsecase {
  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  async execute({
    userId,
    layoutId,
    sectionId,
    categoryIds
  }: UpdateCategoriesSectionUsecaseInput): Promise<BaseSectionUsecaseOutput> {
    const { layout, restaurant } = await this.validateAndGetContext({
      userId,
      layoutId,
      sectionId
    })
    const { section, index } = await this.findSectionInLayout(layout.sections, sectionId)
    if (section.type !== MenuSectionType.CATEGORIES) throw new BadRequestError('Section is not a categories type')
    let validatedCategoryIds: string[] | null = null
    if (categoryIds === null || categoryIds === undefined) {
      validatedCategoryIds = null
    } else if (Array.isArray(categoryIds)) {
      const validIds: string[] = []
      for (const categoryId of categoryIds) {
        const category = await this.CategoryRepository.findById(categoryId)
        if (category && category.isActive && category.restaurantId === restaurant.id) {
          validIds.push(categoryId)
        }
      }
      validatedCategoryIds = validIds
    }
    const updatedSection = {
      ...section,
      id: section.id || randomUUID(),
      config: {
        categoryIds: validatedCategoryIds
      }
    }
    await this.updateSectionInLayout(layoutId, index, updatedSection)
    return {
      success: true,
      sectionId: updatedSection.id
    }
  }
}
