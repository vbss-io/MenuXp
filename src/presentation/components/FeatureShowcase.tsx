import { motion } from 'framer-motion'
import { Target, TrendingUp, Zap } from 'lucide-react'
import React from 'react'
import Tabs from './ui/Tabs'

const FeatureShowcase: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      text: 'Criação de campanhas em 1 clique'
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: 'Sugeridos por dados de consumo'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: 'Medição de impacto (receita, ticket médio)'
    }
  ]

  const missionsContent = (
    <div className="space-y-4">
      <div className="brut-card p-4">
        <h4 className="font-body font-semibold mb-2">Aumentar ticket médio em 12%</h4>
        <p className="text-sm text-gray-600 mb-2">Sugestão: combo Burger + Bebida com 10% off.</p>
        <span className="brut-badge bg-green-100 text-green-700">Alta conversão esperada</span>
      </div>
      <div className="brut-card p-4">
        <h4 className="font-body font-semibold mb-2">Recuperar clientes inativos</h4>
        <p className="text-sm text-gray-600 mb-2">Envie cupom de 20% para quem não compra há 30 dias.</p>
        <span className="brut-badge bg-blue-100 text-blue-700">23 clientes elegíveis</span>
      </div>
      <div className="brut-card p-4">
        <h4 className="font-body font-semibold mb-2">Turistas na região</h4>
        <p className="text-sm text-gray-600 mb-2">Habilite cardápio EN/ES e destaque pratos locais.</p>
        <span className="brut-badge bg-yellow-100 text-yellow-700">Sazonalidade detectada</span>
      </div>
    </div>
  )

  const campaignsContent = (
    <div className="space-y-4">
      <div className="brut-card p-4">
        <h4 className="font-body font-semibold mb-2">Semana do Cliente</h4>
        <p className="text-sm text-gray-600 mb-2">
          Meta: +15% de receita. Orçamento sugerido: R$ 200 em tráfego local.
        </p>
        <div className="flex gap-2">
          <span className="brut-badge bg-green-100 text-green-700">Ativa</span>
          <span className="brut-badge bg-gray-100">3 dias restantes</span>
        </div>
      </div>
      <div className="brut-card p-4">
        <h4 className="font-body font-semibold mb-2">Dia da Pizza</h4>
        <p className="text-sm text-gray-600 mb-2">Criar banner e ativar cupom PIZZA10 (18h–21h).</p>
        <span className="brut-badge bg-blue-100 text-blue-700">Agendada</span>
      </div>
    </div>
  )

  const couponsContent = (
    <div className="space-y-4">
      <div className="brut-card p-4">
        <h4 className="font-body font-semibold mb-2">GAME1000</h4>
        <p className="text-sm text-gray-600 mb-2">Liberado via mini-jogo (1000 pontos) → 20% off próxima compra.</p>
        <div className="flex gap-2">
          <span className="brut-badge bg-yellow-100 text-yellow-700">47 liberados hoje</span>
          <span className="brut-badge bg-green-100 text-green-700">73% conversão</span>
        </div>
      </div>
      <div className="brut-card p-4">
        <h4 className="font-body font-semibold mb-2">BOASVINDAS</h4>
        <p className="text-sm text-gray-600 mb-2">15% off para primeira compra (canal próprio).</p>
        <span className="brut-badge bg-blue-100 text-blue-700">Sempre ativo</span>
      </div>
    </div>
  )

  const tabs = [
    { id: 'missions', label: 'Missões', content: missionsContent },
    { id: 'campaigns', label: 'Campanhas', content: campaignsContent },
    { id: 'coupons', label: 'Cupons', content: couponsContent }
  ]

  return (
    <section id="gamificacao" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-title text-3xl sm:text-4xl font-regular text-black mb-6">IA + Gamificação</h3>
            <p className="font-body text-lg text-gray-600 mb-8">
              Deixe a inteligência artificial analisar o comportamento de seus consumidores e sugerir campanhas
              personalizadas. Criamos missões de marketing gamificadas que impulsionam vendas de forma estratégica e
              divertida.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-[var(--mx-yellow)] rounded-full border border-black flex items-center justify-center text-black">
                    {feature.icon}
                  </div>
                  <span className="font-body text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs tabs={tabs} defaultValue="missions" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeatureShowcase
