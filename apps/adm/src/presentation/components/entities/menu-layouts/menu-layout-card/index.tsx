import { CheckIcon, TrashIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

import { MenuLayoutStatus } from '@/domain/enums/menu-layouts/menu-layout-status.enum'
import type { MenuLayout } from '@/domain/models/menu-layout.model'
import { Button } from '@menuxp/ui'

import * as S from './styles'

interface MenuLayoutCardProps {
  layout: MenuLayout
  onSelect: (layout: MenuLayout) => void
  onDelete: (layoutId: string) => void
  onActivate: (layoutId: string) => void
  isSelected?: boolean
}

export const MenuLayoutCard = ({ layout, onSelect, onDelete, onActivate, isSelected = false }: MenuLayoutCardProps) => {
  const isActive = layout.status === MenuLayoutStatus.ACTIVE

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <S.Card onClick={() => onSelect(layout)} $isSelected={isSelected}>
        <S.CardHeader>
          <S.CardTitle>{layout.name}</S.CardTitle>
        </S.CardHeader>
        <S.CardContent>
          <S.SectionsCount>
            {(layout.sections?.length || 0) === 0
              ? 'Nenhuma seção'
              : `${layout.sections?.length || 0} ${(layout.sections?.length || 0) !== 1 ? 'seções' : 'seção'}`}
          </S.SectionsCount>
          {layout.description && <S.Description>{layout.description}</S.Description>}
        </S.CardContent>
        <S.CardFooter>
          <S.ActionsContainer>
            <Button
              variant={isActive ? 'primary' : 'outline'}
              size="sm"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onActivate(layout.id)
              }}
            >
              <CheckIcon size={20} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onDelete(layout.id)
              }}
            >
              <TrashIcon size={20} />
            </Button>
          </S.ActionsContainer>
        </S.CardFooter>
      </S.Card>
    </motion.div>
  )
}
