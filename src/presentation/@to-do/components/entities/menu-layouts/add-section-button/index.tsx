import { PlusIcon } from '@phosphor-icons/react'
import { Popover } from '@vbss-ui/popover'
import React from 'react'

import type { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

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

  return (
    <S.Container>
      <Popover
        variant="outline"
        side="top"
        trigger={
          <S.AddButton variant="ghost" size="sm" disabled={disabled} as="div">
            <PlusIcon size={16} />
            <span>Adicionar Seção</span>
          </S.AddButton>
        }
      >
        <S.PopoverContent>
          <S.PopoverHeader>
            <h4>Adicionar Seção</h4>
          </S.PopoverHeader>
          <S.SectionsList>
            {activeSections.map((section) => (
              <S.SectionOption key={section.type} onClick={() => handleSectionSelect(section.type)}>
                <S.SectionName>{section.name}</S.SectionName>
                <S.SectionDescription>{section.description}</S.SectionDescription>
              </S.SectionOption>
            ))}
          </S.SectionsList>
        </S.PopoverContent>
      </Popover>
    </S.Container>
  )
}
