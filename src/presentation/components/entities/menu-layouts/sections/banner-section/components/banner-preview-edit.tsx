import { ImageIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'

import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection, BannerConfig } from '@/domain/models/menu-layout.model'
import { Button } from '@/presentation/components/ui/button'

import { BannerView } from './banner-view'
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

  if (!bannerData?.imagePath) {
    return (
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
        <S.FallbackContainer>
          <S.FallbackContent>
            <>
              <ImageIcon size={48} />
              <span>Banner sem imagem</span>
            </>
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
            <BannerView section={section} />
          </S.PreviewContent>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
