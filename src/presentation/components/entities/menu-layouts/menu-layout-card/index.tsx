import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Chip } from '@vbss-ui/chip'
import { motion } from 'framer-motion'

import { MenuLayoutStatus } from '@/domain/enums/menu-layouts/menu-layout-status.enum'
import type { MenuLayout } from '@/domain/models/menu-layout.model'

import * as S from './styles'

interface MenuLayoutCardProps {
  layout: MenuLayout
  onSelect: (layout: MenuLayout) => void
  onEdit: (layout: MenuLayout) => void
  onDelete: (layoutId: string) => void
}

export const MenuLayoutCard = ({ layout, onSelect, onEdit, onDelete }: MenuLayoutCardProps) => {
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
      <S.Card onClick={() => onSelect(layout)}>
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
          <S.FooterContent>
            {isActive && (
              <Chip className="active" size="sm">
                Ativo
              </Chip>
            )}
            <S.ActionsContainer>
              <Button
                className="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(layout)
                }}
              >
                <PencilIcon size={16} />
              </Button>
              <Button
                className="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(layout.id)
                }}
              >
                <TrashIcon size={16} />
              </Button>
            </S.ActionsContainer>
          </S.FooterContent>
        </S.CardFooter>
      </S.Card>
    </motion.div>
  )
}
