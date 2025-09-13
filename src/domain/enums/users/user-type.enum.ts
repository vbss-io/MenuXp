export enum UserType {
  INTERNAL = 'internal', // Funcionários da empresa (admin, suporte, etc)
  OWNER = 'owner', // Donos de restaurantes
  STAFF = 'staff' // Funcionários dos restaurantes
}

export const userTypes = Object.values(UserType)
