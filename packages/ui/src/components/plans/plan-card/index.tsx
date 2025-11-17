import { Button } from '@menuxp/ui'
import { CheckIcon } from '@phosphor-icons/react'
import React from 'react'

import type { PlanCardProps } from '../types'
import * as S from './styles'

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  context: _context = 'public',
  onCTAClick,
  ctaType = 'signup',
  ctaLabel,
  showYearlyPrice = false,
  highlighted = false
}) => {
  const price = showYearlyPrice ? plan.yearlyPrice : plan.monthlyPrice
  const priceLabel = showYearlyPrice ? 'ano' : 'mês'

  const getCTAVariant = () => {
    if (ctaType === 'current') return 'outline'
    if (highlighted || plan.isPopular) return 'primary'
    return 'secondary'
  }

  const getCTALabel = () => {
    if (ctaLabel) return ctaLabel
    if (ctaType === 'current') return 'Plano Atual'
    if (ctaType === 'upgrade') return 'Fazer Upgrade'
    if (ctaType === 'downgrade') return 'Mudar Plano'
    if (ctaType === 'select') return 'Selecionar Plano'
    return 'Começar Agora'
  }

  const handleCTAClick = () => {
    if (ctaType !== 'current' && onCTAClick) {
      onCTAClick(plan.code, ctaType)
    }
  }

  const renderFeatureValue = (value: number | boolean | null, unit?: string): string => {
    if (value === null) return 'Ilimitado'
    if (typeof value === 'boolean') return value ? 'Sim' : 'Não'
    return unit ? `${value} ${unit}` : String(value)
  }

  return (
    <S.CardContainer
      $highlighted={highlighted}
      role="article"
      aria-label={`${plan.name} plan details`}
    >
      {plan.isPopular && <S.PopularBadge aria-label="Most popular plan">Mais Popular</S.PopularBadge>}
      <S.CardHeader>
        <S.PlanName id={`plan-${plan.code}-name`}>{plan.name}</S.PlanName>
        {plan.description && <S.PlanDescription>{plan.description}</S.PlanDescription>}
      </S.CardHeader>
      <S.PriceSection aria-labelledby={`plan-${plan.code}-name`}>
        <S.Currency aria-label="Currency">{plan.currency === 'BRL' ? 'R$' : plan.currency}</S.Currency>
        <S.Price aria-label={`Price ${price.toFixed(2)}`}>{price.toFixed(2)}</S.Price>
        <S.PriceLabel>/{priceLabel}</S.PriceLabel>
      </S.PriceSection>
      <S.CTAContainer>
        <Button
          variant={getCTAVariant()}
          size="md"
          onClick={handleCTAClick}
          disabled={ctaType === 'current'}
          container="plan-cta"
          aria-label={`${getCTALabel()} for ${plan.name} plan`}
        >
          {getCTALabel()}
        </Button>
      </S.CTAContainer>
      <S.FeaturesSection aria-label={`Features included in ${plan.name} plan`}>
        <S.FeatureItem>
          <CheckIcon size={20} weight="bold" />
          <span>{renderFeatureValue(plan.features.menuItems, 'itens no cardápio')}</span>
        </S.FeatureItem>
        <S.FeatureItem>
          <CheckIcon size={20} weight="bold" />
          <span>{renderFeatureValue(plan.features.monthlyOrders, 'pedidos/mês')}</span>
        </S.FeatureItem>
        <S.FeatureItem>
          <CheckIcon size={20} weight="bold" />
          <span>{renderFeatureValue(plan.features.staffMembers, 'membros da equipe')}</span>
        </S.FeatureItem>
        <S.FeatureItem>
          <CheckIcon size={20} weight="bold" />
          <span>{renderFeatureValue(plan.features.menuLayouts, 'layouts de cardápio')}</span>
        </S.FeatureItem>
        {plan.features.customDomain && (
          <S.FeatureItem>
            <CheckIcon size={20} weight="bold" />
            <span>Domínio customizado</span>
          </S.FeatureItem>
        )}
        {plan.features.removePoweredBy && (
          <S.FeatureItem>
            <CheckIcon size={20} weight="bold" />
            <span>Remover marca MenuXP</span>
          </S.FeatureItem>
        )}
        {plan.features.onlinePayment && (
          <S.FeatureItem>
            <CheckIcon size={20} weight="bold" />
            <span>Pagamento online</span>
          </S.FeatureItem>
        )}
        {plan.features.hasCoupons && (
          <S.FeatureItem>
            <CheckIcon size={20} weight="bold" />
            <span>{renderFeatureValue(plan.features.activeCoupons, 'cupons ativos')}</span>
          </S.FeatureItem>
        )}
        {plan.features.hasCampaigns && (
          <S.FeatureItem>
            <CheckIcon size={20} weight="bold" />
            <span>Campanhas de marketing</span>
          </S.FeatureItem>
        )}
        {plan.features.hasAdvancedAnalytics && (
          <S.FeatureItem>
            <CheckIcon size={20} weight="bold" />
            <span>Analytics avançado</span>
          </S.FeatureItem>
        )}
        {plan.features.maxStorage && (
          <S.FeatureItem>
            <CheckIcon size={20} weight="bold" />
            <span>{renderFeatureValue(plan.features.maxStorage, 'GB de armazenamento')}</span>
          </S.FeatureItem>
        )}
      </S.FeaturesSection>
    </S.CardContainer>
  )
}

PlanCard.displayName = 'PlanCard'
