import { PencilIcon, ShoppingCartIcon, TrashIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'

import type { MenuSection } from '@/domain/models/menu-layout.model'
import { Button } from '@/presentation/components/ui/button'

import { MenuItemsView } from './menu-items-view'
import * as S from '../styles'

interface MenuItemsPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
  menuLayout?: string
  isClientView?: boolean
}

export const MenuItemsPreviewEdit: React.FC<MenuItemsPreviewEditProps> = ({
  section,
  onEdit,
  onRemove,
  menuLayout,
  isClientView
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>
              <ShoppingCartIcon size={20} />
              <span>Itens do Menu</span>
            </S.PreviewTitle>
            <S.ActionButtons>
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <PencilIcon size={16} />
                </Button>
              )}
              {onRemove && (
                <Button variant="outline" size="sm" onClick={onRemove}>
                  <TrashIcon size={16} />
                </Button>
              )}
            </S.ActionButtons>
          </S.PreviewHeader>
          <S.PreviewContent>
            <MenuItemsView section={section} menuLayout={menuLayout} isClientView={isClientView} />
          </S.PreviewContent>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
