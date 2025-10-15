import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'
import type { FindCustomerUserByPhoneType } from '@customers/application/users/find-customer-user-by-phone/find-customer-user-by-phone.schema'
import { CustomerUser } from '@customers/domain/users/customer-user.entity'
import type { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

export class FindCustomerUserByPhoneUsecase {
  @inject('CustomerUserRepository')
  private CustomerUserRepository!: CustomerUserRepository

  async execute({ phone, restaurantId }: FindCustomerUserByPhoneType): Promise<CustomerUser> {
    const customerUser = await this.CustomerUserRepository.findOne({ phone, restaurantId })
    if (!customerUser) throw new NotFoundError('Customer User', phone)
    return customerUser
  }
}
