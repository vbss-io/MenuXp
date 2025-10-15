import { QuestionIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'

import LeadForm from '@/pages/home/components/lead-form'

import * as S from './styles'

const CTASection: React.FC = () => {
  const handleScrollTo = (target: string) => {
    const element = document.querySelector(target)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <S.CTASection id="demo">
      <S.CTAContainer>
        <S.CTAGrid>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.ContentColumn>
              <S.Title>Pronto para assumir o controle das suas vendas?</S.Title>
              <S.Description>
                Pare de pagar taxas abusivas, padronize seu atendimento e aumente sua receita com uma plataforma que
                realmente trabalha para você. Descubra como a MenuXP pode transformar seu negócio.
              </S.Description>
              <S.ButtonsContainer>
                {/* <S.PrimaryButton onClick={() => handleScrollTo('#contato')}>
                  <ChatCircleIcon size={20} weight="bold" />
                  Falar com consultor
                </S.PrimaryButton> */}
                <S.SecondaryButton onClick={() => handleScrollTo('#faq')}>
                  <QuestionIcon size={20} weight="bold" />
                  Tirar dúvidas
                </S.SecondaryButton>
              </S.ButtonsContainer>
              <S.StatsContainer>
                <S.StatItem>
                  <S.StatValue>0%</S.StatValue>
                  <S.StatLabel>Taxa por pedido</S.StatLabel>
                </S.StatItem>
                <S.StatItem>
                  <S.StatValue>100%</S.StatValue>
                  <S.StatLabel>Controle da marca</S.StatLabel>
                </S.StatItem>
                <S.StatItem>
                  <S.StatValue>24h</S.StatValue>
                  <S.StatLabel>Setup completo</S.StatLabel>
                </S.StatItem>
              </S.StatsContainer>
            </S.ContentColumn>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LeadForm />
          </motion.div>
        </S.CTAGrid>
      </S.CTAContainer>
    </S.CTASection>
  )
}

export default CTASection
