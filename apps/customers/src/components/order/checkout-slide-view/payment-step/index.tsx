import { FormInput, useLayout } from '@menuxp/ui'
import { CheckCircleIcon, CheckIcon, UserIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslator } from 'vbss-translator'

import { useRestaurant } from '@/hooks/use-restaurant'
import { findClientByPhone } from '@/services/client/find-client-by-phone'
import type { Client } from '@/types/client'
import { OperationType, PaymentMethod } from '@/types/order'

import * as S from './styles'

interface PaymentStepProps {
  client: Client | null
  orderType: OperationType
  paymentMethod: PaymentMethod
  isScheduled: boolean
  scheduledDate: string
  scheduledTime: string
  canAcceptImmediateOrders: boolean
  canAcceptScheduledOrders: boolean
  mustSchedule: boolean
  guestPhone: string
  guestName: string
  onOrderTypeChange: (value: OperationType) => void
  onPaymentMethodChange: (value: PaymentMethod) => void
  onIsScheduledChange: (value: boolean) => void
  onScheduledDateChange: (value: string) => void
  onScheduledTimeChange: (value: string) => void
  onGuestPhoneChange: (value: string) => void
  onGuestNameChange: (value: string) => void
  onPhoneVerified: (verified: boolean) => void
  onIsNewClient: (isNew: boolean) => void
}

const getOrderTypeLabel = (type: OperationType, t: (key: string) => string) => {
  switch (type) {
    case OperationType.DELIVERY:
      return t('Entrega')
    case OperationType.BALCAO:
      return t('Retirada')
    case OperationType.MESA:
      return t('Consumo no local')
    default:
      return type
  }
}

const getPaymentMethodLabel = (method: PaymentMethod, t: (key: string) => string) => {
  switch (method) {
    case PaymentMethod.DINHEIRO:
      return t('Dinheiro')
    case PaymentMethod.CARTAO_CREDITO:
      return t('Cartão de Crédito')
    case PaymentMethod.CARTAO_DEBITO:
      return t('Cartão de Débito')
    case PaymentMethod.PIX:
      return t('PIX')
    default:
      return method
  }
}

export const PaymentStep = ({
  client,
  orderType,
  paymentMethod,
  isScheduled,
  scheduledDate,
  scheduledTime,
  canAcceptImmediateOrders,
  canAcceptScheduledOrders,
  mustSchedule,
  guestPhone,
  guestName,
  onOrderTypeChange,
  onPaymentMethodChange,
  onIsScheduledChange,
  onScheduledDateChange,
  onScheduledTimeChange,
  onGuestPhoneChange,
  onGuestNameChange,
  onPhoneVerified,
  onIsNewClient
}: PaymentStepProps) => {
  const { t } = useTranslator()
  const { layout } = useLayout()
  const { restaurant } = useRestaurant()
  const [isCheckingPhone, setIsCheckingPhone] = useState(false)
  const [existingClientName, setExistingClientName] = useState<string | null>(null)
  const [isNewClient, setIsNewClient] = useState(false)

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    onGuestPhoneChange(formatted)
    setExistingClientName(null)
    setIsNewClient(false)
    onPhoneVerified(false)
    onIsNewClient(false)
  }

  const handlePhoneBlur = async () => {
    const cleanPhone = guestPhone.replace(/\D/g, '')
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return
    }
    setIsCheckingPhone(true)
    try {
      const existingClient = await findClientByPhone({
        restaurantId: restaurant?.id?.toString() || '',
        phone: cleanPhone
      })
      if (existingClient) {
        setExistingClientName(existingClient.name || null)
        setIsNewClient(false)
        onGuestNameChange(existingClient.name || '')
        onPhoneVerified(true)
        onIsNewClient(false)
        toast.success(`${t('Bem-vindo de volta')}, ${existingClient.name || t('cliente')}!`)
      }
    } catch {
      setExistingClientName(null)
      setIsNewClient(true)
      onGuestNameChange('')
      onPhoneVerified(true)
      onIsNewClient(true)
    } finally {
      setIsCheckingPhone(false)
    }
  }

  const availableOrderTypes: OperationType[] = restaurant?.settings?.operationTypes || [
    OperationType.DELIVERY,
    OperationType.BALCAO,
    OperationType.MESA
  ]

  const availablePaymentMethods: PaymentMethod[] = restaurant?.settings?.paymentMethods || [
    PaymentMethod.DINHEIRO,
    PaymentMethod.CARTAO_CREDITO,
    PaymentMethod.CARTAO_DEBITO,
    PaymentMethod.PIX
  ]

  const deliveryFee = restaurant?.settings?.deliveryFee || 0
  const hasDeliveryFee = deliveryFee > 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <S.PaymentStep className={`payment-step layout-${layout}`}>
      <S.FormSection className="payment-form-section">
        <h3>{t('Informações do Pedido')}</h3>
        {!client && (
          <>
            <S.GuestInfoAlert className="guest-info-alert">
              <UserIcon size={20} />
              <span>{t('Para continuar, precisamos de algumas informações básicas')}</span>
            </S.GuestInfoAlert>

            <S.FormGroup className="form-group">
              <FormInput
                id="guest-phone"
                label={t('Telefone *')}
                type="tel"
                value={guestPhone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                placeholder="(00) 00000-0000"
                maxLength={15}
                disabled={isCheckingPhone}
                required
              />
              {isCheckingPhone && <S.FieldHint className="field-hint">🔍 {t('Verificando telefone...')}</S.FieldHint>}
              {!isCheckingPhone && !existingClientName && !isNewClient && (
                <S.FieldHint className="field-hint">{t('Digite seu telefone para continuar')}</S.FieldHint>
              )}
            </S.FormGroup>
            {existingClientName && (
              <S.ExistingClientInfo className="existing-client-info">
                <CheckIcon size={20} />
                <div>
                  <strong>{t('Cliente identificado!')}</strong>
                  <span>{existingClientName}</span>
                </div>
              </S.ExistingClientInfo>
            )}
            {isNewClient && (
              <S.FormGroup className="form-group">
                <FormInput
                  id="guest-name"
                  label={t('Nome *')}
                  className="form-input"
                  type="text"
                  value={guestName}
                  onChange={(e) => onGuestNameChange(e.target.value)}
                  placeholder={t('Seu nome completo')}
                  required
                  autoFocus
                />
                <S.FieldHint className="field-hint">{t('Como você gostaria de ser chamado?')}</S.FieldHint>
              </S.FormGroup>
            )}

            <S.Divider className="divider" />
          </>
        )}

        {canAcceptImmediateOrders && canAcceptScheduledOrders && (
          <S.FormGroup className="form-group">
            <S.Label className="form-label">{t('Quando deseja receber?')}</S.Label>
            <S.Select
              className="form-select"
              value={isScheduled ? 'scheduled' : 'immediate'}
              onChange={(e) => onIsScheduledChange(e.target.value === 'scheduled')}
            >
              <option value="immediate">{t('Agora (Pedido Imediato)')}</option>
              <option value="scheduled">{t('Agendar para depois')}</option>
            </S.Select>
          </S.FormGroup>
        )}
        {mustSchedule && (
          <S.SchedulingAlert className="scheduling-alert">
            <CheckCircleIcon size={20} />
            <span>
              {t('Restaurante fechado. Este será um')} <strong>{t('pedido agendado')}</strong>.
            </span>
          </S.SchedulingAlert>
        )}
        {isScheduled && !mustSchedule && (
          <S.SchedulingAlert className="scheduling-alert">
            <CheckCircleIcon size={20} />
            <span>
              {t('Você optou por fazer um')} <strong>{t('pedido agendado')}</strong>.
            </span>
          </S.SchedulingAlert>
        )}
        <S.FormGroup className="form-group">
          <S.Label className="form-label">{t('Tipo de Pedido')}</S.Label>
          <S.Select
            className="form-select"
            value={orderType}
            onChange={(e) => onOrderTypeChange(e.target.value as OperationType)}
          >
            {availableOrderTypes.map((type) => (
              <option key={type} value={type}>
                {getOrderTypeLabel(type, t)}
                {type === 'delivery' && hasDeliveryFee ? ` - ${t('Taxa')}: ${formatPrice(deliveryFee)}` : ''}
                {type === 'delivery' && !hasDeliveryFee ? ` - ${t('Entrega grátis')}` : ''}
              </option>
            ))}
          </S.Select>
          {orderType === 'delivery' && hasDeliveryFee && (
            <S.DeliveryFeeInfo className="delivery-fee-info">
              💰 {t('Taxa de entrega')}: <strong>{formatPrice(deliveryFee)}</strong>
            </S.DeliveryFeeInfo>
          )}
          {orderType === 'delivery' && !hasDeliveryFee && (
            <S.DeliveryFeeInfo className="delivery-fee-info" style={{ color: '#10b981' }}>
              ✓ {t('Entrega grátis')}
            </S.DeliveryFeeInfo>
          )}
        </S.FormGroup>
        <S.FormGroup className="form-group">
          <S.Label className="form-label">{t('Forma de Pagamento')}</S.Label>
          <S.Select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => onPaymentMethodChange(e.target.value as PaymentMethod)}
          >
            {availablePaymentMethods.map((method) => (
              <option key={method} value={method}>
                {getPaymentMethodLabel(method, t)}
              </option>
            ))}
          </S.Select>
        </S.FormGroup>
        {isScheduled && (
          <>
            <S.FormGroup className="form-group">
              <FormInput
                id="scheduled-date"
                label={t('Data do Agendamento')}
                className="form-input"
                type="date"
                value={scheduledDate}
                onChange={(e) => onScheduledDateChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </S.FormGroup>
            <S.FormGroup className="form-group">
              <FormInput
                id="scheduled-time"
                label={t('Horário do Agendamento')}
                className="form-input"
                type="time"
                value={scheduledTime}
                onChange={(e) => onScheduledTimeChange(e.target.value)}
                required
              />
            </S.FormGroup>
          </>
        )}
      </S.FormSection>
    </S.PaymentStep>
  )
}
