import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { MenuLayoutEntity, type MenuSection } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import { Restaurant } from '@restaurants/domain/restaurants/restaurant.entity'
import { User } from '@restaurants/domain/users/user.entity'
import { MenuLayoutRepository } from '@restaurants/infra/repositories/menu-layout.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

export interface BaseSectionUsecaseInput {
  userId: string
  layoutId: string
  sectionId?: string
}

export interface BaseSectionUsecaseOutput {
  success: boolean
  sectionId: string
}

export abstract class BaseSectionUsecase {
  @inject('MenuLayoutRepository')
  protected readonly MenuLayoutRepository!: MenuLayoutRepository

  @inject('RestaurantRepository')
  protected readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  protected readonly UserRepository!: UserRepository

  protected async validateAndGetContext(input: BaseSectionUsecaseInput): Promise<{
    user: User
    layout: MenuLayoutEntity
    restaurant: Restaurant
  }> {
    const user = await this.UserRepository.findById(input.userId)
    if (!user) throw new NotFoundError('User', input.userId)
    const layout = (await this.MenuLayoutRepository.findById(input.layoutId)) as MenuLayoutEntity
    if (!layout) throw new NotFoundError('MenuLayout', input.layoutId)
    const restaurant = await this.RestaurantRepository.findById(layout.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', layout.restaurantId)
    if (!restaurant.hasPermission(input.userId))
      throw new ForbiddenError('User does not have permission to add section')
    return { user, layout, restaurant }
  }

  protected async findSectionInLayout(
    sections: MenuSection[],
    sectionId?: string
  ): Promise<{ section: MenuSection; index: number }> {
    let targetSection: MenuSection | undefined
    let targetIndex: number = -1
    if (sectionId) {
      targetIndex = sections.findIndex((s) => s.id === sectionId)
      targetSection = sections[targetIndex]
    }
    if (!targetSection || targetIndex === -1) {
      throw new NotFoundError('Section', sectionId)
    }
    return { section: targetSection, index: targetIndex }
  }

  protected async updateSectionInLayout(
    layoutId: string,
    sectionIndex: number,
    updatedSection: MenuSection
  ): Promise<void> {
    const layout = (await this.MenuLayoutRepository.findById(layoutId)) as MenuLayoutEntity
    if (!layout) throw new NotFoundError('MenuLayout', layoutId)
    const updatedSections = [...layout.sections]
    updatedSections[sectionIndex] = updatedSection
    layout.update({ sections: updatedSections })
    await this.MenuLayoutRepository.update({ id: layoutId }, layout)
  }

  protected extractPathFromUrl(imagePath: string): string {
    return imagePath.replace(process.env.FILES_STORAGE || '', '')
  }

  abstract execute(input: unknown): Promise<BaseSectionUsecaseOutput>
}
