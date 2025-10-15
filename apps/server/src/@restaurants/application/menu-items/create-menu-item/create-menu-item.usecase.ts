import { ConflictError, ForbiddenError, NotFoundError } from '@api/domain/errors'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomFile, FileConverter } from '@api/infra/services/file-converter.service'
import { CreateMenuItemType } from '@restaurants/application/menu-items/create-menu-item/create-menu-item.schema'
import { MenuItem } from '@restaurants/domain/menu-items/menu-item.entity'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type CreateMenuItemUsecaseInput = CreateMenuItemType & {
  userId: string
}

export class CreateMenuItemUsecase {
  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('FileConverterService')
  private readonly FileConverterService!: FileConverter

  @inject('FileStorage')
  private readonly FileStorage!: FileStorage

  async execute(input: CreateMenuItemUsecaseInput): Promise<MenuItem> {
    const user = await this.UserRepository.findById(input.userId)
    if (!user) throw new NotFoundError('User', input.userId)
    const restaurant = await this.RestaurantRepository.findById(input.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', input.restaurantId)
    if (!restaurant.hasPermission(input.userId))
      throw new ForbiddenError('User does not have permission to create menu item')
    const category = await this.CategoryRepository.findById(input.categoryId)
    if (!category || category.restaurantId !== input.restaurantId) throw new NotFoundError('Category', input.categoryId)
    const existingMenuItem = await this.MenuItemRepository.findOne({
      categoryId: input.categoryId,
      name: input.name
    })
    if (existingMenuItem) throw new ConflictError('Menu item already exists')
    const medias: string[] = []
    if (input.files && input.files.length > 0) {
      for (const file of input.files as CustomFile[]) {
        const [type, extension] = file.mimetype.split('/')
        if (type !== 'image') throw new Error('Invalid file type')
        const base64 = this.FileConverterService.fileToBase64(file)
        const mediaPath = await this.FileStorage.uploadBase64(base64, extension)
        medias.push(mediaPath)
      }
    }
    const menuItem = MenuItem.create({
      name: input.name,
      restaurantId: input.restaurantId,
      categoryId: input.categoryId,
      price: input.price,
      stock: input.stock,
      discount: input.discount,
      medias: medias ?? [],
      optionals: input.optionals ?? [],
      useCategoryOptionals: input.useCategoryOptionals ?? false,
      description: input.description
    })
    return await this.MenuItemRepository.create(menuItem)
  }
}
