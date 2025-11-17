import { inject } from '@api/infra/dependency-injection/registry'

import { CustomerUser, type CreateCustomerUser } from '@customers/domain/users/customer-user.entity'
import type { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

export class CreateCustomerUserUsecase {
  @inject('CustomerUserRepository')
  private CustomerUserRepository!: CustomerUserRepository

  async execute(input: CreateCustomerUser): Promise<CustomerUser> {
    const client = CustomerUser.create(input)
    return await this.CustomerUserRepository.create(client)
  }
}
