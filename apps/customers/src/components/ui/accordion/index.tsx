import { CaretDownIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

import { useRestaurant } from '@/hooks/use-restaurant'

import * as S from './styles'

export interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
  disabled?: boolean
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  disabled = false
}) => {
  const { layout } = useRestaurant()

  const itemClasses = ['accordion-item', `layout-${layout}`].filter(Boolean).join(' ')
  const triggerClasses = ['accordion-trigger', isOpen ? 'open' : '', `layout-${layout}`].filter(Boolean).join(' ')
  const iconClasses = ['accordion-icon', isOpen ? 'open' : ''].filter(Boolean).join(' ')

  return (
    <S.AccordionItemContainer className={itemClasses}>
      <S.AccordionTrigger
        className={triggerClasses}
        onClick={onToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        type="button"
      >
        <S.AccordionTitle className="accordion-title">{title}</S.AccordionTitle>
        <S.AccordionIcon className={iconClasses}>
          <CaretDownIcon size={20} weight="bold" />
        </S.AccordionIcon>
      </S.AccordionTrigger>
      <AnimatePresence>
        {isOpen && (
          <S.AccordionContent
            className="accordion-content"
            as={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <S.AccordionContentInner className="accordion-content-inner">{children}</S.AccordionContentInner>
          </S.AccordionContent>
        )}
      </AnimatePresence>
    </S.AccordionItemContainer>
  )
}

export interface AccordionProps {
  items: Array<{
    title: string
    content: React.ReactNode
  }>
  allowMultiple?: boolean
  defaultOpenIndex?: number
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, defaultOpenIndex }) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    defaultOpenIndex !== undefined ? new Set([defaultOpenIndex]) : new Set()
  )

  const handleToggle = (index: number) => {
    setOpenIndices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(index)
      }

      return newSet
    })
  }

  return (
    <S.AccordionContainer>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndices.has(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </S.AccordionContainer>
  )
}

Accordion.displayName = 'Accordion'
AccordionItem.displayName = 'AccordionItem'
