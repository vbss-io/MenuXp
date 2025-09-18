import { ImageIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'

import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection, BannerConfig } from '@/domain/models/menu-layout.model'
import { Button } from '@/presentation/components/ui/button'

import * as S from '../styles'

interface BannerPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
}

export const BannerPreviewEdit: React.FC<BannerPreviewEditProps> = ({ section, onEdit, onRemove }) => {
  const getBannerData = (): BannerConfig | null => {
    if (!section || section.type !== MenuSectionType.BANNER) return null
    return section.config as BannerConfig
  }

  const bannerData = getBannerData()

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
              <span>Banner</span>
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
            {bannerData?.imagePath && (
              <S.ImagePreviewContainer>
                <S.ImagePreviewThumbnail
                  src={bannerData.imagePath}
                  alt="Banner preview"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </S.ImagePreviewContainer>
            )}
            <S.ConfigurationPreview>
              <S.ConfigurationItem>
                <S.ConfigurationLabel>Imagem:</S.ConfigurationLabel>
                <S.ConfigurationValue>
                  {bannerData?.imagePath ? '✓ Configurada' : '✗ Não configurada'}
                </S.ConfigurationValue>
              </S.ConfigurationItem>
              {bannerData?.tag && (
                <S.ConfigurationItem>
                  <S.ConfigurationLabel>Tag:</S.ConfigurationLabel>
                  <S.ConfigurationValue>"{bannerData.tag}"</S.ConfigurationValue>
                </S.ConfigurationItem>
              )}
              {bannerData?.title && (
                <S.ConfigurationItem>
                  <S.ConfigurationLabel>Título:</S.ConfigurationLabel>
                  <S.ConfigurationValue>"{bannerData.title}"</S.ConfigurationValue>
                </S.ConfigurationItem>
              )}
              {bannerData?.subtitle && (
                <S.ConfigurationItem>
                  <S.ConfigurationLabel>Subtítulo:</S.ConfigurationLabel>
                  <S.ConfigurationValue>"{bannerData.subtitle}"</S.ConfigurationValue>
                </S.ConfigurationItem>
              )}
              {!bannerData?.tag && !bannerData?.title && !bannerData?.subtitle && (
                <S.ConfigurationItem>
                  <S.ConfigurationLabel>Texto:</S.ConfigurationLabel>
                  <S.ConfigurationValue>✗ Nenhum texto configurado</S.ConfigurationValue>
                </S.ConfigurationItem>
              )}
            </S.ConfigurationPreview>
          </S.PreviewContent>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
