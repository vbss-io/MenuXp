import { randomUUID } from 'crypto'

import { BadRequestError, NotFoundError } from '@api/domain/errors'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomFile, FileConverter } from '@api/infra/services/file-converter.service'
import {
  BaseSectionUsecase,
  BaseSectionUsecaseInput,
  BaseSectionUsecaseOutput
} from '@restaurants/application/menu-layouts/@sections/base-section.usecase'
import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import type { MenuSection } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import type {
  BannerConfig,
  CarouselConfig,
  CategoriesConfig,
  CombosConfig,
  MenuItemsConfig
} from '@restaurants/domain/menu-layouts/types/section-configs.type'

export interface AddSectionUsecaseInput extends BaseSectionUsecaseInput {
  section: MenuSection
  position?: number
  files?: CustomFile[]
}

export interface RemoveSectionUsecaseInput extends BaseSectionUsecaseInput {
  sectionId: string
}

export interface ReorderSectionsUsecaseInput extends BaseSectionUsecaseInput {
  newOrder: string[]
}

export class ManageSectionsUsecase extends BaseSectionUsecase {
  @inject('FileStorage')
  private readonly FileStorage!: FileStorage

  @inject('FileConverterService')
  private readonly FileConverterService!: FileConverter
  async addSection({
    userId,
    layoutId,
    section,
    position,
    files
  }: AddSectionUsecaseInput): Promise<BaseSectionUsecaseOutput> {
    const { layout } = await this.validateAndGetContext({ userId, layoutId })
    let config: BannerConfig | CarouselConfig | CategoriesConfig | MenuItemsConfig | CombosConfig
    switch (section.type) {
      case MenuSectionType.BANNER:
        config = await this.addBannerSection(section.config as BannerConfig, files)
        break
      case MenuSectionType.CAROUSEL:
        config = await this.addCarouselSection(files)
        break
      case MenuSectionType.CATEGORIES:
        config = await this.addCategoriesSection(section.config as CategoriesConfig)
        break
      case MenuSectionType.MENU_ITEMS:
        config = await this.addMenuItemsSection(section.config as MenuItemsConfig)
        break
      case MenuSectionType.COMBOS:
        config = await this.addCombosSection(section.config as CombosConfig)
        break
      default:
        throw new BadRequestError('Invalid section type')
    }
    const newSection: MenuSection = {
      ...section,
      id: randomUUID(),
      config
    }
    const updatedSections = [...layout.sections]
    const insertPosition = position !== undefined ? position : updatedSections.length
    updatedSections.splice(insertPosition, 0, newSection)
    layout.update({ sections: updatedSections })
    await this.MenuLayoutRepository.update({ id: layoutId }, layout)
    return {
      success: true,
      sectionId: newSection.id as string
    }
  }

  async removeSection({ userId, layoutId, sectionId }: RemoveSectionUsecaseInput): Promise<BaseSectionUsecaseOutput> {
    const { layout } = await this.validateAndGetContext({ userId, layoutId, sectionId })
    const { section, index } = await this.findSectionInLayout(layout.sections, sectionId)
    await this.cleanupSectionResources(section)
    const updatedSections = [...layout.sections]
    updatedSections.splice(index, 1)
    layout.update({ sections: updatedSections })
    await this.MenuLayoutRepository.update({ id: layoutId }, layout)
    return {
      success: true,
      sectionId: section.id as string
    }
  }

  async reorderSections({
    userId,
    layoutId,
    newOrder
  }: ReorderSectionsUsecaseInput): Promise<BaseSectionUsecaseOutput> {
    const { layout } = await this.validateAndGetContext({ userId, layoutId })
    const currentSectionIds = layout.sections.map((s) => s.id).filter((id) => id)
    const missingIds = newOrder.filter((id) => !currentSectionIds.includes(id))
    if (missingIds.length > 0) {
      throw new NotFoundError('Section', missingIds.join(', '))
    }
    const reorderedSections = newOrder.map((sectionId) => {
      const section = layout.sections.find((s) => s.id === sectionId)
      if (!section) throw new NotFoundError('Section', sectionId)
      return section
    })
    layout.update({ sections: reorderedSections })
    await this.MenuLayoutRepository.update({ id: layoutId }, layout)
    return {
      success: true,
      sectionId: 'reordered'
    }
  }

  private async addBannerSection(config: BannerConfig, files?: CustomFile[]): Promise<BannerConfig> {
    const bannerConfig: BannerConfig = { ...config }
    if (files && files.length > 0) {
      const file = files[0]
      const [, extension] = file.mimetype.split('/')
      const base64 = this.FileConverterService.fileToBase64(file)
      const imagePath = await this.FileStorage.uploadBase64(base64, extension)
      bannerConfig.imagePath = imagePath
    }
    return bannerConfig
  }

  private async addCarouselSection(files?: CustomFile[]): Promise<CarouselConfig> {
    const carouselConfig: CarouselConfig = {}
    if (files && files.length > 0) {
      const imagePaths: string[] = []
      for (const file of files) {
        const [, extension] = file.mimetype.split('/')
        const base64 = this.FileConverterService.fileToBase64(file)
        const imagePath = await this.FileStorage.uploadBase64(base64, extension)
        imagePaths.push(imagePath)
      }
      carouselConfig.imagePaths = imagePaths
    }
    return carouselConfig
  }

  private async addCategoriesSection(config: CategoriesConfig): Promise<CategoriesConfig> {
    return config
  }

  private async addMenuItemsSection(config: MenuItemsConfig): Promise<MenuItemsConfig> {
    const menuItemsConfig: MenuItemsConfig = { ...config }
    const type = config.type ?? 'custom'
    let title = config.title
    if (!title) title = ''
    if (!title && type === 'best_sellers') title = 'Mais Vendidos'
    if (!title && type === 'discounts') title = 'Com Descontos'
    menuItemsConfig.type = type
    menuItemsConfig.title = title
    menuItemsConfig.menuItemIds = config.menuItemIds ?? null
    return menuItemsConfig
  }

  private async addCombosSection(config: CombosConfig): Promise<CombosConfig> {
    const combosConfig: CombosConfig = { ...config }
    const type = config.type ?? 'custom'
    let title = config.title
    if (!title) title = ''
    if (!title && type === 'best_sellers') title = 'Combos Mais Vendidos'
    if (!title && type === 'discounts') title = 'Combos Com Descontos'
    combosConfig.type = type
    combosConfig.title = title
    combosConfig.comboIds = config.comboIds ?? null
    return combosConfig
  }

  private async cleanupSectionResources(section: MenuSection): Promise<void> {
    switch (section.type) {
      case MenuSectionType.BANNER: {
        const bannerConfig = section.config as BannerConfig
        if (bannerConfig.imagePath) {
          await this.FileStorage.delete(this.extractPathFromUrl(bannerConfig.imagePath))
        }
        break
      }
      case MenuSectionType.CAROUSEL: {
        const carouselConfig = section.config as CarouselConfig
        if (carouselConfig.imagePaths) {
          for (const imagePath of carouselConfig.imagePaths) {
            await this.FileStorage.delete(this.extractPathFromUrl(imagePath))
          }
        }
        break
      }
      default:
        break
    }
  }

  async execute(): Promise<BaseSectionUsecaseOutput> {
    throw new Error('Use specific methods: addSection, removeSection, or reorderSections')
  }
}
