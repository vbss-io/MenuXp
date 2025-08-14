import { motion } from 'framer-motion'
import React from 'react'

// import Minijogos from 'public/images/games.svg'
// import Gestao from 'public/images/gestao.svg'
// import IAGamificacao from 'public/images/ia.svg'
// import MultiIdiomas from 'public/images/mult-idiomas.svg'
// import PedidoSemLogin from 'public/images/sem-login.svg'
// import Whitelabel from 'public/images/whitelabel.svg'

const ValueProps: React.FC = () => {
  const cards = [
    {
      // icon: PedidoSemLogin,
      title: 'Pedido sem login',
      description: 'Cliente compra por QR Code ou URL. No checkout, apenas nome e WhatsApp.'
    },
    {
      // icon: Whitelabel,
      title: 'Whitelabel de verdade',
      description: 'App com sua identidade visual: cores, logo, banners e muito mais para que seu app seja único.'
    },
    {
      // icon: MultiIdiomas,
      title: 'Multi-idiomas',
      description: 'Digital e impressão: atenda turistas e amplie alcance.'
    },
    {
      // icon: Gestao,
      title: 'Gestão Completa',
      description: 'Pedidos em tempo real: Recebido, confirmado, em produção, pronto, saiu para entrega e entregue.'
    },
    {
      // icon: Minijogos,
      title: 'Mini-jogos com cupons',
      description: 'Engaje clientes enquanto esperam e aumente o ticket médio.'
    },
    {
      // icon: IAGamificacao,
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
    <section id="features" className="bg-mx-red py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-title text-3xl sm:text-4xl font-regular text-black mb-4">
            Tudo que você precisa para vender mais
          </h2>
          <p className="font-body text-lg text-gray-600 max-w-3xl mx-auto">
            Uma plataforma única para cardápio digital, gestão de pedidos e crescimento com dados.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <motion.div key={index} variants={itemVariants} className="brut-card p-8 group">
              <div className="mb-6">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  {/* <img src={card?.icon} alt={card.title} className="w-18 h-18" /> */}
                </div>

                <h3 className="font-title text-xl font-regular text-black mb-3">{card.title}</h3>
              </div>
              <p className="font-body text-gray-600 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ValueProps
