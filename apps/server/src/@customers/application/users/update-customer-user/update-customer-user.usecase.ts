import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'

import type { UpdateCustomerUserType } from '@customers/application/users/update-customer-user/update-customer-user.schema'
import { CustomerUser } from '@customers/domain/users/customer-user.entity'
import type { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

export class UpdateCustomerUserUseCase {
  @inject('CustomerUserRepository')
  private CustomerUserRepository!: CustomerUserRepository

  async execute({ id, ...updates }: UpdateCustomerUserType): Promise<CustomerUser> {
    const customerUser = await this.CustomerUserRepository.findById(id)
    if (!customerUser) throw new NotFoundError('Customer User', id)
    customerUser.update(updates)
    return await this.CustomerUserRepository.update({ id }, customerUser)
  }
}
