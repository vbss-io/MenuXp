import { motion } from 'framer-motion'
import { HelpCircle, MessageCircle } from 'lucide-react'
import React from 'react'
import LeadForm from './LeadForm'

const CTASection: React.FC = () => {
  const handleScrollTo = (target: string) => {
    const element = document.querySelector(target)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section id="demo" className="bg-[var(--mx-red)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h3 className="font-title text-3xl sm:text-4xl lg:text-5xl font-regular mb-6">
              Pronto para assumir o controle das suas vendas?
            </h3>
            <p className="font-body text-lg lg:text-xl mb-8 opacity-90">
              Pare de pagar taxas abusivas, padronize seu atendimento e aumente sua receita com uma plataforma que
              realmente trabalha para você. Descubra como a MenuXP pode transformar seu negócio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => handleScrollTo('#contato')} className="btn-brut white">
                <MessageCircle className="w-5 h-5" />
                Falar com consultor
              </button>
              <button onClick={() => handleScrollTo('#faq')} className="btn-brut">
                <HelpCircle className="w-5 h-5" />
                Tirar dúvidas
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">0%</div>
                <div className="text-sm opacity-80">Taxa por pedido</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">Controle da marca</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24h</div>
                <div className="text-sm opacity-80">Setup completo</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LeadForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
