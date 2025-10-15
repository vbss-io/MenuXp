import { ChartBarIcon, ClockIcon, GiftIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'

import * as S from './styles'

const Analytics: React.FC = () => {
  const chips = [
    { label: 'Ticket médio', icon: <ChartBarIcon size={16} weight="fill" /> },
    { label: 'Tempo de preparo', icon: <ClockIcon size={16} weight="fill" /> },
    { label: 'Conversão de cupons', icon: <GiftIcon size={16} weight="fill" /> }
  ]

  const metrics = [
    {
      value: '+18%',
      label: 'Ticket médio em 30 dias',
      color: 'green'
    },
    {
      value: '-22%',
      label: 'Tempo médio de preparo',
      color: 'blue'
    },
    {
      value: '37%',
      label: 'Conversão de cupons',
      color: 'purple'
    },
    {
      value: 'x2,1',
      label: 'Frequência de compra',
      color: 'orange'
    }
  ]

  return (
    <S.AnalyticsSection>
      <S.AnalyticsContainer>
        <S.AnalyticsGrid>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.ContentHeader>
              <S.Title>Dashboard com métricas da operação</S.Title>
              <S.Description>
                Acompanhe em tempo real as métricas que realmente importam: ticket médio, desempenho dos pratos, tempo
                de preparo e impacto das campanhas e cupons. Dados claros para decisões inteligentes.
              </S.Description>
            </S.ContentHeader>
            <S.ChipsContainer>
              {chips.map((chip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <S.Chip>
                    {chip.icon}
                    {chip.label}
                  </S.Chip>
                </motion.div>
              ))}
            </S.ChipsContainer>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <S.MetricsCard>
              <S.CardTitle>Resultados dos últimos 30 dias</S.CardTitle>
              <S.MetricsGrid>
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <S.MetricCard>
                      <S.MetricValue $color={metric.color}>{metric.value}</S.MetricValue>
                      <S.MetricLabel>{metric.label}</S.MetricLabel>
                    </S.MetricCard>
                  </motion.div>
                ))}
              </S.MetricsGrid>
              <S.InsightCard>
                <S.InsightText>
                  <strong>💡 Insight:</strong> Campanhas com gamificação geraram 43% mais engajamento que promoções
                  tradicionais.
                </S.InsightText>
              </S.InsightCard>
            </S.MetricsCard>
          </motion.div>
        </S.AnalyticsGrid>
      </S.AnalyticsContainer>
    </S.AnalyticsSection>
  )
}

export default Analytics
