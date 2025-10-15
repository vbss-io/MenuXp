import { ChatCircleIcon, CreditCardIcon, GlobeIcon, MedalIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'

import * as S from './styles'

interface TrustItem {
  icon: React.ReactNode
  text: string
}

const TrustBar: React.FC = () => {
  const trustItems: TrustItem[] = [
    {
      icon: <CreditCardIcon size={20} weight="fill" />,
      text: 'Sem taxas por pedido'
    },
    {
      icon: <MedalIcon size={20} weight="fill" />,
      text: 'Whitelabel'
    },
    {
      icon: <GlobeIcon size={20} weight="fill" />,
      text: 'Multi-idiomas'
    },
    {
      icon: <ChatCircleIcon size={20} weight="fill" />,
      text: 'Status via WhatsApp/SMS'
    }
  ]

  return (
    <S.TrustBarSection>
      <S.TrustBarContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <S.TrustItemsContainer>
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <S.TrustItem>
                  <S.TrustIcon>{item.icon}</S.TrustIcon>
                  <S.TrustText>{item.text}</S.TrustText>
                </S.TrustItem>
              </motion.div>
            ))}
          </S.TrustItemsContainer>
        </motion.div>
      </S.TrustBarContainer>
    </S.TrustBarSection>
  )
}

export default TrustBar
