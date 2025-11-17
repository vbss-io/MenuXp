import React from 'react'

import { PlanCard } from '../plan-card'
import type { PlanCardProps, PlanViewModel } from '../types'
import * as S from './styles'

export interface PlanGridProps {
  plans: PlanViewModel[]
  onPlanSelect?: PlanCardProps['onCTAClick']
  showYearlyPrice?: boolean
  highlightedPlanCode?: string
  context?: PlanCardProps['context']
  getCTAType?: (plan: PlanViewModel) => PlanCardProps['ctaType']
  getCTALabel?: (plan: PlanViewModel) => string
}

export const PlanGrid: React.FC<PlanGridProps> = ({
  plans,
  onPlanSelect,
  showYearlyPrice = false,
  highlightedPlanCode,
  context = 'public',
  getCTAType,
  getCTALabel
}) => {
  return (
    <S.GridContainer>
      {plans.map((plan) => (
        <PlanCard
          key={plan.code}
          plan={plan}
          context={context}
          onCTAClick={onPlanSelect}
          showYearlyPrice={showYearlyPrice}
          highlighted={plan.code === highlightedPlanCode || plan.isPopular}
          ctaType={getCTAType ? getCTAType(plan) : 'signup'}
          ctaLabel={getCTALabel ? getCTALabel(plan) : undefined}
        />
      ))}
    </S.GridContainer>
  )
}

PlanGrid.displayName = 'PlanGrid'
