import { motion } from 'framer-motion'
import React from 'react'
import Accordion from './Accordion'

// To-Do: Refatorar styles and remove tailwind
const FAQ: React.FC = () => {
  const faqItems = [
    {
      title: 'A MenuXP cobra taxa por pedido?',
      content: (
        <div className="pt-3 sm:pt-4 leading-relaxed">
          Não. Trabalhamos com assinatura fixa por plano. Sem taxa por pedido.
        </div>
      )
    },
    {
      title: 'O cliente precisa se cadastrar no App',
      content: (
        <div className="pt-3 sm:pt-4 leading-relaxed">Não. O cliente só informa nome e WhatsApp no checkout.</div>
      )
    },
    {
      title: 'Funciona em vários idiomas?',
      content: (
        <div className="pt-3 sm:pt-4 leading-relaxed">
          Sim. O app é multi-idiomas e também geramos cardápios para impressão em outros idiomas com QR Code.
        </div>
      )
    },
    {
      title: 'Os mini-jogos são obrigatórios?',
      content: (
        <div className="pt-3 sm:pt-4 leading-relaxed">
          Não, mas recomendamos. Eles aumentam o engajamento e podem liberar cupons com metas definidas por você.
        </div>
      )
    },
    {
      title: 'Preciso instalar algum aplicativo?',
      content: (
        <div className="pt-3 sm:pt-4 leading-relaxed">
          Não, tanto cliente quanto estabelecimento acessam via navegador.
        </div>
      )
    }
  ]

  return (
    <section id="faq" className="bg-gray-50 py-20 w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-title text-3xl sm:text-4xl font-regular text-black mb-4">Perguntas Frequentes</h2>
          <p className="font-body text-lg text-gray-600">Esclarecemos as principais dúvidas sobre a MenuXP</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
