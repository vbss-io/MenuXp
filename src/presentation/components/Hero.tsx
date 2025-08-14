import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Eye, Languages, PhoneCall, QrCode, ShieldCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Hero: React.FC = () => {
  const [currentMockup, setCurrentMockup] = useState(0)

  const prefersReduced = useReducedMotion()

  const mockups = [
    { alt: 'Template Clássico', src: 'public/images/01.png' },
    { alt: 'Template Dark', src: 'public/images/02.png' },
    { alt: 'Template Clean', src: 'public/images/03.png' },
    { alt: 'Template Brutalista', src: 'public/images/04.png' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMockup((prev) => (prev + 1) % mockups.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [mockups.length])

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      text: 'Controle total da marca'
    },
    {
      icon: <QrCode className="w-5 h-5" />,
      text: 'Pedido via QR/URL própria'
    },
    {
      icon: <Languages className="w-5 h-5" />,
      text: 'Multi-idiomas (digital & impresso)'
    },
    {
      icon: <PhoneCall className="w-5 h-5" />,
      text: 'Acompanhamento por WhatsApp/SMS'
    }
  ]

  const handleScrollTo = (target: string) => {
    const element = document.querySelector(target)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative bg-white py-5 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-regular text-black mb-6 leading-tight">
              <span className="block">Seu app de pedidos</span>
              <span className="inline-block bg-[var(--mx-yellow)] px-4 py-1 border border-black rounded-lg mr-2 text-3xl sm:text-4xl lg:text-5xl">
                sem taxas
              </span>
              <span className="block mt-2">
                com <span className="underline decoration-4 decoration-[var(--mx-yellow)]">IA e Gamificação</span>
              </span>
            </h1>

            <p className="font-body text-lg text-gray-700 mb-8 max-w-lg">
              O MenuXP coloca o seu restaurante no controle: pedidos via QR Code ou URL, gestão facilidada,
              multi-idiomas, cardápio para impressão e mini-jogos com cupons para reter clientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={() => handleScrollTo('#demo')} className="btn-brut">
                <ArrowRight className="w-5 h-5" />
                Agendar demonstração
              </button>
              <button onClick={() => handleScrollTo('#recursos')} className="btn-brut white">
                <Eye className="w-5 h-5" />
                Ver recursos
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="chip">Whitelabel</span>
              <span className="chip">Sem login</span>
              <span className="chip">Multi-idiomas</span>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <span className="font-body text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            {/* Phone Mockup */}
            <div className="relative max-w-sm mx-auto">
              <motion.div
                role="status"
                aria-label="+10 templates disponíveis"
                className="absolute -top-3 -right-3 z-10
                           bg-[var(--mx-yellow)] text-white font-semibold
                           text-xs sm:text-sm px-3 py-1 rounded-full shadow-lg
                           border border-black/10"
                initial={{ scale: 1, y: 0 }}
                animate={prefersReduced ? { y: 0, scale: 1 } : { y: [0, -4, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ willChange: 'transform' }}
              >
                App do seu jeito!
              </motion.div>

              <div className="bg-black rounded-3xl p-2">
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* Phone Frame */}
                  {/* Tela do celular */}
                  <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-[9/19.5]">
                    <div className="grid grid-rows-[auto,1fr] h-full">
                      {/* Status Bar */}
                      <div className="bg-black text-white px-4 py-2 text-xs flex justify-between"></div>
                    </div>

                    {/* Área de imagem: centraliza e limita por altura/largura disponíveis */}
                    <div className="relative h-full w-full flex items-center justify-center bg-black">
                      <img
                        key={currentMockup}
                        src={mockups[currentMockup].src}
                        alt={mockups[currentMockup].alt}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Mockup Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {mockups.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentMockup ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
