import { motion } from 'framer-motion'
import React from 'react'

import { Accordion } from '@/components/ui/accordion'

import * as S from './styles'

const FAQ: React.FC = () => {
  const faqItems = [
    {
      title: 'A MenuXP cobra taxa por pedido?',
      content: <div>Não. Trabalhamos com assinatura fixa por plano. Sem taxa por pedido.</div>
    },
    {
      title: 'O cliente precisa se cadastrar no App',
      content: <div>Não. O cliente só informa nome e WhatsApp no checkout.</div>
    },
    {
      title: 'Funciona em vários idiomas?',
      content: (
        <div>Sim. O app é multi-idiomas e também geramos cardápios para impressão em outros idiomas com QR Code.</div>
      )
    },
    {
      title: 'Os mini-jogos são obrigatórios?',
      content: (
        <div>
          Não, mas recomendamos. Eles aumentam o engajamento e podem liberar cupons com metas definidas por você.
        </div>
      )
    },
    {
      title: 'Preciso instalar algum aplicativo?',
      content: <div>Não, tanto cliente quanto estabelecimento acessam via navegador.</div>
    }
  ]

  return (
    <S.FAQSection id="faq">
      <S.FAQContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <S.SectionHeader>
            <S.SectionTitle>Perguntas Frequentes</S.SectionTitle>
            <S.SectionDescription>Esclarecemos as principais dúvidas sobre a MenuXP</S.SectionDescription>
          </S.SectionHeader>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </S.FAQContainer>
    </S.FAQSection>
  )
}

export default FAQ
