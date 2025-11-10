import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CreditCardIcon,
  MapPinIcon,
  ShoppingCartIcon
} from '@phosphor-icons/react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslator } from 'vbss-translator'

import { AddressStep } from '@/components/order/checkout-slide-view/address-step'
import { PaymentStep } from '@/components/order/checkout-slide-view/payment-step'
import { ReviewItemsStep } from '@/components/order/checkout-slide-view/review-items-step'
import { SummaryStep } from '@/components/order/checkout-slide-view/summary-step'
import { useCart } from '@/hooks/use-cart'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import { type CreateOrderParams, createOrder as createOrderService } from '@/services/order/create-order'
import type { Address } from '@/types/address'
import { OperationType, PaymentMethod } from '@/types/order'
import { Button, Slider } from '@menuxp/ui'
import { useMutation } from '@tanstack/react-query'

import * as S from './styles'

interface CheckoutSlideViewProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const CheckoutSlideView = ({ isOpen, onClose, onSuccess }: CheckoutSlideViewProps) => {
  const { t } = useTranslator()
  const { client, loginClient, registerClient } = useClient()
  const { restaurant, operationId } = useRestaurant()
  const { cart, refetch: refetchCart } = useCart({
    clientId: client?.id || '',
    restaurantId: restaurant?.id?.toString() || '',
    enabled: !!restaurant?.id
  })
  const { updateClientData } = useClient()

  const isOperationActive = !!operationId
  const acceptsScheduling = restaurant?.settings?.acceptsScheduling || false

  const canAcceptImmediateOrders = isOperationActive
  const canAcceptScheduledOrders = acceptsScheduling
  const canAcceptOrders = canAcceptImmediateOrders || canAcceptScheduledOrders
  const mustSchedule = !isOperationActive && acceptsScheduling

  const getValidationMessage = () => {
    if (mustSchedule) {
      return t('Restaurante fechado. Apenas pedidos agendados.')
    } else if (isOperationActive && acceptsScheduling) {
      return t('Restaurante aberto. Pedidos imediatos ou agendados aceitos.')
    } else if (isOperationActive) {
      return t('Restaurante aberto. Pedidos imediatos aceitos.')
    } else {
      return t('Restaurante fechado. Não aceita pedidos agendados.')
    }
  }

  const createOrderMutation = useMutation({
    mutationFn: (params: CreateOrderParams) => createOrderService(params),
    onSuccess: (data) => {
      toast.success(`${t('Pedido criado com sucesso! Código')}: ${data.code}`)
      onSuccess()
    },
    onError: () => {
      toast.error(t('Erro ao criar pedido. Tente novamente.'))
    }
  })

  const createOrder = async (params: CreateOrderParams) => {
    return await createOrderMutation.mutateAsync(params)
  }

  const isCreating = createOrderMutation.isPending

  const [currentStep, setCurrentStep] = useState(1)
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledDate, setScheduledDate] = useState<string>('')
  const [scheduledTime, setScheduledTime] = useState<string>('')

  const hasValidClientAddress = !!(
    client?.address?.street &&
    client?.address?.number &&
    client?.address?.neighborhood &&
    client?.address?.city &&
    client?.address?.state
  )
  const [useClientAddress, setUseClientAddress] = useState(hasValidClientAddress)

  const [guestPhone, setGuestPhone] = useState<string>('')
  const [guestName, setGuestName] = useState<string>('')
  const [isAuthenticatingGuest, setIsAuthenticatingGuest] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [isNewClient, setIsNewClient] = useState(false)

  const [customAddress, setCustomAddress] = useState<Address>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  })
  const [orderType, setOrderType] = useState<OperationType>(OperationType.DELIVERY)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.DINHEIRO)

  useEffect(() => {
    if (mustSchedule) {
      setIsScheduled(true)
    }
  }, [mustSchedule])

  useEffect(() => {
    if (isOpen) {
      refetchCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleNext = async () => {
    if (currentStep === 2 && !client) {
      const cleanPhone = guestPhone.replace(/\D/g, '')
      if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 11) {
        toast.error(t('Por favor, insira um telefone válido'))
        return
      }
      if (!phoneVerified) {
        toast.error(t('Por favor, aguarde a verificação do telefone ou clique fora do campo'))
        return
      }
      if (!guestName || guestName.trim().length < 3) {
        toast.error(t('Por favor, informe seu nome completo'))
        return
      }
      setIsAuthenticatingGuest(true)
      try {
        if (isNewClient) {
          await registerClient({
            phone: cleanPhone,
            name: guestName,
            restaurantId: restaurant?.id?.toString() || ''
          })
        } else {
          await loginClient(cleanPhone, restaurant?.id?.toString() || '')
        }
        await refetchCart()
      } catch (error) {
        console.error('Erro ao autenticar visitante:', error)
        toast.error(t('Erro ao processar seus dados. Tente novamente.'))
        setIsAuthenticatingGuest(false)
        return
      }
      setIsAuthenticatingGuest(false)
    }
    if (currentStep === 2 && orderType !== 'delivery') {
      setCurrentStep(4)
    } else if (currentStep === 3 && orderType === 'delivery') {
      if (!hasValidAddress()) {
        toast.error(t('Por favor, preencha todos os campos obrigatórios do endereço'))
        return
      }
      setCurrentStep(4)
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep === 4 && orderType !== 'delivery') {
      setCurrentStep(2)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAddressChange = useCallback((address: Address) => {
    setCustomAddress(address)
  }, [])

  const handleSaveAddressForFuture = async () => {
    if (!client?.id) return
    const address = getSelectedAddress()
    try {
      await updateClientData(client.id, {
        id: client.id,
        phone: client.phone,
        address: {
          street: address.street,
          number: address.number,
          complement: address.complement || '',
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode
        }
      })
      toast.success(t('Endereço salvo com sucesso!'))
    } catch (error) {
      console.error('Erro ao salvar endereço:', error)
      toast.error(t('Erro ao salvar endereço'))
    }
  }

  const getSelectedAddress = () => {
    if (useClientAddress && client?.address) {
      return {
        street: client.address.street,
        number: client.address.number,
        complement: client.address.complement || '',
        neighborhood: client.address.neighborhood,
        city: client.address.city,
        state: client.address.state,
        zipCode: client.address.zipCode
      }
    }
    return {
      ...customAddress,
      complement: customAddress.complement || ''
    }
  }

  const hasValidAddress = () => {
    if (orderType !== 'delivery') return true
    const address = getSelectedAddress()
    return address.street && address.number && address.neighborhood && address.city && address.state && address.zipCode
  }

  const calculateTotal = () => {
    if (!cart?.items) return 0
    return cart.items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity
      const optionalsTotal = (item.optionals ?? []).reduce((optTotal, opt) => optTotal + opt.price * opt.quantity, 0)
      return total + itemTotal + optionalsTotal
    }, 0)
  }

  const handleConfirmOrder = async () => {
    if (!canAcceptOrders) {
      toast.error(getValidationMessage())
      return
    }
    if (!client || !restaurant || !cart) {
      toast.error(t('Dados incompletos para finalizar pedido'))
      return
    }
    if (isScheduled) {
      if (!canAcceptScheduledOrders) {
        toast.error(t('Restaurante não aceita pedidos agendados'))
        return
      }
      if (!scheduledDate || !scheduledTime) {
        toast.error(t('Por favor, selecione a data e hora para o agendamento'))
        return
      }
    } else {
      if (!canAcceptImmediateOrders) {
        toast.error(t('Restaurante fechado. Não é possível fazer pedidos imediatos.'))
        return
      }
      if (!operationId) {
        toast.error(t('Não foi possível encontrar o id da operação'))
        return
      }
    }
    try {
      if (orderType === 'delivery' && !hasValidClientAddress) {
        const address = getSelectedAddress()
        await updateClientData(client.id, {
          id: client.id,
          phone: client.phone,
          address: {
            street: address.street,
            number: address.number,
            complement: address.complement || '',
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode
          }
        })
      }
      const deliveryFee = orderType === 'delivery' ? restaurant.settings?.deliveryFee || 0 : 0
      const orderData = {
        clientId: client.id,
        orderType,
        paymentMethod,
        deliveryFee,
        ...(isScheduled
          ? {
              scheduledFor: new Date(`${scheduledDate}T${scheduledTime}:00`).toISOString()
            }
          : {
              operationId: operationId!
            })
      }
      await createOrder(orderData)
      await refetchCart()
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ReviewItemsStep cart={cart} />
      case 2:
        return (
          <PaymentStep
            client={client}
            orderType={orderType}
            paymentMethod={paymentMethod}
            isScheduled={isScheduled}
            scheduledDate={scheduledDate}
            scheduledTime={scheduledTime}
            canAcceptImmediateOrders={canAcceptImmediateOrders}
            canAcceptScheduledOrders={canAcceptScheduledOrders}
            mustSchedule={mustSchedule}
            guestPhone={guestPhone}
            guestName={guestName}
            onOrderTypeChange={setOrderType}
            onPaymentMethodChange={setPaymentMethod}
            onIsScheduledChange={setIsScheduled}
            onScheduledDateChange={setScheduledDate}
            onScheduledTimeChange={setScheduledTime}
            onGuestPhoneChange={setGuestPhone}
            onGuestNameChange={setGuestName}
            onPhoneVerified={setPhoneVerified}
            onIsNewClient={setIsNewClient}
          />
        )
      case 3:
        if (orderType === 'delivery') {
          return (
            <AddressStep
              client={client}
              useClientAddress={useClientAddress}
              customAddress={customAddress}
              onUseClientAddressChange={setUseClientAddress}
              onCustomAddressChange={handleAddressChange}
              onSaveAddressForFuture={handleSaveAddressForFuture}
            />
          )
        }
        return (
          <SummaryStep
            cart={cart}
            orderType={orderType}
            paymentMethod={paymentMethod}
            isScheduled={isScheduled}
            scheduledDate={scheduledDate}
            scheduledTime={scheduledTime}
            getSelectedAddress={getSelectedAddress}
            calculateTotal={calculateTotal}
          />
        )
      case 4:
        return (
          <SummaryStep
            cart={cart}
            orderType={orderType}
            paymentMethod={paymentMethod}
            isScheduled={isScheduled}
            scheduledDate={scheduledDate}
            scheduledTime={scheduledTime}
            getSelectedAddress={getSelectedAddress}
            calculateTotal={calculateTotal}
          />
        )
      default:
        return null
    }
  }

  const STEPS = [
    { id: 1, label: t('Itens'), icon: ShoppingCartIcon },
    { id: 2, label: t('Informações'), icon: CreditCardIcon },
    { id: 3, label: t('Endereço'), icon: MapPinIcon },
    { id: 4, label: t('Confirmação'), icon: CheckCircleIcon }
  ]

  return (
    <Slider
      isOpen={isOpen}
      onClose={onClose}
      title={t('Finalizar Pedido')}
      icon={<ShoppingCartIcon size={24} style={{ color: 'var(--restaurant-primary-color)' }} />}
      maxWidth="500px"
      noPadding={false}
    >
      <S.StepsContainer className="steps-container">
        {STEPS.map((step) => {
          if (step.id === 3 && orderType !== 'delivery') return null
          const Icon = step.icon
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id
          return (
            <S.Step
              key={step.id}
              $active={isActive}
              $completed={isCompleted}
              className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <S.StepIcon
                $active={isActive}
                $completed={isCompleted}
                className={`step-icon ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                {isCompleted ? <CheckCircleIcon size={16} /> : <Icon size={16} />}
              </S.StepIcon>
              <S.StepLabel
                $active={isActive}
                $completed={isCompleted}
                className={`step-label ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                {step.label}
              </S.StepLabel>
            </S.Step>
          )
        })}
      </S.StepsContainer>
      <S.StepContent>{renderStepContent()}</S.StepContent>
      <S.ButtonGroup>
        {currentStep > 1 && (
          <Button
            onClick={handlePrevious}
            disabled={isCreating}
            className="navigation-button secondary"
            leftIcon={<ArrowLeftIcon size={20} />}
          >
            {t('Anterior')}
          </Button>
        )}
        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={isCreating || isAuthenticatingGuest}
            className="navigation-button primary"
            rightIcon={<ArrowRightIcon size={20} />}
          >
            {isAuthenticatingGuest ? t('Processando...') : t('Próximo')}
          </Button>
        ) : (
          <Button onClick={handleConfirmOrder} disabled={isCreating} className="navigation-button primary">
            {isCreating ? t('Processando...') : t('Confirmar Pedido')}
            <CheckCircleIcon size={20} />
          </Button>
        )}
      </S.ButtonGroup>
    </Slider>
  )
}
