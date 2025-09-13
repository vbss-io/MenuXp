import { FolderIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'

import type { MenuSection } from '@/domain/models/menu-layout.model'
import { Button } from '@/presentation/components/ui/button'

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
            <CategoriesView section={section} menuLayout={menuLayout} />
          </S.PreviewContent>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
