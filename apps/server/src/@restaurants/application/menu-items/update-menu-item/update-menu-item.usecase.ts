import { ConflictError, ForbiddenError, NotFoundError } from '@api/domain/errors'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomFile, FileConverter } from '@api/infra/services/file-converter.service'

import { UpdateMenuItemType } from '@restaurants/application/menu-items/update-menu-item/update-menu-item.schema'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdateMenuItemUsecaseInput = UpdateMenuItemType & {
  userId: string
}

export class UpdateMenuItemUsecase {
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

  async execute({ userId, menuItemId, ...input }: UpdateMenuItemUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const menuItem = await this.MenuItemRepository.findById(menuItemId)
    if (!menuItem) throw new NotFoundError('MenuItem', menuItemId)
    const restaurant = await this.RestaurantRepository.findById(menuItem.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', menuItem.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to update menu item')
    if (input.categoryId) {
      const category = await this.CategoryRepository.findById(input.categoryId)
      if (!category || category.restaurantId !== menuItem.restaurantId)
        throw new NotFoundError('Category', input.categoryId)
    }
    const targetCategoryId = input.categoryId || menuItem.categoryId
    if (input.name && input.name !== menuItem.name) {
      const existingMenuItem = await this.MenuItemRepository.findOne({
        categoryId: targetCategoryId,
        name: input.name
      })
      if (existingMenuItem && existingMenuItem.id !== menuItemId) throw new ConflictError('Menu item already exists')
    }
    if (input.removeFiles) {
      const removeFilesArray = input.removeFiles.split(',')
      for (const mediaUrl of removeFilesArray) {
        const media = mediaUrl.replace(process.env.FILES_STORAGE as string, '')
        menuItem.removeMedia(media)
        await this.FileStorage.delete(media)
      }
    }
    if (input.files && input.files.length > 0) {
      for (const file of input.files as CustomFile[]) {
        const [type, extension] = file.mimetype.split('/')
        if (type !== 'image') throw new Error('Invalid file type')
        const base64 = this.FileConverterService.fileToBase64(file)
        const mediaPath = await this.FileStorage.uploadBase64(base64, extension)
        menuItem.addMedia(mediaPath)
      }
    }
    menuItem.update({
      name: input.name,
      description: input.description,
      categoryId: input.categoryId || menuItem.categoryId,
      price: input.price,
      stock: input.stock,
      discount: input.discount,
      optionals: input.optionals || menuItem.optionals,
      useCategoryOptionals:
        input.useCategoryOptionals !== undefined ? input.useCategoryOptionals : menuItem.useCategoryOptionals
    })
    await this.MenuItemRepository.update({ id: menuItemId }, menuItem)
  }
}
