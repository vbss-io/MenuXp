import { ImageBrokenIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { Chip } from '@menuxp/ui'
import { Loading } from '@menuxp/ui'
import { useRestaurant } from '@/hooks/use-restaurant'
import { MenuSectionType, type BannerConfig, type MenuSection } from '@/types/menu-layout'

import * as S from './styles'

interface BannerSectionProps {
  section: MenuSection
}

export const BannerSection: React.FC<BannerSectionProps> = ({ section }) => {
  const { layout } = useRestaurant()
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [bannerSize, setBannerSize] = useState({ width: 0, height: 0 })
  const bannerRef = useRef<HTMLDivElement>(null)

  const getBannerData = (): BannerConfig | null => {
    if (!section || section.type !== MenuSectionType.BANNER) return null
    return section.config as BannerConfig
  }

  const bannerData = getBannerData()

  const calculateTagScale = () => {
    if (bannerSize.width === 0) return 1
    const minScale = 0.5
    const maxScale = 1.2
    const scale = Math.max(minScale, Math.min(maxScale, bannerSize.width / 800))
    return scale
  }

  const calculateTitleScale = () => {
    if (bannerSize.width === 0) return 1
    const minScale = 0.8
    const maxScale = 1.8
    const scale = Math.max(minScale, Math.min(maxScale, 0.8 + (bannerSize.width / 800) * 1.0))
    return scale
  }

  const calculateSubtitleScale = () => {
    if (bannerSize.width === 0) return 1
    const minScale = 0.7
    const maxScale = 1.5
    const scale = Math.max(minScale, Math.min(maxScale, 0.7 + (bannerSize.width / 800) * 0.8))
    return scale
  }

  useEffect(() => {
    if (!bannerRef.current) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setBannerSize({ width, height })
      }
    })
    resizeObserver.observe(bannerRef.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageError(false)
    setImageLoading(false)
  }

  useEffect(() => {
    if (bannerData?.imagePath) {
      setImageLoading(true)
      setImageError(false)
    }
  }, [bannerData?.imagePath])

  if (!bannerData) {
    return null
  }

  if (!bannerData.imagePath && !bannerData.tag && !bannerData.title && !bannerData.subtitle) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <S.ViewContainer ref={bannerRef} className={`banner-view-container layout-${layout}`}>
          {bannerData.imagePath && !imageError ? (
            <>
              {imageLoading ? (
                <S.BannerPlaceholder className="banner-placeholder">
                  <Loading />
                  <span>Carregando imagem...</span>
                </S.BannerPlaceholder>
              ) : (
                <S.BannerImage
                  key={bannerData.imagePath}
                  src={bannerData.imagePath}
                  alt="Banner"
                  className="banner-image"
                />
              )}
              <img
                src={bannerData.imagePath}
                alt=""
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ display: 'none' }}
              />
            </>
          ) : (
            <S.BannerPlaceholder className="banner-placeholder">
              <ImageBrokenIcon size={64} weight="fill" />
              <span>Imagem não disponível</span>
            </S.BannerPlaceholder>
          )}
          <S.BannerOverlay>
            {bannerData?.tag && (
              <S.TagContainer style={{ transform: `scale(${calculateTagScale()})`, transformOrigin: 'top left' }}>
                <Chip variant="primary" size="sm">
                  {bannerData.tag}
                </Chip>
              </S.TagContainer>
            )}
            {(bannerData?.title || bannerData?.subtitle) && (
              <S.TextContainer>
                {bannerData?.title && (
                  <S.BannerTitle
                    className="banner-title"
                    style={{
                      transform: `scale(${calculateTitleScale()})`,
                      transformOrigin: 'bottom left'
                    }}
                  >
                    {bannerData.title}
                  </S.BannerTitle>
                )}
                {bannerData?.subtitle && (
                  <S.BannerSubtitle
                    className="banner-subtitle"
                    style={{
                      transform: `scale(${calculateSubtitleScale()})`,
                      transformOrigin: 'bottom left'
                    }}
                  >
                    {bannerData.subtitle}
                  </S.BannerSubtitle>
                )}
              </S.TextContainer>
            )}
          </S.BannerOverlay>
        </S.ViewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
