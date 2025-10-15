import { BrainIcon, GameControllerIcon, GearIcon, GlobeIcon, PaletteIcon, QrCodeIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'

import * as S from './styles'

interface ValueCard {
  icon: React.ReactNode
  title: string
  description: string
}

const ValueProps: React.FC = () => {
  const cards: ValueCard[] = [
    {
      icon: <QrCodeIcon size={32} weight="fill" />,
      title: 'Pedido sem login',
      description: 'Cliente compra por QR Code ou URL. No checkout, apenas nome e WhatsApp.'
    },
    {
      icon: <PaletteIcon size={32} weight="fill" />,
      title: 'Whitelabel de verdade',
      description: 'App com sua identidade visual: cores, logo, banners e muito mais para que seu app seja único.'
    },
    {
      icon: <GlobeIcon size={32} weight="fill" />,
      title: 'Multi-idiomas',
      description: 'Digital e impressão: atenda turistas e amplie alcance.'
    },
    {
      icon: <GearIcon size={32} weight="fill" />,
      title: 'Gestão Completa',
      description: 'Pedidos em tempo real: Recebido, confirmado, em produção, pronto, saiu para entrega e entregue.'
    },
    {
      icon: <GameControllerIcon size={32} weight="fill" />,
      title: 'Mini-jogos com cupons',
      description: 'Engaje clientes enquanto esperam e aumente o ticket médio.'
    },
    {
      icon: <BrainIcon size={32} weight="fill" />,
      title: 'IA + Gamificação',
      description: 'Missões de marketing com base em dados para impulsionar sua receita.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <S.ValuePropsSection id="features">
      <S.ValuePropsContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <S.ValuePropsHeader>
            <S.ValuePropsTitle>Tudo que você precisa para vender mais</S.ValuePropsTitle>
            <S.ValuePropsDescription>
              Uma plataforma única para cardápio digital, gestão de pedidos e crescimento com dados.
            </S.ValuePropsDescription>
          </S.ValuePropsHeader>
        </motion.div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <S.ValueCardsGrid>
            {cards.map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <S.ValueCard>
                  <S.ValueCardHeader>
                    <S.ValueCardIcon>{card.icon}</S.ValueCardIcon>
                    <S.ValueCardTitle>{card.title}</S.ValueCardTitle>
                  </S.ValueCardHeader>
                  <S.ValueCardDescription>{card.description}</S.ValueCardDescription>
                </S.ValueCard>
              </motion.div>
            ))}
          </S.ValueCardsGrid>
        </motion.div>
      </S.ValuePropsContainer>
    </S.ValuePropsSection>
  )
}

export default ValueProps
