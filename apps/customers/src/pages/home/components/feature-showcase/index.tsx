import { LightningIcon, TargetIcon, TrendUpIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'

import { Tabs } from '@/components/ui/tabs'

import * as S from './styles'

interface Feature {
  icon: React.ReactNode
  text: string
}

interface TabContent {
  title: string
  description: string
  badges: Array<{
    text: string
    variant: 'success' | 'info' | 'warning' | 'neutral'
  }>
}

const FeatureShowcase: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <LightningIcon size={20} weight="fill" />,
      text: 'Criação de campanhas em 1 clique'
    },
    {
      icon: <TargetIcon size={20} weight="fill" />,
      text: 'Sugeridos por dados de consumo'
    },
    {
      icon: <TrendUpIcon size={20} weight="fill" />,
      text: 'Medição de impacto (receita, ticket médio)'
    }
  ]

  const missionsContent: TabContent[] = [
    {
      title: 'Aumentar ticket médio em 12%',
      description: 'Sugestão: combo Burger + Bebida com 10% off.',
      badges: [{ text: 'Alta conversão esperada', variant: 'success' }]
    },
    {
      title: 'Recuperar clientes inativos',
      description: 'Envie cupom de 20% para quem não compra há 30 dias.',
      badges: [{ text: '23 clientes elegíveis', variant: 'info' }]
    },
    {
      title: 'Turistas na região',
      description: 'Habilite cardápio EN/ES e destaque pratos locais.',
      badges: [{ text: 'Sazonalidade detectada', variant: 'warning' }]
    }
  ]

  const campaignsContent: TabContent[] = [
    {
      title: 'Semana do Cliente',
      description: 'Meta: +15% de receita. Orçamento sugerido: R$ 200 em tráfego local.',
      badges: [
        { text: 'Ativa', variant: 'success' },
        { text: '3 dias restantes', variant: 'neutral' }
      ]
    },
    {
      title: 'Dia da Pizza',
      description: 'Criar banner e ativar cupom PIZZA10 (18h–21h).',
      badges: [{ text: 'Agendada', variant: 'info' }]
    }
  ]

  const couponsContent: TabContent[] = [
    {
      title: 'GAME1000',
      description: 'Liberado via mini-jogo (1000 pontos) → 20% off próxima compra.',
      badges: [
        { text: '47 liberados hoje', variant: 'warning' },
        { text: '73% conversão', variant: 'success' }
      ]
    },
    {
      title: 'BOASVINDAS',
      description: '15% off para primeira compra (canal próprio).',
      badges: [{ text: 'Sempre ativo', variant: 'info' }]
    }
  ]

  const tabs = [
    {
      id: 'missions',
      label: 'Missões',
      content: (
        <S.TabContent>
          {missionsContent.map((item, index) => (
            <S.TabCard key={index}>
              <S.TabCardTitle>{item.title}</S.TabCardTitle>
              <S.TabCardDescription>{item.description}</S.TabCardDescription>
              <S.TabCardBadges>
                {item.badges.map((badge, badgeIndex) => (
                  <S.TabCardBadge key={badgeIndex} $variant={badge.variant}>
                    {badge.text}
                  </S.TabCardBadge>
                ))}
              </S.TabCardBadges>
            </S.TabCard>
          ))}
        </S.TabContent>
      )
    },
    {
      id: 'campaigns',
      label: 'Campanhas',
      content: (
        <S.TabContent>
          {campaignsContent.map((item, index) => (
            <S.TabCard key={index}>
              <S.TabCardTitle>{item.title}</S.TabCardTitle>
              <S.TabCardDescription>{item.description}</S.TabCardDescription>
              <S.TabCardBadges>
                {item.badges.map((badge, badgeIndex) => (
                  <S.TabCardBadge key={badgeIndex} $variant={badge.variant}>
                    {badge.text}
                  </S.TabCardBadge>
                ))}
              </S.TabCardBadges>
            </S.TabCard>
          ))}
        </S.TabContent>
      )
    },
    {
      id: 'coupons',
      label: 'Cupons',
      content: (
        <S.TabContent>
          {couponsContent.map((item, index) => (
            <S.TabCard key={index}>
              <S.TabCardTitle>{item.title}</S.TabCardTitle>
              <S.TabCardDescription>{item.description}</S.TabCardDescription>
              <S.TabCardBadges>
                {item.badges.map((badge, badgeIndex) => (
                  <S.TabCardBadge key={badgeIndex} $variant={badge.variant}>
                    {badge.text}
                  </S.TabCardBadge>
                ))}
              </S.TabCardBadges>
            </S.TabCard>
          ))}
        </S.TabContent>
      )
    }
  ]

  return (
    <S.FeatureShowcaseSection id="gamificacao">
      <S.FeatureShowcaseContainer>
        <S.FeatureShowcaseGrid>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.FeatureShowcaseHeader>
              <S.FeatureShowcaseTitle>IA + Gamificação</S.FeatureShowcaseTitle>
              <S.FeatureShowcaseDescription>
                Deixe a inteligência artificial analisar o comportamento de seus consumidores e sugerir campanhas
                personalizadas. Criamos missões de marketing gamificadas que impulsionam vendas de forma estratégica e
                divertida.
              </S.FeatureShowcaseDescription>
            </S.FeatureShowcaseHeader>
            <S.FeaturesList>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <S.FeatureItem>
                    <S.FeatureIcon>{feature.icon}</S.FeatureIcon>
                    <S.FeatureText>{feature.text}</S.FeatureText>
                  </S.FeatureItem>
                </motion.div>
              ))}
            </S.FeaturesList>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs tabs={tabs} defaultValue="missions" />
          </motion.div>
        </S.FeatureShowcaseGrid>
      </S.FeatureShowcaseContainer>
    </S.FeatureShowcaseSection>
  )
}

export default FeatureShowcase
