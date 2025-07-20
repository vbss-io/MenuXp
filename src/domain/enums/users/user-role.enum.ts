export enum UserRole {
  // Internos
  SUPER_ADMIN = 'super_admin', // Acesso total ao sistema
  SUPPORT = 'support', // Suporte ao cliente
  FINANCIAL = 'financial', // Gestão financeira

  // Owners
  RESTAURANT_OWNER = 'restaurant_owner', // Dono de restaurante

  // Staffs
  MANAGER = 'manager', // Gerente do restaurante
  CASHIER = 'cashier', // Caixa
  KITCHEN = 'kitchen', // Cozinha
  DELIVERY = 'delivery', // Entrega
  WAITER = 'waiter' // Garçom
}

export const userRoles = Object.values(UserRole)
