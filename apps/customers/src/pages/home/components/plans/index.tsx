import { getPlans } from '@/services/plan/get-plans'
import { PlanGrid } from '@menuxp/ui'
import { motion } from 'framer-motion'
import React from 'react'

import * as S from './styles'

const Plans: React.FC = () => {
  const [plans, setPlans] = React.useState<Awaited<ReturnType<typeof getPlans>>>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [showYearly, setShowYearly] = React.useState(false)

  React.useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getPlans()
        setPlans(data.filter((plan) => plan.isActive))
      } catch (err) {
        console.error('Failed to load plans:', err)
        setError('Não foi possível carregar os planos. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  const handlePlanCTAClick = () => {
    window.location.href = `${import.meta.env.VITE_ADM_FRONTEND}/register`
  }

  if (loading) {
    return (
      <S.PlansSection id="planos">
        <S.Container>
          <S.SectionHeader>
            <S.Title>Escolha o Plano Ideal para Seu Negócio</S.Title>
            <S.Description>
              Planos flexíveis que crescem com seu restaurante. Sem taxas ocultas, cancele quando quiser.
            </S.Description>
          </S.SectionHeader>
          <S.LoadingState>Carregando planos...</S.LoadingState>
        </S.Container>
      </S.PlansSection>
    )
  }

  if (error) {
    return (
      <S.PlansSection id="planos">
        <S.Container>
          <S.SectionHeader>
            <S.Title>Escolha o Plano Ideal para Seu Negócio</S.Title>
            <S.Description>
              Planos flexíveis que crescem com seu restaurante. Sem taxas ocultas, cancele quando quiser.
            </S.Description>
          </S.SectionHeader>
          <S.ErrorState>{error}</S.ErrorState>
        </S.Container>
      </S.PlansSection>
    )
  }

  if (plans.length === 0) {
    return null
  }

  return (
    <S.PlansSection id="planos">
      <S.Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <S.SectionHeader>
            <S.Title>Escolha o Plano Ideal para Seu Negócio</S.Title>
            <S.Description>
              Planos flexíveis que crescem com seu restaurante. Sem taxas ocultas, cancele quando quiser.
            </S.Description>
          </S.SectionHeader>
          <S.BillingToggle>
            <S.ToggleButton $active={!showYearly} onClick={() => setShowYearly(false)}>
              Mensal
            </S.ToggleButton>
            <S.ToggleButton $active={showYearly} onClick={() => setShowYearly(true)}>
              Anual
              <S.SaveBadge>15%</S.SaveBadge>
            </S.ToggleButton>
          </S.BillingToggle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PlanGrid plans={plans} onPlanSelect={handlePlanCTAClick} showYearlyPrice={showYearly} context="public" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <S.FooterNote>
            Todos os planos incluem suporte dedicado e atualizações gratuitas. Comece com 14 dias de teste grátis.
          </S.FooterNote>
        </motion.div>
      </S.Container>
    </S.PlansSection>
  )
}

export default Plans
