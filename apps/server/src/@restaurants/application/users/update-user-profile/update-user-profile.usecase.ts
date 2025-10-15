import { NotFoundError } from '@api/domain/errors'
import { FileStorage } from '@api/infra/adapters/storage/storage.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomFile, FileConverter } from '@api/infra/services/file-converter.service'
import { UpdateUserProfileType } from '@restaurants/application/users/update-user-profile/update-user-profile.schema'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdateUserProfileUsecaseInput = UpdateUserProfileType & {
  userId: string
}

export class UpdateUserProfileUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('FileConverterService')
  private readonly FileConverterService!: FileConverter

  @inject('FileStorage')
  private readonly FileStorage!: FileStorage

  async execute({ userId, name, files }: UpdateUserProfileUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    if (files && files.length > 0) {
      if (user.avatarPath) await this.FileStorage.delete(user.avatarPath)
      const file = files[0] as CustomFile
      const [type, extension] = file.mimetype.split('/')
      if (type !== 'image') throw new Error('Invalid file type')
      const base64 = this.FileConverterService.fileToBase64(file)
      const avatarPath = await this.FileStorage.uploadBase64(base64, extension)
      user.updateProfile({ avatarPath })
    }
    if (name !== undefined) {
      user.updateProfile({ name })
    }
    await this.UserRepository.update({ id: user.id }, user)
  }
}
