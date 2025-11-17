import { randomUUID } from 'crypto'

import { BadRequestError } from '@api/domain/errors'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomFile, FileConverter } from '@api/infra/services/file-converter.service'

import {
  BaseSectionUsecase,
  BaseSectionUsecaseOutput
} from '@restaurants/application/menu-layouts/@sections/base-section.usecase'
import { UpdateBannerSectionType } from '@restaurants/application/menu-layouts/@sections/update-banner-section/update-banner-section.schema'
import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import { BannerConfig } from '@restaurants/domain/menu-layouts/types/section-configs.type'

type UpdateBannerSectionUsecaseInput = UpdateBannerSectionType & {
  userId: string
  files?: CustomFile[]
  tag?: string
  title?: string
  subtitle?: string
}

export class UpdateBannerSectionUsecase extends BaseSectionUsecase {
  @inject('FileConverterService')
  private readonly FileConverterService!: FileConverter

  @inject('FileStorage')
  private readonly FileStorage!: FileStorage

  async execute({
    userId,
    layoutId,
    sectionId,
    files,
    tag,
    title,
    subtitle
  }: UpdateBannerSectionUsecaseInput): Promise<BaseSectionUsecaseOutput> {
    const { layout } = await this.validateAndGetContext({
      userId,
      layoutId,
      sectionId
    })
    const { section, index } = await this.findSectionInLayout(layout.sections, sectionId)
    const typedSectionConfig = section.config as BannerConfig
    if (section.type !== MenuSectionType.BANNER) throw new BadRequestError('Section is not a banner type')
    let updatedImagePath = ''
    if (files && files.length > 0) {
      const [, extension] = files[0].mimetype.split('/') as string[]
      const base64 = this.FileConverterService.fileToBase64(files[0])
      updatedImagePath = await this.FileStorage.uploadBase64(base64, extension)
      if (typedSectionConfig?.imagePath) {
        await this.FileStorage.delete(this.extractPathFromUrl(typedSectionConfig?.imagePath))
      }
    }
    const updatedSection = {
      ...section,
      id: section.id || randomUUID(),
      config: {
        imagePath: updatedImagePath || typedSectionConfig?.imagePath,
        tag: tag ?? typedSectionConfig?.tag,
        title: title ?? typedSectionConfig?.title,
        subtitle: subtitle ?? typedSectionConfig?.subtitle
      }
    }
    await this.updateSectionInLayout(layoutId, index, updatedSection)
    return {
      success: true,
      sectionId: updatedSection.id
    }
  }
}
