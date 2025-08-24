import { ImageIcon, PencilIcon, TrashIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'

import { CarouselView } from './carousel-view'
import * as S from '../styles'

interface CarouselPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
}

export const CarouselPreviewEdit: React.FC<CarouselPreviewEditProps> = ({ section, onEdit, onRemove }) => {
  const [imageErrors, setImageErrors] = useState<boolean[]>([])

  const imagePaths = useMemo(() => {
    if (!section || section.type !== MenuSectionType.CAROUSEL) return []
    const config = section.config as any
    const paths = config?.imagePaths as string[]
    return Array.isArray(paths) ? paths : []
  }, [section])

  const validImages = imagePaths.filter((path) => path && !imageErrors[imagePaths.indexOf(path)])

  // Se não tem imagens
  if (!imagePaths.length || imagePaths.every((path) => !path)) {
    return (
      <S.PreviewContainer>
        <S.PreviewHeader>
          <S.PreviewTitle>
            <ImageIcon size={20} />
            <span>Carousel</span>
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
        <S.FallbackContainer>
          <S.FallbackContent>
            <ImageIcon size={48} />
            <span>Carousel sem imagens</span>
          </S.FallbackContent>
        </S.FallbackContainer>
      </S.PreviewContainer>
    )
  }

  // Se tem erro ao carregar imagens
  if (!validImages.length) {
    return (
      <S.PreviewContainer>
        <S.PreviewHeader>
          <S.PreviewTitle>
            <ImageIcon size={20} />
            <span>Carousel</span>
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
        <S.FallbackContainer>
          <S.FallbackContent>
            <WarningIcon size={48} />
            <span>Imagens não disponíveis</span>
          </S.FallbackContent>
        </S.FallbackContainer>
      </S.PreviewContainer>
    )
  }

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
              <ImageIcon size={20} />
              <span>Carousel</span>
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
            <CarouselView section={section} />
          </div>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
