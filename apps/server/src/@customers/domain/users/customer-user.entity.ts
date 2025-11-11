import type { Address } from '@api/domain/types/address.type'

export class CustomerUser {
  name?: string
  phone: string
  address?: Address
  preferredLanguage: string

  private constructor(
    readonly id: string | undefined,
    phone: string,
    readonly restaurantId: string,
    name?: string,
    address?: Address,
    preferredLanguage?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.phone = phone
    this.name = name
    this.address = address
    this.preferredLanguage = preferredLanguage ?? 'pt_BR'
  }

  static create(input: CreateCustomerUser): CustomerUser {
    return new CustomerUser(undefined, input.phone, input.restaurantId, input.name, input.address, input.preferredLanguage)
  }

  static restore(input: RestoreCustomerUser): CustomerUser {
    return new CustomerUser(
      input.id,
      input.phone,
      input.restaurantId,
      input.name,
      input.address,
      input.preferredLanguage,
      input.createdAt,
      input.updatedAt
    )
  }

  update(input: Partial<CustomerUser>): void {
    this.name = input.name ?? this.name
    this.phone = input.phone ?? this.phone
    this.address = input.address ?? this.address
    this.preferredLanguage = input.preferredLanguage ?? this.preferredLanguage
  }

  setAddress(address: Address): void {
    this.address = address
  }

  updateAddress(address: Partial<Address>): void {
    if (this.address) {
      this.address = { ...this.address, ...address }
    } else {
      this.address = address as Address
    }
  }
}

export interface CreateCustomerUser {
  phone: string
  restaurantId: string
  name?: string
  address?: Address
  preferredLanguage?: string
}

type RestoreCustomerUser = CreateCustomerUser & {
  id: string
  preferredLanguage?: string
  createdAt: Date
  updatedAt: Date
}
