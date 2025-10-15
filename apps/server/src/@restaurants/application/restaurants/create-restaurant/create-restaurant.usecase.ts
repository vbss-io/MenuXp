import { ConflictError, ForbiddenError, NotFoundError } from '@api/domain/errors'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomFile, FileConverter } from '@api/infra/services/file-converter.service'
import { CreateRestaurantType } from '@restaurants/application/restaurants/create-restaurant/create-restaurant.schema'
import { MENU_LAYOUT_TEMPLATE } from '@restaurants/domain/menu-layouts/consts/menu-layout-template.const'
import { MenuLayoutEntity } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import { Restaurant } from '@restaurants/domain/restaurants/restaurant.entity'
import { UserRole } from '@restaurants/domain/users/enums/user-role.enum'
import { MenuLayoutRepository } from '@restaurants/infra/repositories/menu-layout.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type CreateRestaurantUsecaseInput = CreateRestaurantType & {
  userId: string
}

export class CreateRestaurantUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('MenuLayoutRepository')
  private readonly MenuLayoutRepository!: MenuLayoutRepository

  @inject('FileConverterService')
  private readonly FileConverterService!: FileConverter

  @inject('FileStorage')
  private readonly FileStorage!: FileStorage

  async execute(input: CreateRestaurantUsecaseInput): Promise<Restaurant> {
    const { userId, name, description, slug, files } = input
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    if (user.role !== UserRole.RESTAURANT_OWNER) throw new ForbiddenError('User is not a restaurant owner')
    const existingRestaurant = await this.RestaurantRepository.findOne({ ownerId: userId })
    if (existingRestaurant) throw new ConflictError('Restaurant already exists for this user')
    let logoPath: string | undefined
    if (files && files.length > 0) {
      const file = files[0] as CustomFile
      const [type, extension] = file.mimetype.split('/')
      if (type !== 'image') throw new Error('Invalid file type')
      const base64 = this.FileConverterService.fileToBase64(file)
      logoPath = await this.FileStorage.uploadBase64(base64, extension)
    }
    const restaurant = Restaurant.create({
      name,
      description,
      slug,
      ownerId: userId,
      logoPath
    })
    const createdRestaurant = await this.RestaurantRepository.create(restaurant)
    const menuLayout = MenuLayoutEntity.create({
      name: MENU_LAYOUT_TEMPLATE.name as string,
      restaurantId: createdRestaurant.id as string,
      description: MENU_LAYOUT_TEMPLATE.description,
      sections: MENU_LAYOUT_TEMPLATE.sections
    })
    await this.MenuLayoutRepository.create(menuLayout)
    user.updateRestaurantId(createdRestaurant.id as string)
    await this.UserRepository.update({ id: userId }, user)
    return createdRestaurant
  }
}
