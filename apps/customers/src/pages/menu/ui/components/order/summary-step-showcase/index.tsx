import { SummaryStep } from '@/components/order/checkout-slide-view/summary-step'
import type { Cart } from '@/types/cart'
import { OperationType, PaymentMethod } from '@/types/order'

import * as S from '../../styles'

const mockCart: Cart = {
  id: '1',
  clientId: 'client-1',
  restaurantId: 'restaurant-1',
  items: [
    {
      itemId: 'item-1',
      name: 'X-Burger Bacon',
      price: 28.9,
      quantity: 2,
      itemType: 'menu-item',
      optionals: [
        {
          name: 'Queijo Extra',
          price: 3.5,
          quantity: 2
        }
      ]
    },
    {
      itemId: 'item-2',
      name: 'Batata Frita Grande',
      price: 15.9,
      quantity: 1,
      itemType: 'menu-item',
      optionals: []
    }
  ],
  total: 80.7,
  itemCount: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}

const mockAddress = {
  street: 'Rua das Flores',
  number: '123',
  complement: 'Apto 45',
  neighborhood: 'Centro',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01234-567'
}

const mockScenarios = [
  {
    label: 'Entrega com taxa - Cartão de Crédito',
    orderType: OperationType.DELIVERY,
    paymentMethod: PaymentMethod.CARTAO_CREDITO,
    isScheduled: false,
    scheduledDate: '',
    scheduledTime: '',
    hasDeliveryFee: true
  },
  {
    label: 'Entrega sem taxa - PIX',
    orderType: OperationType.DELIVERY,
    paymentMethod: PaymentMethod.PIX,
    isScheduled: false,
    scheduledDate: '',
    scheduledTime: '',
    hasDeliveryFee: false
  },
  {
    label: 'Retirada - Dinheiro',
    orderType: OperationType.BALCAO,
    paymentMethod: PaymentMethod.DINHEIRO,
    isScheduled: false,
    scheduledDate: '',
    scheduledTime: '',
    hasDeliveryFee: false
  },
  {
    label: 'Entrega Agendada - Cartão de Débito',
    orderType: OperationType.DELIVERY,
    paymentMethod: PaymentMethod.CARTAO_DEBITO,
    isScheduled: true,
    scheduledDate: '2025-12-25',
    scheduledTime: '19:30',
    hasDeliveryFee: true
  },
  {
    label: 'Consumo no local - PIX',
    orderType: OperationType.MESA,
    paymentMethod: PaymentMethod.PIX,
    isScheduled: false,
    scheduledDate: '',
    scheduledTime: '',
    hasDeliveryFee: false
  },
  {
    label: 'Entrega com desconto - Cartão de Crédito',
    orderType: OperationType.DELIVERY,
    paymentMethod: PaymentMethod.CARTAO_CREDITO,
    isScheduled: false,
    scheduledDate: '',
    scheduledTime: '',
    hasDeliveryFee: true
  }
]

export const SummaryStepShowcase = () => {
  const calculateTotal = () => {
    return mockCart.items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity
      const optionalsTotal = (item.optionals ?? []).reduce((optTotal, opt) => optTotal + opt.price * opt.quantity, 0)
      return total + itemTotal + optionalsTotal
    }, 0)
  }

  const getSelectedAddress = () => mockAddress

  return (
    <S.ShowcaseContainer>
      <S.Label>Summary Step - Order Confirmation</S.Label>
      <S.ShowcaseGrid>
        {mockScenarios.map((scenario, index) => (
          <div key={index} style={{ maxWidth: '500px', width: '100%' }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{scenario.label}</h4>
            <SummaryStep
              cart={mockCart}
              orderType={scenario.orderType}
              paymentMethod={scenario.paymentMethod}
              isScheduled={scenario.isScheduled}
              scheduledDate={scenario.scheduledDate}
              scheduledTime={scenario.scheduledTime}
              getSelectedAddress={getSelectedAddress}
              calculateTotal={calculateTotal}
            />
          </div>
        ))}
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
