import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { UserRepository } from '@restaurants/infra/repositories/user.repository'

interface VerifyEmailUsecaseInput {
  id: string
}

export class VerifyEmailUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  async execute({ id }: VerifyEmailUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(id)
    if (!user) throw new NotFoundError('User', id)
    user.confirmEmail()
    await this.UserRepository.update({ id: user.id }, user)
  }
}
