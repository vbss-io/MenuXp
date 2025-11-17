import { ConflictError, ForbiddenError, NotFoundError } from '@api/domain/errors'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomFile, FileConverter } from '@api/infra/services/file-converter.service'

import { UpdateComboType } from '@restaurants/application/combos/update-combo/update-combo.schema'
import { Combo } from '@restaurants/domain/combos/combo.entity'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdateComboUsecaseInput = UpdateComboType & {
  userId: string
}

export class UpdateComboUsecase {
  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

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

  async execute(input: UpdateComboUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(input.userId)
    if (!user) throw new NotFoundError('User', input.userId)
    const restaurant = await this.RestaurantRepository.findById(input.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', input.restaurantId)
    if (!restaurant.hasPermission(input.userId))
      throw new ForbiddenError('User does not have permission to update combo')
    const combo = await this.ComboRepository.findById(input.comboId)
    if (!combo || combo.restaurantId !== input.restaurantId) throw new NotFoundError('Combo', input.comboId)
    if (input.name && input.name !== combo.name) {
      const existingCombo = await this.ComboRepository.findOne({
        restaurantId: input.restaurantId,
        name: input.name
      })
      if (existingCombo && existingCombo.id !== input.comboId) throw new ConflictError('Combo name already exists')
    }
    if (input.categoryId) {
      const category = await this.CategoryRepository.findById(input.categoryId)
      if (!category || category.restaurantId !== input.restaurantId)
        throw new NotFoundError('Category', input.categoryId)
    }
    if (input.items) {
      for (const item of input.items) {
        const menuItem = await this.MenuItemRepository.findById(item.menuItemId)
        if (!menuItem || menuItem.restaurantId !== input.restaurantId)
          throw new NotFoundError('MenuItem', item.menuItemId)
      }
    }
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
    const updateData: Partial<Combo> = {}
    if (input.name !== undefined) updateData.name = input.name
    if (input.description !== undefined) updateData.description = input.description
    if (input.price !== undefined) updateData.price = input.price
    if (input.stock !== undefined) updateData.stock = input.stock
    if (input.discount !== undefined) updateData.discount = input.discount
    if (input.categoryId !== undefined) updateData.categoryId = input.categoryId
    if (input.items !== undefined) updateData.items = input.items
    if (input.optionals !== undefined) updateData.optionals = input.optionals
    if (input.useCategoryOptionals !== undefined) updateData.useCategoryOptionals = input.useCategoryOptionals
    if (medias.length > 0) updateData.medias = [...(combo.medias || []), ...medias]
    await this.ComboRepository.update({ id: input.comboId }, updateData)
  }
}
