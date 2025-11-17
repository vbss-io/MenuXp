import { NotFoundError } from '@api/domain/errors'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetMenuLayoutType } from '@restaurants/application/menu-layouts/get-menu-layout/get-menu-layout.schema'
import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import type { MenuLayout } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import { MenuLayoutRepository } from '@restaurants/infra/repositories/menu-layout.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetMenuLayoutUsecaseInput = GetMenuLayoutType & {
  userId: string
}

export type GetMenuLayoutUsecaseOutput = Partial<MenuLayout> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any
}

export class GetMenuLayoutUsecase {
  @inject('MenuLayoutRepository')
  private readonly MenuLayoutRepository!: MenuLayoutRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ layoutId, userId }: GetMenuLayoutUsecaseInput): Promise<GetMenuLayoutUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const menuLayout = await this.MenuLayoutRepository.findById(layoutId)
    if (!menuLayout) throw new NotFoundError('MenuLayout', layoutId)
    const processedSections = menuLayout.sections.map((section) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let config: any = {}
      switch (section.type) {
        case MenuSectionType.BANNER:
          config = { ...section.config }
          if (config?.imagePath) {
            config.imagePath = FileUrl.create(config.imagePath).getValue()
          }
          break
        case MenuSectionType.CAROUSEL:
          config = { ...section.config }
          if (Array.isArray(config?.imagePaths)) {
            config.imagePaths = (config.imagePaths as string[])
              .map((path: string) => (path ? FileUrl.create(path).getValue() : undefined))
              .filter((url): url is string => url !== undefined)
          }
          break
        case MenuSectionType.CATEGORIES:
          config = { ...section.config }
          break
        case MenuSectionType.MENU_ITEMS:
          config = { ...section.config }
          break
        default:
          return section
      }
      return {
        ...section,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        config
      }
    })
    return {
      ...menuLayout,
      sections: processedSections
    }
  }
}
