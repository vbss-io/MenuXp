export enum SubscriptionStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  CANCELLED = 'cancelled', // Cancelada pelo user/stripe
  SUSPENDED = 'suspended', // Suspedida por x motivo
  EXPIRED = 'expired'
}

export const SubscriptionStatusValues = Object.values(SubscriptionStatus)
