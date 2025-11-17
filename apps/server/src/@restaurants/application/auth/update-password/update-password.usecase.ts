import { NotFoundError } from '@api/domain/errors'
import { PasswordAuthentication } from '@api/infra/adapters/auth/password-auth.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { UpdatePasswordType } from '@restaurants/application/auth/update-password/update-password.schema'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdatePasswordUsecaseInput = UpdatePasswordType & {
  id: string
}

export class UpdatePasswordUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('PasswordAuthentication')
  private readonly PasswordAuthentication!: PasswordAuthentication

  async execute({ id, password }: UpdatePasswordUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(id)
    if (!user) throw new NotFoundError('User', id)
    const passwordHash = await this.PasswordAuthentication.hash(password)
    user.updatePasswordHash(passwordHash)
    await this.UserRepository.update({ id: user.id }, user)
  }
}
