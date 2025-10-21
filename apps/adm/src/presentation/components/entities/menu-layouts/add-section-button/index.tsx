import type { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { Popover } from '@menuxp/ui'
import { PlusIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import React from 'react'

import * as S from './styles'

interface AddSectionButtonProps {
  onAddSection: (sectionType: MenuSectionType, position: number) => void
  position: number
  disabled?: boolean
  availableSections?: MenuSectionDefinition[]
}

export const AddSectionButton: React.FC<AddSectionButtonProps> = ({
  onAddSection,
  position,
  disabled = false,
  availableSections = []
}) => {
  const handleSectionSelect = (sectionType: MenuSectionType) => {
    onAddSection(sectionType, position)
  }

  const activeSections = availableSections.filter((section) => section.isActive)

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.1 }
    }
  }

  return (
    <S.Container>
      <Popover
        trigger={
          <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover">
            <S.AddButton disabled={disabled}>
              <PlusIcon size={16} />
              <span>Adicionar Seção</span>
            </S.AddButton>
          </motion.div>
        }
      >
        <S.PopoverContent>
          <S.PopoverHeader>
            <S.HeaderTitle>Adicionar Seção</S.HeaderTitle>
          </S.PopoverHeader>
          <S.SectionsList>
            {activeSections.map((section, index) => (
              <motion.div
                key={section.type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <S.SectionOption onClick={() => handleSectionSelect(section.type)}>
                  <S.SectionName>{section.name}</S.SectionName>
                  <S.SectionDescription>{section.description}</S.SectionDescription>
                </S.SectionOption>
              </motion.div>
            ))}
          </S.SectionsList>
        </S.PopoverContent>
      </Popover>
    </S.Container>
  )
}
