import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { CreateCustomerUserController } from '@customers/application/users/create-customer-user/create-customer-user.controller'
import { CreateCustomerUserSchema } from '@customers/application/users/create-customer-user/create-customer-user.schema'
import { CreateCustomerUserUsecase } from '@customers/application/users/create-customer-user/create-customer-user.usecase'
import { FindCustomerUserController } from '@customers/application/users/find-customer-user-by-phone/find-customer-user-by-phone.controller'
import { FindCustomerUserByPhoneSchema } from '@customers/application/users/find-customer-user-by-phone/find-customer-user-by-phone.schema'
import { FindCustomerUserByPhoneUsecase } from '@customers/application/users/find-customer-user-by-phone/find-customer-user-by-phone.usecase'
import { UpdateCustomerUserController } from '@customers/application/users/update-customer-user/update-customer-user.controller'
import { UpdateCustomerUserSchema } from '@customers/application/users/update-customer-user/update-customer-user.schema'
import { UpdateCustomerUserUseCase } from '@customers/application/users/update-customer-user/update-customer-user.usecase'

export class CustomerUsersModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('CreateCustomerUserValidate', new ZodAdapter(CreateCustomerUserSchema))
    registry.provide('CreateCustomerUserUsecase', new CreateCustomerUserUsecase())
    new CreateCustomerUserController()

    registry.provide('FindCustomerUserByPhoneValidate', new ZodAdapter(FindCustomerUserByPhoneSchema))
    registry.provide('FindCustomerUserByPhoneUsecase', new FindCustomerUserByPhoneUsecase())
    new FindCustomerUserController()

    registry.provide('UpdateCustomerUserValidate', new ZodAdapter(UpdateCustomerUserSchema))
    registry.provide('UpdateCustomerUserUseCase', new UpdateCustomerUserUseCase())
    new UpdateCustomerUserController()
  }
}
