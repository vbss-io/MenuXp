import { ImageIcon, PencilIcon, TrashIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection, BannerConfig } from '@/domain/models/menu-layout.model'

import { BannerView } from './banner-view'
import * as S from '../styles'

interface BannerPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
}

export const BannerPreviewEdit: React.FC<BannerPreviewEditProps> = ({ section, onEdit, onRemove }) => {
  const [imageError, setImageError] = useState(false)

  // Helper function para acessar dados do banner
  const getBannerData = (): BannerConfig | null => {
    if (!section || section.type !== MenuSectionType.BANNER) return null
    return section.config as BannerConfig
  }

  const bannerData = getBannerData()

  const _handleImageError = () => {
    setImageError(true)
  }

  // Se não tem imagem ou erro ao carregar
  if (!bannerData?.imagePath || imageError) {
    return (
      <S.PreviewContainer>
        <S.PreviewHeader>
          <S.PreviewTitle>
            <ImageIcon size={20} />
            <span>Banner</span>
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
            {imageError ? (
              <>
                <WarningIcon size={48} />
                <span>Imagem não disponível</span>
              </>
            ) : (
              <>
                <ImageIcon size={48} />
                <span>Banner sem imagem</span>
              </>
            )}
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
              <span>Banner</span>
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
            <BannerView section={section} />
          </div>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
