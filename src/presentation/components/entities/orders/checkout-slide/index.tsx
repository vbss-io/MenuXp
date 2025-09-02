import { useState } from 'react'
import styled from 'styled-components'
import {
  XIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
  MapPinIcon,
  CreditCardIcon,
  CheckCircleIcon
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClient } from '@/presentation/hooks/use-client'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { useCart } from '@/presentation/hooks/use-cart'
import { CreateOrderUsecase } from '@/application/orders/create-order.usecase'
import { OperationType, PaymentMethod } from '@/domain/models/order.model'
import { toast } from 'react-hot-toast'

const getStepBackgroundColor = (active: boolean, completed: boolean) => {
  if (completed) return '#10B981'
  if (active) return '#3B82F6'
  return '#9CA3AF'
}

const getStepTextColor = (active: boolean, completed: boolean) => {
  if (completed) return '#059669'
  if (active) return '#2563EB'
  return '#6B7280'
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

const SlideOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
`

const SlideContainer = styled(motion.div)`
  background: white;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  overflow-y: auto;
  position: relative;
`

const SlideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`

const HeaderTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`

const SlideContent = styled.div`
  padding: 1.5rem;
`

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 1rem;
`

const Step = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 1rem;
    left: 50%;
    width: 100%;
    height: 2px;
    background: ${({ active, completed }) => {
      if (completed) return '#10B981'
      if (active) return '#3B82F6'
      return '#D1D5DB'
    }};
    z-index: -1;
  }

  &:last-child::after {
    display: none;
  }
`

const StepIcon = styled.div<{ active: boolean; completed: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ active, completed }) => getStepBackgroundColor(active, completed)};
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
`

const StepLabel = styled.span<{ active: boolean; completed: boolean }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ active, completed }) => getStepTextColor(active, completed)};
  text-align: center;
`

const StepContent = styled.div`
  min-height: 400px;
`

const ItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
`

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ItemName = styled.span`
  font-weight: 600;
  color: #111827;
`

const ItemDetails = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`

const ItemPrice = styled.span`
  font-weight: 600;
  color: #111827;
`

const AddressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const AddressCard = styled.div<{ selected: boolean }>`
  padding: 1rem;
  border: 2px solid ${({ selected }) => (selected ? '#3B82F6' : '#E5E7EB')};
  border-radius: 6px;
  background: ${({ selected }) => (selected ? '#EFF6FF' : 'white')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #60a5fa;
  }
`

const AddressTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

const AddressText = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #111827;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translate(-2px, -2px);
  }
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #111827;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translate(-2px, -2px);
  }

  &::placeholder {
    color: #6b7280;
  }
`

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
    font-weight: 600;
    font-size: 1.125rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

const Button = styled.button<{ variant: 'primary' | 'secondary'; primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  padding: 0.75rem 1rem;
  background: ${({ variant, primaryColor }) => (variant === 'primary' ? primaryColor : 'transparent')};
  color: ${({ variant, primaryColor }) => (variant === 'primary' ? 'white' : primaryColor)};
  border: 2px solid ${({ primaryColor }) => primaryColor};
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translate(-2px, -2px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

interface CheckoutSlideProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const STEPS = [
  { id: 1, label: 'Itens', icon: ShoppingCartIcon },
  { id: 2, label: 'Endereço', icon: MapPinIcon },
  { id: 3, label: 'Pagamento', icon: CreditCardIcon },
  { id: 4, label: 'Confirmação', icon: CheckCircleIcon }
]

export const CheckoutSlide = ({ isOpen, onClose, onSuccess }: CheckoutSlideProps) => {
  const { client } = useClient()
  const { restaurant, operationId } = useRestaurant()
  const { cart } = useCart({
    clientId: client?.id || '',
    restaurantId: restaurant?.id || '',
    enabled: !!client?.id && !!restaurant?.id
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [useClientAddress, setUseClientAddress] = useState(!!client?.address)
  const [customAddress, setCustomAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  })
  const [orderType, setOrderType] = useState<OperationType>(OperationType.DELIVERY)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.DINHEIRO)

  const primaryColor = restaurant?.style?.primaryColor || '#3B82F6'

  const availableOrderTypes: OperationType[] = [OperationType.DELIVERY, OperationType.BALCAO, OperationType.MESA]
  const availablePaymentMethods: PaymentMethod[] = [
    PaymentMethod.DINHEIRO,
    PaymentMethod.CARTAO_CREDITO,
    PaymentMethod.CARTAO_DEBITO,
    PaymentMethod.PIX
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      // Validação específica para cada step
      if (currentStep === 2) {
        // Validar endereço
        if (!hasValidAddress()) {
          toast.error('Por favor, preencha todos os campos obrigatórios do endereço')
          return
        }
      }

      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAddressChange = (field: string, value: string) => {
    setCustomAddress((prev) => ({ ...prev, [field]: value }))
  }

  const getSelectedAddress = () => {
    if (useClientAddress && client?.address) {
      return {
        street: client.address.street,
        number: client.address.number,
        complement: client.address.complement,
        neighborhood: client.address.neighborhood,
        city: client.address.city,
        state: client.address.state
      }
    }
    return customAddress
  }

  const hasValidAddress = () => {
    const address = getSelectedAddress()
    return address.street && address.number && address.neighborhood && address.city && address.state
  }

  const calculateTotal = () => {
    if (!cart?.items) return 0
    return cart.items.reduce((total, item) => {
      const itemPrice = item.price
      const optionalsPrice = item.optionals?.reduce((optTotal, opt) => optTotal + opt.price, 0) || 0
      return total + (itemPrice + optionalsPrice) * item.quantity
    }, 0)
  }

  const handleConfirmOrder = async () => {
    if (!client || !restaurant || !cart) return

    setIsLoading(true)
    try {
      const address = getSelectedAddress()
      const usecase = new CreateOrderUsecase()
      if (!operationId) {
        toast.error('Não foi possível encontrar o id da operação')
        return
      }
      const result = await usecase.execute({
        restaurantId: restaurant.id,
        operationId: operationId,
        clientId: client.id,
        customer: {
          name: client.name ?? '',
          phone: client.phone,
          address: {
            street: address.street,
            number: address.number,
            complement: address.complement || '',
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state
          }
        },
        orderType,
        paymentMethod,
        items: cart.items.map((item) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      })

      toast.success(`Pedido criado com sucesso! Código: ${result.code}`)
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      toast.error('Erro ao criar pedido. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ItemsSection>
            <h3>Revisar Itens</h3>
            {cart?.items.map((item, index) => (
              <ItemCard key={index}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemDetails>
                    {item.quantity}x {formatPrice(item.price)}
                    {item.optionals && item.optionals.length > 0 && (
                      <span> + {item.optionals.map((opt) => opt.name).join(', ')}</span>
                    )}
                  </ItemDetails>
                </ItemInfo>
                <ItemPrice>
                  {formatPrice(
                    (item.price + (item.optionals?.reduce((sum, opt) => sum + opt.price, 0) || 0)) * item.quantity
                  )}
                </ItemPrice>
              </ItemCard>
            ))}
          </ItemsSection>
        )
      case 2:
        return (
          <AddressSection>
            <h3>Endereço de Entrega</h3>
            {client?.address && (
              <AddressCard selected={useClientAddress} onClick={() => setUseClientAddress(true)}>
                <AddressTitle>Usar endereço cadastrado</AddressTitle>
                <AddressText>
                  {client.address.street}, {client.address.number}
                  {client.address.complement && ` - ${client.address.complement}`}
                  <br />
                  {client.address.neighborhood}, {client.address.city} - {client.address.state}
                </AddressText>
              </AddressCard>
            )}
            <AddressCard selected={!useClientAddress} onClick={() => setUseClientAddress(false)}>
              <AddressTitle>Usar outro endereço</AddressTitle>
              <AddressText>
                {useClientAddress ? 'Clique para inserir outro endereço' : 'Preencha os dados abaixo'}
              </AddressText>
            </AddressCard>
            {!useClientAddress && (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormGroup>
                    <Label>Rua</Label>
                    <Input
                      type="text"
                      value={customAddress.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      placeholder="Digite a rua"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Número</Label>
                    <Input
                      type="text"
                      value={customAddress.number}
                      onChange={(e) => handleAddressChange('number', e.target.value)}
                      placeholder="Nº"
                      required
                    />
                  </FormGroup>
                </div>
                <FormGroup>
                  <Label>Complemento</Label>
                  <Input
                    type="text"
                    value={customAddress.complement}
                    onChange={(e) => handleAddressChange('complement', e.target.value)}
                    placeholder="Apto, bloco, etc."
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Bairro</Label>
                  <Input
                    type="text"
                    value={customAddress.neighborhood}
                    onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                    placeholder="Digite o bairro"
                    required
                  />
                </FormGroup>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormGroup>
                    <Label>Cidade</Label>
                    <Input
                      type="text"
                      value={customAddress.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      placeholder="Digite a cidade"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Estado</Label>
                    <Input
                      type="text"
                      value={customAddress.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      placeholder="UF"
                      required
                    />
                  </FormGroup>
                </div>
              </div>
            )}
          </AddressSection>
        )
      case 3:
        return (
          <FormSection>
            <h3>Tipo de Pedido e Pagamento</h3>

            <FormGroup>
              <Label>Tipo de Pedido</Label>
              <Select value={orderType} onChange={(e) => setOrderType(e.target.value as OperationType)}>
                {availableOrderTypes.map((type) => (
                  <option key={type} value={type}>
                    {getOrderTypeLabel(type)}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Forma de Pagamento</Label>
              <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}>
                {availablePaymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {getPaymentMethodLabel(method)}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormSection>
        )
      case 4:
        return (
          <SummarySection>
            <h3>Resumo do Pedido</h3>
            <SummaryRow>
              <span>Itens ({cart?.items.length || 0})</span>
              <span>{formatPrice(calculateTotal())}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Tipo de Pedido</span>
              <span>{getOrderTypeLabel(orderType)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Forma de Pagamento</span>
              <span>{getPaymentMethodLabel(paymentMethod)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Endereço</span>
              <span style={{ fontSize: '0.875rem', textAlign: 'right' }}>
                {(() => {
                  const address = getSelectedAddress()
                  return `${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ''}`
                })()}
              </span>
            </SummaryRow>
            <SummaryRow>
              <span>Total</span>
              <span>{formatPrice(calculateTotal())}</span>
            </SummaryRow>
          </SummarySection>
        )
      default:
        return null
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <SlideOverlay onClick={handleBackdropClick}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <SlideContainer>
              <SlideHeader>
                <HeaderTitle>
                  <ShoppingCartIcon size={24} style={{ color: primaryColor }} />
                  Finalizar Pedido
                </HeaderTitle>
                <CloseButton onClick={onClose}>
                  <XIcon size={24} />
                </CloseButton>
              </SlideHeader>
              <SlideContent>
                <StepsContainer>
                  {STEPS.map((step) => {
                    const Icon = step.icon
                    const isActive = currentStep === step.id
                    const isCompleted = currentStep > step.id
                    return (
                      <Step key={step.id} active={isActive} completed={isCompleted}>
                        <StepIcon active={isActive} completed={isCompleted}>
                          {isCompleted ? <CheckCircleIcon size={16} /> : <Icon size={16} />}
                        </StepIcon>
                        <StepLabel active={isActive} completed={isCompleted}>
                          {step.label}
                        </StepLabel>
                      </Step>
                    )
                  })}
                </StepsContainer>
                <StepContent>{renderStepContent()}</StepContent>
                <ButtonGroup>
                  {currentStep > 1 && (
                    <Button
                      variant="secondary"
                      primaryColor={primaryColor}
                      onClick={handlePrevious}
                      disabled={isLoading}
                    >
                      <ArrowLeftIcon size={20} />
                      Anterior
                    </Button>
                  )}
                  {currentStep < 4 ? (
                    <Button variant="primary" primaryColor={primaryColor} onClick={handleNext} disabled={isLoading}>
                      Próximo
                      <ArrowRightIcon size={20} />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      primaryColor={primaryColor}
                      onClick={handleConfirmOrder}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processando...' : 'Confirmar Pedido'}
                      <CheckCircleIcon size={20} />
                    </Button>
                  )}
                </ButtonGroup>
              </SlideContent>
            </SlideContainer>
          </motion.div>
        </SlideOverlay>
      )}
    </AnimatePresence>
  )
}
