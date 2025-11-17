import { Button, Loading } from '@menuxp/ui'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

import { GetCurrentSubscriptionUsecase } from '@/application/subscriptions/get-current-subscription.usecase'
import type { SubscriptionViewModel } from '@/domain/models/subscription.model'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'

import * as S from '../styles'
import { AvailablePlansCard } from './components/available-plans-card'
import { CurrentSubscriptionCard } from './components/current-subscription-card'
import { InvoicesList } from './components/invoices-list'

export const SubscriptionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [subscription, setSubscription] = useState<SubscriptionViewModel | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadSubscription = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const usecase = new GetCurrentSubscriptionUsecase()
      const data = await usecase.execute()
      setSubscription(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar assinatura'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')
    if (success === 'true') {
      toast.success('Checkout realizado com sucesso! Sua assinatura será ativada em breve.')
      searchParams.delete('success')
      setSearchParams(searchParams, { replace: true })
    }
    if (canceled === 'true') {
      toast('Checkout cancelado. Você pode tentar novamente quando quiser.', {
        icon: 'ℹ️'
      })
      searchParams.delete('canceled')
      setSearchParams(searchParams, { replace: true })
    }
    loadSubscription()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
      </S.Container>
    )
  }

  if (error && !subscription) {
    return (
      <S.Container>
        <Breadcrumb lastPath="Assinatura" />
        <S.EmptyState>
          <S.EmptyStateTitle>Erro ao carregar assinatura</S.EmptyStateTitle>
          <S.EmptyStateDescription>{error}</S.EmptyStateDescription>
          <Button onClick={loadSubscription}>Tentar novamente</Button>
        </S.EmptyState>
      </S.Container>
    )
  }

  const hasActiveSubscription = subscription?.plan?.code !== 'FREE'

  return (
    <S.Container>
      <Breadcrumb lastPath="Assinatura" />
      <S.Header>
        <S.Title>Gerenciar Assinatura</S.Title>
      </S.Header>
      <S.Content>
        <CurrentSubscriptionCard subscription={subscription} onUpdate={loadSubscription} />
        {subscription?.invoices && subscription.invoices.length > 0 && (
          <InvoicesList invoices={subscription.invoices} />
        )}
        <AvailablePlansCard
          currentPlan={subscription?.plan ?? null}
          hasActiveSubscription={hasActiveSubscription}
          onPlanSelected={loadSubscription}
        />
      </S.Content>
    </S.Container>
  )
}
