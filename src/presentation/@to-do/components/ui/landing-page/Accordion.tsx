import { ChevronDown } from 'lucide-react'
import React, { useRef, useState } from 'react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
}

// To-Do: Refatorar styles and remove tailwind
const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen = false, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="brut-card overflow-hidden">
      <button
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus-brut"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-body font-semibold text-lg">{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px'
        }}
      >
        {/* Aqui estava p-6 pt-0 — adicionamos um respiro no topo */}
        <div className="p-6 pt-4 sm:pt-5 border-t border-black">
          <div className="font-body text-gray-700 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

interface AccordionProps {
  items: Array<{
    title: string
    // Antes era string: agora aceita ReactNode para podermos enviar conteúdo com <div className="pt-...">
    content: React.ReactNode
  }>
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} isOpen={openIndex === index} onToggle={() => handleToggle(index)}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

export default Accordion
