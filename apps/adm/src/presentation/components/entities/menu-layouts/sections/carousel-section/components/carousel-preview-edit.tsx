import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { CarouselConfig, MenuSection } from '@/domain/models/menu-layout.model'
import { Button } from '@menuxp/ui'
import { ImageIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

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
            {validImages.length > 0 && (
              <S.ImagePreviewGrid>
                {validImages.slice(0, 4).map((imagePath, index) => (
                  <S.ImagePreviewThumbnail
                    key={index}
                    src={imagePath}
                    alt={`Carousel ${index + 1}`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ))}
                {validImages.length > 4 && <S.MoreImagesIndicator>+{validImages.length - 4}</S.MoreImagesIndicator>}
              </S.ImagePreviewGrid>
            )}
            <S.ConfigurationPreview>
              <S.ConfigurationItem>
                <S.ConfigurationLabel>Imagens:</S.ConfigurationLabel>
                <S.ConfigurationValue>
                  {validImages.length > 0 ? `${validImages.length} configuradas` : '✗ Nenhuma imagem'}
                </S.ConfigurationValue>
              </S.ConfigurationItem>
            </S.ConfigurationPreview>
          </S.PreviewContent>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
