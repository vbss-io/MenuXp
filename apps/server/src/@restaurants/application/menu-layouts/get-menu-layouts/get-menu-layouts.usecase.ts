import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetMenuLayoutsType } from '@restaurants/application/menu-layouts/get-menu-layouts/get-menu-layouts.schema'
import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import type { MenuLayout } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import { MenuLayoutRepository } from '@restaurants/infra/repositories/menu-layout.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetMenuLayoutsUsecaseInput = GetMenuLayoutsType & {
  userId: string
}

export type GetMenuLayoutsUsecaseOutput = Array<
  Partial<MenuLayout> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any
  }
>

export class GetMenuLayoutsUsecase {
  @inject('MenuLayoutRepository')
  private readonly MenuLayoutRepository!: MenuLayoutRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  async execute({ restaurantId, userId }: GetMenuLayoutsUsecaseInput): Promise<GetMenuLayoutsUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to get menu layouts')
    const menuLayouts = await this.MenuLayoutRepository.find({ restaurantId })
    return menuLayouts.map((layout) => {
      const processedSections = layout.sections.map((section) => {
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
        ...layout,
        sections: processedSections
      }
    })
  }
}
