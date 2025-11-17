import { Button } from '@menuxp/ui'
import { CheckCircleIcon, CreditCardIcon, WarningCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { CancelSubscriptionUsecase } from '@/application/subscriptions/cancel-subscription.usecase'
import { CreateBillingPortalSessionUsecase } from '@/application/subscriptions/create-billing-portal-session.usecase'
import type { SubscriptionViewModel } from '@/domain/models/subscription.model'

import * as S from './styles'

interface CurrentSubscriptionCardProps {
  subscription: SubscriptionViewModel | null
  onUpdate: () => void
}

export const CurrentSubscriptionCard = ({ subscription, onUpdate }: CurrentSubscriptionCardProps) => {
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)
  const [isLoadingCancel, setIsLoadingCancel] = useState(false)

  const handleOpenBillingPortal = async () => {
    setIsLoadingPortal(true)
    try {
      const usecase = new CreateBillingPortalSessionUsecase()
      const { url } = await usecase.execute()
      window.location.href = url
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao abrir portal de pagamento'
      toast.error(message)
      setIsLoadingPortal(false)
    }
  }

  const handleCancelSubscription = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja cancelar sua assinatura? Você ainda terá acesso até o final do período atual.'
    )
    if (!confirmed) return
    setIsLoadingCancel(true)
    try {
      const usecase = new CancelSubscriptionUsecase()
      await usecase.execute()
      toast.success('Assinatura cancelada com sucesso')
      onUpdate()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao cancelar assinatura'
      toast.error(message)
    } finally {
      setIsLoadingCancel(false)
    }
  }

  const getStatusBadge = () => {
    if (!subscription?.subscription) {
      return (
        <S.StatusBadge $status="none">
          <WarningCircleIcon size={16} />
          <span>Sem Assinatura</span>
        </S.StatusBadge>
      )
    }
    const status = subscription.subscription.status
    const statusConfig = {
      active: { icon: <CheckCircleIcon size={16} />, label: 'Ativa', color: 'active' as const },
      trialing: { icon: <CheckCircleIcon size={16} />, label: 'Teste Grátis', color: 'active' as const },
      canceled: { icon: <XCircleIcon size={16} />, label: 'Cancelada', color: 'canceled' as const },
      past_due: { icon: <WarningCircleIcon size={16} />, label: 'Pagamento Atrasado', color: 'warning' as const },
      unpaid: { icon: <WarningCircleIcon size={16} />, label: 'Não Pago', color: 'warning' as const },
      incomplete: { icon: <WarningCircleIcon size={16} />, label: 'Incompleta', color: 'warning' as const }
    }
    const config = statusConfig[status] || statusConfig.incomplete
    return (
      <S.StatusBadge $status={config.color}>
        {config.icon}
        <span>{config.label}</span>
      </S.StatusBadge>
    )
  }

  const formatDate = (date: Date | null) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(price)
  }

  if (!subscription?.plan) {
    return (
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>Assinatura Atual</S.CardTitle>
          {getStatusBadge()}
        </S.CardHeader>
        <S.CardBody>
          <S.EmptyState>
            <S.EmptyStateIcon>
              <CreditCardIcon size={48} />
            </S.EmptyStateIcon>
            <S.EmptyStateTitle>Nenhuma assinatura ativa</S.EmptyStateTitle>
            <S.EmptyStateText>
              Você está usando o plano gratuito. Escolha um plano abaixo para desbloquear recursos premium.
            </S.EmptyStateText>
          </S.EmptyState>
        </S.CardBody>
      </S.Card>
    )
  }

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Assinatura Atual</S.CardTitle>
        {getStatusBadge()}
      </S.CardHeader>
      <S.CardBody>
        <S.PlanInfo>
          <S.PlanName>{subscription.plan.name}</S.PlanName>
          <S.PlanPrice>
            {formatPrice(subscription.plan.price, subscription.plan.currency)}
            <S.PlanInterval>/{subscription.subscription?.billingCycle === 'yearly' ? 'ano' : 'mês'}</S.PlanInterval>
          </S.PlanPrice>
        </S.PlanInfo>
        {subscription.nextBillingDate && (
          <S.InfoRow>
            <S.InfoLabel>Próxima cobrança:</S.InfoLabel>
            <S.InfoValue>{formatDate(subscription.nextBillingDate)}</S.InfoValue>
          </S.InfoRow>
        )}
        {subscription.subscription?.cancelAtPeriodEnd && (
          <S.WarningBox>
            <WarningCircleIcon size={20} />
            <S.WarningText>
              Sua assinatura será cancelada em {formatDate(subscription.subscription.currentPeriodEnd)}
            </S.WarningText>
          </S.WarningBox>
        )}
        <S.Actions>
          {subscription.canCancel && !subscription.subscription?.cancelAtPeriodEnd && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<XCircleIcon size={16} />}
              onClick={handleCancelSubscription}
              isLoading={isLoadingCancel}
              disabled={isLoadingCancel || isLoadingPortal}
            >
              Cancelar Assinatura
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            leftIcon={<CreditCardIcon size={16} />}
            onClick={handleOpenBillingPortal}
            isLoading={isLoadingPortal}
            disabled={isLoadingPortal || isLoadingCancel}
          >
            Gerenciar Pagamento
          </Button>
        </S.Actions>
      </S.CardBody>
    </S.Card>
  )
}
