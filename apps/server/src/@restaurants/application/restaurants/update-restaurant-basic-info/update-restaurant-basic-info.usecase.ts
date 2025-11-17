import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomFile, FileConverter } from '@api/infra/services/file-converter.service'

import { UpdateRestaurantBasicInfoType } from '@restaurants/application/restaurants/update-restaurant-basic-info/update-restaurant-basic-info.schema'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdateRestaurantBasicInfoUsecaseInput = UpdateRestaurantBasicInfoType & {
  userId: string
}

export class UpdateRestaurantBasicInfoUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('FileConverterService')
  private readonly FileConverterService!: FileConverter

  @inject('FileStorage')
  private readonly FileStorage!: FileStorage

  async execute({
    userId,
    restaurantId,
    files,
    primaryColor,
    secondaryColor,
    ...basicInfoData
  }: UpdateRestaurantBasicInfoUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to update restaurant')
    let logoPath: string | undefined
    if (files && files.length > 0) {
      const file = files[0] as CustomFile
      const [type, extension] = file.mimetype.split('/')
      if (type !== 'image') throw new Error('Invalid file type')
      const base64 = this.FileConverterService.fileToBase64(file)
      logoPath = await this.FileStorage.uploadBase64(base64, extension)
      if (restaurant.logoPath) {
        await this.FileStorage.delete(restaurant.logoPath)
      }
    }
    restaurant.updateBasicInfo({
      ...basicInfoData,
      logoPath
    })
    if (primaryColor || secondaryColor) {
      restaurant.updateStyle({
        primaryColor,
        secondaryColor
      })
    }
    await this.RestaurantRepository.update({ id: restaurantId }, restaurant)
  }
}
