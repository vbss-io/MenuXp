import { motion } from 'framer-motion'
import { BarChart, Clock, Gift } from 'lucide-react'
import React from 'react'

// To-Do: Refatorar styles and remove tailwind
const Analytics: React.FC = () => {
  const chips = [
    { label: 'Ticket médio', icon: <BarChart className="w-4 h-4" /> },
    { label: 'Tempo de preparo', icon: <Clock className="w-4 h-4" /> },
    { label: 'Conversão de cupons', icon: <Gift className="w-4 h-4" /> }
  ]

  const metrics = [
    {
      value: '+18%',
      label: 'Ticket médio em 30 dias',
      color: 'text-green-600'
    },
    {
      value: '-22%',
      label: 'Tempo médio de preparo',
      color: 'text-blue-600'
    },
    {
      value: '37%',
      label: 'Conversão de cupons',
      color: 'text-purple-600'
    },
    {
      value: 'x2,1',
      label: 'Frequência de compra',
      color: 'text-orange-600'
    }
  ]

  return (
    <section className="bg-white py-20 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-title text-3xl sm:text-4xl font-regular text-black mb-6">
              Dashboard com métricas da operação
            </h3>
            <p className="font-body text-lg text-gray-600 mb-8">
              Acompanhe em tempo real as métricas que realmente importam: ticket médio, desempenho dos pratos, tempo de
              preparo e impacto das campanhas e cupons. Dados claros para decisões inteligentes.
            </p>

            <div className="flex flex-wrap gap-3">
              {chips.map((chip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="chip"
                >
                  {chip.icon}
                  {chip.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Metrics Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="brut-card p-8 bg-white">
              <h4 className="font-title text-xl font-bold text-center mb-8">Resultados dos últimos 30 dias</h4>

              <div className="grid grid-cols-2 gap-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className={`text-3xl font-bold mb-2 ${metric.color}`}>{metric.value}</div>
                    <div className="font-body text-sm text-gray-600">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 text-center">
                  <strong>💡 Insight:</strong> Campanhas com gamificação geraram 43% mais engajamento que promoções
                  tradicionais.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Analytics
