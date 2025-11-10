import type { Restaurant, RestaurantConfigValidation } from '@/types/restaurant'

export const validateRestaurantConfig = (
  restaurant: Restaurant,
  isClient = false,
  t?: (key: string) => string
): RestaurantConfigValidation => {
  const translate = t || ((key: string) => key)
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
  if (!hasAddress) missingConfigs.push(translate('Endereço'))
  const hasContactInfo = !!(restaurant.contactInfo?.phone && restaurant.contactInfo?.email)
  if (!hasContactInfo) missingConfigs.push(translate('Informações de Contato'))
  const hasOperationSettings = !!(
    restaurant.settings?.operationTypes &&
    restaurant.settings.operationTypes.length > 0 &&
    restaurant.settings?.paymentMethods &&
    restaurant.settings.paymentMethods.length > 0 &&
    restaurant.settings?.deliveryFee !== undefined
  )
  if (!hasOperationSettings) missingConfigs.push(translate('Configurações de Operação'))
  const hasOperationHours = !!restaurant.settings?.businessHours
  if (!hasOperationHours) missingConfigs.push(translate('Horários de Funcionamento'))
  const hasTemplates = isClient ? true : !!restaurant.settings?.templates
  if (!hasTemplates) missingConfigs.push(translate('Templates de Mensagens'))
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
