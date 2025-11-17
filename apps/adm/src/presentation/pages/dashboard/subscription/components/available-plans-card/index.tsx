import { Button } from '@menuxp/ui'
import { CheckIcon, RocketLaunchIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetAvailablePlansUsecase } from '@/application/plans/get-available-plans.usecase'
import { CreateCheckoutSessionUsecase } from '@/application/subscriptions/create-checkout-session.usecase'
import { UpdateSubscriptionPlanUsecase } from '@/application/subscriptions/update-subscription-plan.usecase'
import type { Plan } from '@/domain/models/plan.model'
import type { BillingInterval } from '@/domain/models/subscription.model'

import * as S from './styles'

interface AvailablePlansCardProps {
  currentPlan: { code: string; name: string } | null | undefined
  hasActiveSubscription: boolean
  onPlanSelected: () => void
}

export const AvailablePlansCard = ({ currentPlan, hasActiveSubscription }: AvailablePlansCardProps) => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedInterval, setSelectedInterval] = useState<BillingInterval>('monthly')
  const [processingPlanCode, setProcessingPlanCode] = useState<string | null>(null)

  useEffect(() => {
    const loadPlans = async () => {
      setIsLoading(true)
      try {
        const usecase = new GetAvailablePlansUsecase()
        const data = await usecase.execute()
        setPlans(data.filter((plan) => plan.isActive))
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao carregar planos'
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    }
    loadPlans()
  }, [])

  const handleChangePlan = async (planCode: string, planName: string) => {
    const isUpgrade = currentPlan?.code === 'FREE'
    const actionText = isUpgrade ? 'upgrade' : 'mudança de plano'
    const confirmed = window.confirm(
      `Deseja realmente fazer ${actionText} para o plano ${planName}?\n\n` +
        `${isUpgrade ? 'Você será cobrado imediatamente.' : 'O valor será ajustado proporcionalmente.'}`
    )
    if (!confirmed) return
    setProcessingPlanCode(planCode)
    try {
      const usecase = new UpdateSubscriptionPlanUsecase()
      const response = await usecase.execute({ planCode })
      toast.success(response.message)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao alterar plano'
      toast.error(message)
      setProcessingPlanCode(null)
    }
  }

  const handleFirstSubscription = async (planCode: string) => {
    setProcessingPlanCode(planCode)
    try {
      const usecase = new CreateCheckoutSessionUsecase()
      const { url } = await usecase.execute({
        planCode,
        billingCycle: selectedInterval
      })
      window.location.href = url
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao iniciar checkout'
      toast.error(message)
      setProcessingPlanCode(null)
    }
  }

  const handleSelectPlan = (plan: Plan) => {
    if (hasActiveSubscription) {
      handleChangePlan(plan.code, plan.name)
    } else {
      handleFirstSubscription(plan.code)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(price)
  }

  const calculateYearlyPrice = (plan: Plan) => {
    const yearlyPrice = plan.price * 12
    const discount = (yearlyPrice * plan.yearlyDiscount) / 100
    return yearlyPrice - discount
  }

  const getDisplayPrice = (plan: Plan) => {
    if (selectedInterval === 'monthly') {
      return formatPrice(plan.price, plan.currency)
    }
    return formatPrice(calculateYearlyPrice(plan) / 12, plan.currency)
  }

  if (isLoading) {
    return (
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>Planos Disponíveis</S.CardTitle>
        </S.CardHeader>
        <S.CardBody>
          <S.LoadingText>Carregando planos...</S.LoadingText>
        </S.CardBody>
      </S.Card>
    )
  }

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Planos Disponíveis</S.CardTitle>
        <S.IntervalToggle>
          <S.IntervalButton
            $isActive={selectedInterval === 'monthly'}
            onClick={() => setSelectedInterval('monthly')}
            aria-label="Cobrança mensal"
          >
            Mensal
          </S.IntervalButton>
          <S.IntervalButton
            $isActive={selectedInterval === 'yearly'}
            onClick={() => setSelectedInterval('yearly')}
            aria-label="Cobrança anual"
          >
            Anual
          </S.IntervalButton>
        </S.IntervalToggle>
      </S.CardHeader>
      <S.CardBody>
        <S.PlansGrid>
          {plans.map((plan) => {
            const isCurrentPlan = currentPlan?.code === plan.code
            const hasYearlyDiscount = plan.yearlyDiscount > 0 && selectedInterval === 'yearly'
            return (
              <S.PlanCard key={plan.id} $isCurrent={isCurrentPlan}>
                {hasYearlyDiscount && <S.DiscountBadge>-{plan.yearlyDiscount}%</S.DiscountBadge>}
                <S.PlanHeader>
                  <S.PlanName>{plan.name}</S.PlanName>
                  {plan.description && <S.PlanDescription>{plan.description}</S.PlanDescription>}
                </S.PlanHeader>
                <S.PlanPrice>
                  {getDisplayPrice(plan)}
                  <S.PlanInterval>/mês</S.PlanInterval>
                </S.PlanPrice>
                {selectedInterval === 'yearly' && (
                  <S.YearlyTotal>Total anual: {formatPrice(calculateYearlyPrice(plan), plan.currency)}</S.YearlyTotal>
                )}
                <S.FeaturesList>
                  {plan.features.menuItems !== null && (
                    <S.FeatureItem>
                      <CheckIcon size={16} weight="bold" />
                      <span>
                        {plan.features.menuItems === -1 ? 'Itens ilimitados' : `${plan.features.menuItems} itens`}
                      </span>
                    </S.FeatureItem>
                  )}
                  {plan.features.monthlyOrders !== null && (
                    <S.FeatureItem>
                      <CheckIcon size={16} weight="bold" />
                      <span>
                        {plan.features.monthlyOrders === -1
                          ? 'Pedidos ilimitados'
                          : `${plan.features.monthlyOrders} pedidos/mês`}
                      </span>
                    </S.FeatureItem>
                  )}
                  <S.FeatureItem>
                    <CheckIcon size={16} weight="bold" />
                    <span>{plan.features.staffMembers} membros da equipe</span>
                  </S.FeatureItem>
                  <S.FeatureItem>
                    <CheckIcon size={16} weight="bold" />
                    <span>{plan.features.menuLayouts} layouts de cardápio</span>
                  </S.FeatureItem>
                  {plan.features.customDomain && (
                    <S.FeatureItem>
                      <CheckIcon size={16} weight="bold" />
                      <span>Domínio personalizado</span>
                    </S.FeatureItem>
                  )}
                  {plan.features.removePoweredBy && (
                    <S.FeatureItem>
                      <CheckIcon size={16} weight="bold" />
                      <span>Remover marca MenuXP</span>
                    </S.FeatureItem>
                  )}
                  {plan.features.onlinePayment && (
                    <S.FeatureItem>
                      <CheckIcon size={16} weight="bold" />
                      <span>Pagamento online</span>
                    </S.FeatureItem>
                  )}
                  {plan.features.hasCoupons && (
                    <S.FeatureItem>
                      <CheckIcon size={16} weight="bold" />
                      <span>
                        {plan.features.activeCoupons === -1
                          ? 'Cupons ilimitados'
                          : `${plan.features.activeCoupons} cupons ativos`}
                      </span>
                    </S.FeatureItem>
                  )}
                  {plan.features.hasAdvancedAnalytics && (
                    <S.FeatureItem>
                      <CheckIcon size={16} weight="bold" />
                      <span>Análises avançadas</span>
                    </S.FeatureItem>
                  )}
                </S.FeaturesList>
                <S.PlanAction>
                  {isCurrentPlan ? (
                    <Button variant="outline" size="md" disabled fullWidth>
                      Plano Atual
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      leftIcon={<RocketLaunchIcon size={16} />}
                      onClick={() => handleSelectPlan(plan)}
                      isLoading={processingPlanCode === plan.code}
                      disabled={processingPlanCode !== null}
                      fullWidth
                    >
                      {hasActiveSubscription ? 'Mudar para este Plano' : 'Selecionar Plano'}
                    </Button>
                  )}
                </S.PlanAction>
              </S.PlanCard>
            )
          })}
        </S.PlansGrid>
      </S.CardBody>
    </S.Card>
  )
}
