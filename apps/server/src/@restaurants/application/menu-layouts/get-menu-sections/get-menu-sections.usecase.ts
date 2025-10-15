import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import {
  MENU_SECTIONS,
  MenuSectionDefinition
} from '@restaurants/domain/menu-layouts/consts/menu-layout-sections.const'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface GetMenuSectionsUsecaseInput {
  userId: string
}

export class GetMenuSectionsUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ userId }: GetMenuSectionsUsecaseInput): Promise<MenuSectionDefinition[]> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    return MENU_SECTIONS.filter((section) => section.isActive)
  }
}
