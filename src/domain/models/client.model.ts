export interface ClientAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface Client {
  id: string
  phone: string
  restaurantId: string
  name?: string
  address?: ClientAddress
  createdAt: string
  updatedAt: string
}

export interface CreateClientInput {
  phone: string
  restaurantId: string
  name?: string
  address?: ClientAddress
}

export interface UpdateClientInput {
  phone?: string
  name?: string
  address?: ClientAddress
}
