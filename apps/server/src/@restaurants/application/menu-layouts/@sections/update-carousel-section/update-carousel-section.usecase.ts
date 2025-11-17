import { randomUUID } from 'crypto'

import { BadRequestError } from '@api/domain/errors/bad-request.error'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomFile, FileConverter } from '@api/infra/services/file-converter.service'

import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import { CarouselConfig } from '@restaurants/domain/menu-layouts/types/section-configs.type'

import { BaseSectionUsecase, BaseSectionUsecaseInput, BaseSectionUsecaseOutput } from '../base-section.usecase'

export interface UpdateCarouselSectionUsecaseInput extends BaseSectionUsecaseInput {
  files?: CustomFile[]
  removeMedias?: string[]
}

export class UpdateCarouselSectionUsecase extends BaseSectionUsecase {
  @inject('FileConverterService')
  private readonly FileConverterService!: FileConverter

  @inject('FileStorage')
  private readonly FileStorage!: FileStorage

  async execute({
    userId,
    layoutId,
    sectionId,
    files = [],
    removeMedias = []
  }: UpdateCarouselSectionUsecaseInput): Promise<BaseSectionUsecaseOutput> {
    const { layout } = await this.validateAndGetContext({
      userId,
      layoutId,
      sectionId
    })
    const { section, index } = await this.findSectionInLayout(layout.sections, sectionId)
    const typedSectionConfig = section.config as CarouselConfig
    if (section.type !== MenuSectionType.CAROUSEL) throw new BadRequestError('Section is not a carousel type')
    let updatedImagePaths = [...(typedSectionConfig?.imagePaths ?? [])]
    if (removeMedias.length > 0) {
      for (const mediaUrl of removeMedias) {
        const relativePath = this.extractPathFromUrl(mediaUrl)
        const mediaIndex = updatedImagePaths.indexOf(relativePath)
        if (mediaIndex !== -1) {
          updatedImagePaths.splice(mediaIndex, 1)
          await this.FileStorage.delete(relativePath)
        }
      }
    }
    if (files.length > 0) {
      for (const file of files) {
        const [, extension] = file.mimetype.split('/')
        const base64 = this.FileConverterService.fileToBase64(file)
        const imagePath = await this.FileStorage.uploadBase64(base64, extension)
        updatedImagePaths.push(imagePath)
      }
    }
    updatedImagePaths = updatedImagePaths
      .filter((path) => path && !path.startsWith('blob:'))
      .map((path) => this.extractPathFromUrl(path))
    if (updatedImagePaths.length < 2) throw new BadRequestError('Carousel must have at least 2 images')
    if (updatedImagePaths.length > 5) throw new BadRequestError('Carousel can have at most 5 images')
    const updatedSection = {
      ...section,
      id: section.id || randomUUID(),
      config: {
        imagePaths: updatedImagePaths
      }
    }
    await this.updateSectionInLayout(layoutId, index, updatedSection)
    return {
      success: true,
      sectionId: updatedSection.id
    }
  }
}
