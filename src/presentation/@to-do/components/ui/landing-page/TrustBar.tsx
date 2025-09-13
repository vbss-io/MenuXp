// To-Do: Refatorar styles and remove tailwind
import { motion } from 'framer-motion'
import { Award, CreditCard, Languages, MessageSquare } from 'lucide-react'
import React from 'react'

const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: <CreditCard className="w-5 h-5" />,
      text: 'Sem taxas por pedido'
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: 'Whitelabel'
    },
    {
      icon: <Languages className="w-5 h-5" />,
      text: 'Multi-idiomas'
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      text: 'Status via WhatsApp/SMS'
    }
  ]

  return (
    <section className="brut-section bg-[var(--mx-red)] py-8 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 w-full"
        >
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center space-x-3 text-black"
            >
              <div className="w-10 h-10 bg-[var(--mx-yellow)] border border-black rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <span className="font-body font-medium text-white text-sm lg:text-base">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustBar
