import { useState } from 'react'
import toast from 'react-hot-toast'

import { useRestaurant } from '@/hooks/use-restaurant'
import { findClientByPhone } from '@/services/client/find-client-by-phone'
import type { Client } from '@/types/client'
import { OperationType, PaymentMethod } from '@/types/order'
import { CheckCircleIcon, CheckIcon, PhoneIcon, UserIcon } from '@phosphor-icons/react'

import * as S from '../styles'

interface OrderConfigStepProps {
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

const getOrderTypeLabel = (type: OperationType) => {
  switch (type) {
    case OperationType.DELIVERY:
      return 'Entrega'
    case OperationType.BALCAO:
      return 'Retirada'
    case OperationType.MESA:
      return 'Consumo no local'
    default:
      return type
  }
}

const getPaymentMethodLabel = (method: PaymentMethod) => {
  switch (method) {
    case PaymentMethod.DINHEIRO:
      return 'Dinheiro'
    case PaymentMethod.CARTAO_CREDITO:
      return 'Cartão de Crédito'
    case PaymentMethod.CARTAO_DEBITO:
      return 'Cartão de Débito'
    case PaymentMethod.PIX:
      return 'PIX'
    default:
      return method
  }
}

export const OrderConfigStep = ({
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
}: OrderConfigStepProps) => {
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
        toast.success(`Bem-vindo de volta, ${existingClient.name || 'cliente'}!`)
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
    <S.FormSection>
      <h3>Informações do Pedido</h3>
      {!client && (
        <>
          <S.GuestInfoAlert>
            <UserIcon size={20} />
            <span>Para continuar, precisamos de algumas informações básicas</span>
          </S.GuestInfoAlert>

          <S.FormGroup>
            <S.Label>
              <PhoneIcon size={16} />
              Telefone *
            </S.Label>
            <S.Input
              type="tel"
              value={guestPhone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              placeholder="(00) 00000-0000"
              maxLength={15}
              disabled={isCheckingPhone}
              required
            />
            {isCheckingPhone && <S.FieldHint>🔍 Verificando telefone...</S.FieldHint>}
            {!isCheckingPhone && !existingClientName && !isNewClient && (
              <S.FieldHint>Digite seu telefone para continuar</S.FieldHint>
            )}
          </S.FormGroup>
          {existingClientName && (
            <S.ExistingClientInfo>
              <CheckIcon size={20} />
              <div>
                <strong>Cliente identificado!</strong>
                <span>{existingClientName}</span>
              </div>
            </S.ExistingClientInfo>
          )}
          {isNewClient && (
            <S.FormGroup>
              <S.Label>
                <UserIcon size={16} />
                Nome *
              </S.Label>
              <S.Input
                type="text"
                value={guestName}
                onChange={(e) => onGuestNameChange(e.target.value)}
                placeholder="Seu nome completo"
                required
                autoFocus
              />
              <S.FieldHint>Como você gostaria de ser chamado?</S.FieldHint>
            </S.FormGroup>
          )}

          <S.Divider />
        </>
      )}

      {canAcceptImmediateOrders && canAcceptScheduledOrders && (
        <S.FormGroup>
          <S.Label>Quando deseja receber?</S.Label>
          <S.Select
            value={isScheduled ? 'scheduled' : 'immediate'}
            onChange={(e) => onIsScheduledChange(e.target.value === 'scheduled')}
          >
            <option value="immediate">Agora (Pedido Imediato)</option>
            <option value="scheduled">Agendar para depois</option>
          </S.Select>
        </S.FormGroup>
      )}
      {mustSchedule && (
        <S.SchedulingAlert>
          <CheckCircleIcon size={20} />
          <span>
            Restaurante fechado. Este será um <strong>pedido agendado</strong>.
          </span>
        </S.SchedulingAlert>
      )}
      {isScheduled && !mustSchedule && (
        <S.SchedulingAlert>
          <CheckCircleIcon size={20} />
          <span>
            Você optou por fazer um <strong>pedido agendado</strong>.
          </span>
        </S.SchedulingAlert>
      )}
      <S.FormGroup>
        <S.Label>Tipo de Pedido</S.Label>
        <S.Select value={orderType} onChange={(e) => onOrderTypeChange(e.target.value as OperationType)}>
          {availableOrderTypes.map((type) => (
            <option key={type} value={type}>
              {getOrderTypeLabel(type)}
              {type === 'delivery' && hasDeliveryFee ? ` - Taxa: ${formatPrice(deliveryFee)}` : ''}
              {type === 'delivery' && !hasDeliveryFee ? ' - Entrega grátis' : ''}
            </option>
          ))}
        </S.Select>
        {orderType === 'delivery' && hasDeliveryFee && (
          <S.DeliveryFeeInfo>
            💰 Taxa de entrega: <strong>{formatPrice(deliveryFee)}</strong>
          </S.DeliveryFeeInfo>
        )}
        {orderType === 'delivery' && !hasDeliveryFee && (
          <S.DeliveryFeeInfo style={{ color: '#10b981' }}>✓ Entrega grátis</S.DeliveryFeeInfo>
        )}
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>Forma de Pagamento</S.Label>
        <S.Select value={paymentMethod} onChange={(e) => onPaymentMethodChange(e.target.value as PaymentMethod)}>
          {availablePaymentMethods.map((method) => (
            <option key={method} value={method}>
              {getPaymentMethodLabel(method)}
            </option>
          ))}
        </S.Select>
      </S.FormGroup>
      {isScheduled && (
        <>
          <S.FormGroup>
            <S.Label>Data do Agendamento</S.Label>
            <S.Input
              type="date"
              value={scheduledDate}
              onChange={(e) => onScheduledDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Horário do Agendamento</S.Label>
            <S.Input
              type="time"
              value={scheduledTime}
              onChange={(e) => onScheduledTimeChange(e.target.value)}
              required
            />
          </S.FormGroup>
        </>
      )}
    </S.FormSection>
  )
}
