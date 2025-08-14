import { motion } from 'framer-motion'
import { Gamepad2, Gift, Target, TrendingUp } from 'lucide-react'
import React from 'react'

const MiniGames: React.FC = () => {
  const features = [
    {
      icon: <Gamepad2 className="w-5 h-5" />,
      text: 'Escolha jogos conforme seu plano'
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: 'Defina metas (ex.: 1000 pontos = 20% off)'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: 'Mais frequência, maior ticket e fidelização'
    }
  ]

  return (
    <section id="minigames" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-title text-3xl sm:text-4xl font-regular text-black mb-6">
              Mini-jogos que viram vendas
            </h3>
            <p className="font-body text-lg text-gray-600 mb-8">
              Transforme a espera em diversão! Seus clientes jogam enquanto aguardam o pedido e ganham cupons para a
              próxima compra. Uma estratégia divertida para aumentar fidelização e ticket médio.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-[var(--mx-red)] rounded-full border border-black flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <span className="font-body text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Game Example */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="brut-card p-8 bg-white">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[var(--mx-yellow)] rounded-full border border-black flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8" />
                </div>
                <h4 className="font-title text-xl font-regular text-black mb-2">Exemplo de Cupom via Jogo</h4>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-black">
                  <div>
                    <span className="font-body font-bold text-lg">GAME1000</span>
                    <p className="text-sm text-gray-600">Código único por cliente</p>
                  </div>
                  <span className="brut-badge bg-[var(--mx-yellow)] text-black">20% OFF</span>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-black">
                  <p className="text-sm text-gray-700">
                    <strong>Como funciona:</strong> Cliente atinge 1000 pontos no mini-jogo e recebe um código único
                    para usar no próximo pedido.
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-1xl text-[var(--mx-blue)]">+ Conversão</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-1xl text-[var(--mx-red)]">Aumento de Ticket Médio</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-1xl text-[var(--mx-yellow)]">Maior recorrência</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MiniGames
