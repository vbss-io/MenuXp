import { ImageIcon, PencilIcon, TrashIcon, WarningIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { CarouselConfig, MenuSection } from '@/domain/models/menu-layout.model'
import { Button } from '@/presentation/components/ui/button'

import { CarouselView } from './carousel-view'
import * as S from '../styles'

interface CarouselPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
}

export const CarouselPreviewEdit: React.FC<CarouselPreviewEditProps> = ({ section, onEdit, onRemove }) => {
  const imagePaths = useMemo(() => {
    if (!section || section.type !== MenuSectionType.CAROUSEL) return []
    const config = section.config as CarouselConfig
    const paths = config?.imagePaths as string[]
    return Array.isArray(paths) ? paths : []
  }, [section])

  const validImages = imagePaths.filter((path) => path)

  // Se não tem imagens
  if (!imagePaths.length || imagePaths.every((path) => !path)) {
    return (
      <S.PreviewContainer>
        <S.PreviewHeader>
          <S.PreviewTitle>
            <ImageIcon size={20} />
            <span>Carousel</span>
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
        <S.FallbackContainer>
          <S.FallbackContent>
            <ImageIcon size={48} />
            <span>Carousel sem imagens</span>
          </S.FallbackContent>
        </S.FallbackContainer>
      </S.PreviewContainer>
    )
  }
  if (!validImages.length) {
    return (
      <S.PreviewContainer>
        <S.PreviewHeader>
          <S.PreviewTitle>
            <ImageIcon size={20} />
            <span>Carousel</span>
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
            <CarouselView section={section} />
          </S.PreviewContent>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
