import { PencilIcon, ShoppingCartIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'

import type { MenuSection } from '@/domain/models/menu-layout.model'

import { MenuItemsView } from './menu-items-view'
import * as S from '../styles'

interface MenuItemsPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
}

export const MenuItemsPreviewEdit: React.FC<MenuItemsPreviewEditProps> = ({ section, onEdit, onRemove }) => {
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
            <div style={{ display: 'flex', gap: '4px' }}>
              {onEdit && (
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <PencilIcon size={16} />
                </Button>
              )}
              {onRemove && (
                <Button variant="ghost" size="sm" onClick={onRemove}>
                  <TrashIcon size={16} />
                </Button>
              )}
            </div>
          </S.PreviewHeader>
          <div style={{ padding: 0 }}>
            <MenuItemsView section={section} />
          </div>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
