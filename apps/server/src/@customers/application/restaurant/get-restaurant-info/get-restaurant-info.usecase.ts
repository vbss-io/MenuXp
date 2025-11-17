import { NotFoundError } from '@api/domain/errors/not-found.error'
import { FileUrl } from '@api/domain/vos/file-url.vo'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetRestaurantInfoType } from '@customers/application/restaurant/get-restaurant-info/get-restaurant-info.schema'

import { GetCurrentOperationQuery } from '@restaurants/application/operations/@queries/get-current-operation.query'
import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import { MenuLayoutStatus } from '@restaurants/domain/menu-layouts/enums/menu-layout-status.enum'
import type { MenuSection } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import type { Restaurant } from '@restaurants/domain/restaurants/restaurant.entity'
import { MenuLayoutRepository } from '@restaurants/infra/repositories/menu-layout.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

type GetRestaurantInfoUsecaseInput = GetRestaurantInfoType

export type GetRestaurantInfoUsecaseOutput = Partial<Restaurant> & {
  logo: string
  operationId: string | null
  operationStatus: string | null
  menuLayout: {
    id: string
    layout: string
    sections: MenuSection[]
  } | null
}

export class GetRestaurantInfoUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('MenuLayoutRepository')
  private readonly MenuLayoutRepository!: MenuLayoutRepository

  @inject('GetCurrentOperationQuery')
  private readonly getCurrentOperationQuery!: GetCurrentOperationQuery

  async execute({ slug }: GetRestaurantInfoUsecaseInput): Promise<GetRestaurantInfoUsecaseOutput> {
    const restaurant = await this.RestaurantRepository.findOne({ slug })
    if (!restaurant || !restaurant.id) throw new NotFoundError('Restaurant', slug)
    const restaurantId = restaurant.id.toString()
    const operation = await this.getCurrentOperationQuery.execute({ restaurantId })
    const activeMenuLayout = await this.MenuLayoutRepository.findOne({
      restaurantId,
      status: MenuLayoutStatus.ACTIVE
    })
    const processedSections =
      activeMenuLayout?.sections.map((section) => {
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
      }) || []
    return {
      ...restaurant,
      logo: FileUrl.create(restaurant.logoPath)?.getValue() ?? '',
      operationId: operation?.id || null,
      operationStatus: operation?.status || null,
      menuLayout:
        activeMenuLayout && activeMenuLayout.id
          ? {
              id: activeMenuLayout.id,
              layout: activeMenuLayout.layout,
              sections: processedSections
            }
          : null
    }
  }
}
