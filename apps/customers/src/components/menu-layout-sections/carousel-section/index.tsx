import { CaretLeftIcon, CaretRightIcon, ImageBrokenIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslator } from 'vbss-translator'

import { useRestaurant } from '@/hooks/use-restaurant'
import { MenuSectionType, type CarouselConfig, type MenuSection } from '@/types/menu-layout'

import * as S from './styles'

interface CarouselSectionProps {
  section: MenuSection
}

export const CarouselSection: React.FC<CarouselSectionProps> = ({ section }) => {
  const { t } = useTranslator()
  const { layout } = useRestaurant()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageErrors, setImageErrors] = useState<boolean[]>([])
  const autoPlayInterval = useRef<NodeJS.Timeout>()

  const imagePaths = useMemo(() => {
    if (!section || section.type !== MenuSectionType.CAROUSEL) return []
    const config = section.config as CarouselConfig
    const paths = config?.imagePaths as string[]
    return Array.isArray(paths) ? paths : []
  }, [section])

  useEffect(() => {
    if (imagePaths.length > 1 && isAutoPlaying) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length)
      }, 4000)
    }
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current)
      }
    }
  }, [imagePaths.length, isAutoPlaying])

  useEffect(() => {
    setImageErrors(new Array(imagePaths.length).fill(false))
  }, [imagePaths.length])

  const handleImageError = (imageIndex: number) => {
    const newImageErrors = [...imageErrors]
    newImageErrors[imageIndex] = true
    setImageErrors(newImageErrors)
  }

  const handleImageLoad = (imageIndex: number) => {
    const newImageErrors = [...imageErrors]
    newImageErrors[imageIndex] = false
    setImageErrors(newImageErrors)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagePaths.length) % imagePaths.length)
    setIsAutoPlaying(false)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length)
    setIsAutoPlaying(false)
  }

  const handleIndicatorClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)
  }

  const validImages = imagePaths.filter((path, index) => path && !imageErrors[index])

  if (!imagePaths.length || imagePaths.every((path) => !path) || !validImages.length) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <S.ViewContainer className={`carousel-view-container layout-${layout}`}>
          <S.CarouselContainer>
            <S.CarouselTrack
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`
              }}
            >
              {imagePaths.map(
                (imagePath, index) =>
                  imagePath && (
                    <S.CarouselSlide key={`${imagePath}-${index}`}>
                      {!imageErrors[index] ? (
                        <S.CarouselImage
                          src={imagePath}
                          alt={`${t('Carrossel')} ${index + 1}`}
                          onError={() => handleImageError(index)}
                          onLoad={() => handleImageLoad(index)}
                          className="carousel-image"
                        />
                      ) : (
                        <S.CarouselPlaceholder className="carousel-placeholder">
                          <ImageBrokenIcon size={64} weight="fill" />
                          <span>{t('Imagem não disponível')}</span>
                        </S.CarouselPlaceholder>
                      )}
                    </S.CarouselSlide>
                  )
              )}
            </S.CarouselTrack>
            {validImages.length > 1 && (
              <>
                <S.CarouselButton onClick={handlePrevImage} position="left" className="carousel-button">
                  <CaretLeftIcon size={20} />
                </S.CarouselButton>
                <S.CarouselButton onClick={handleNextImage} position="right" className="carousel-button">
                  <CaretRightIcon size={20} />
                </S.CarouselButton>
              </>
            )}
          </S.CarouselContainer>
          {validImages.length > 1 && (
            <S.CarouselIndicators>
              {imagePaths.map(
                (imagePath, index) =>
                  imagePath && (
                    <S.CarouselIndicator
                      key={index}
                      active={index === currentImageIndex}
                      onClick={() => handleIndicatorClick(index)}
                      className={`carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
                    />
                  )
              )}
            </S.CarouselIndicators>
          )}
        </S.ViewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
