import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { DeleteUserType } from '@restaurants/application/admin/delete-user/delete-user.schema'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

export class DeleteUserUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ userId }: DeleteUserType): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    await this.UserRepository.delete({ id: user.id })
  }
}
