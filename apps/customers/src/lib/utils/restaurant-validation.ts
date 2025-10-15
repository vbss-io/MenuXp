import type { Restaurant, RestaurantConfigValidation } from '@/types/restaurant'

export const validateRestaurantConfig = (restaurant: Restaurant, isClient = false): RestaurantConfigValidation => {
  const missingConfigs: string[] = []

  const hasAddress = !!(
    restaurant.address?.street &&
    restaurant.address?.number &&
    restaurant.address?.neighborhood &&
    restaurant.address?.city &&
    restaurant.address?.state &&
    restaurant.address?.zipCode &&
    restaurant.address?.country
  )
  if (!hasAddress) missingConfigs.push('Endereço')

  const hasContactInfo = !!(restaurant.contactInfo?.phone && restaurant.contactInfo?.email)
  if (!hasContactInfo) missingConfigs.push('Informações de Contato')

  const hasOperationSettings = !!(
    restaurant.settings?.operationTypes &&
    restaurant.settings.operationTypes.length > 0 &&
    restaurant.settings?.paymentMethods &&
    restaurant.settings.paymentMethods.length > 0 &&
    restaurant.settings?.deliveryFee !== undefined
  )
  if (!hasOperationSettings) missingConfigs.push('Configurações de Operação')

  const hasOperationHours = !!restaurant.settings?.businessHours
  if (!hasOperationHours) missingConfigs.push('Horários de Funcionamento')

  const hasTemplates = isClient ? true : !!restaurant.settings?.templates
  if (!hasTemplates) missingConfigs.push('Templates de Mensagens')

  const isReadyForOperation = hasAddress && hasContactInfo && hasOperationSettings && hasOperationHours && hasTemplates

  return {
    hasAddress,
    hasContactInfo,
    hasOperationSettings,
    hasOperationHours,
    hasTemplates,
    missingConfigs,
    isReadyForOperation
  }
}
