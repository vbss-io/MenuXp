import { FolderIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'

import type { MenuSection } from '@/domain/models/menu-layout.model'

import { CategoriesView } from './categories-view'
import * as S from '../styles'

interface CategoriesPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
  menuLayout?: string
}

export const CategoriesPreviewEdit: React.FC<CategoriesPreviewEditProps> = ({
  section,
  onEdit,
  onRemove,
  menuLayout
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
              <FolderIcon size={20} />
              <span>Categorias</span>
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
            <CategoriesView section={section} menuLayout={menuLayout} />
          </div>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
