import { Button } from '@menuxp/ui'
import { useState } from 'react'

import { CheckoutSlideView } from '@/components/order/checkout-slide-view'

import * as S from '../../styles'

export const CheckoutSlideViewShowcase: React.FC = () => {
  const [activeShowcase, setActiveShowcase] = useState<number | null>(null)

  const showcaseScenarios = [
    {
      id: 1,
      label: 'Step 1 - Review Items',
      description: 'Initial state showing cart items'
    },
    {
      id: 2,
      label: 'Step 2 - Order Information',
      description: 'Payment and delivery configuration'
    },
    {
      id: 3,
      label: 'Step 3 - Address',
      description: 'Delivery address selection'
    },
    {
      id: 4,
      label: 'Step 4 - Summary',
      description: 'Order summary and confirmation'
    },
    {
      id: 5,
      label: 'Scheduled Order Flow',
      description: 'Scheduled order with date and time selection'
    },
    {
      id: 6,
      label: 'Guest Checkout Flow',
      description: 'Non-authenticated user checkout'
    }
  ]

  const handleOpenShowcase = (id: number) => {
    setActiveShowcase(id)
  }

  const handleCloseShowcase = () => {
    setActiveShowcase(null)
  }

  const handleSuccess = () => {
    setActiveShowcase(null)
  }

  return (
    <S.ShowcaseContainer>
      <S.Label>CheckoutSlideView</S.Label>
      <S.ShowcaseGrid>
        {showcaseScenarios.map((scenario) => (
          <S.ShowcaseCard key={scenario.id}>
            <S.ShowcaseCardTitle>{scenario.label}</S.ShowcaseCardTitle>
            <S.ShowcaseCardDescription>{scenario.description}</S.ShowcaseCardDescription>
            <Button onClick={() => handleOpenShowcase(scenario.id)}>Open Checkout</Button>
          </S.ShowcaseCard>
        ))}
      </S.ShowcaseGrid>
      {activeShowcase !== null && (
        <CheckoutSlideView isOpen={activeShowcase !== null} onClose={handleCloseShowcase} onSuccess={handleSuccess} />
      )}
    </S.ShowcaseContainer>
  )
}
