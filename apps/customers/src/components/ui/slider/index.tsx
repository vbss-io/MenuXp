import { useRestaurant } from '@/hooks/use-restaurant'
import { XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import * as S from './styles'

export interface SliderProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  icon?: React.ReactNode
  children: React.ReactNode
  showHeader?: boolean
  showBorder?: boolean
  showCloseButton?: boolean
  noPadding?: boolean
  maxWidth?: string
  onBackdropClick?: (e: React.MouseEvent) => void
}

export const Slider: React.FC<SliderProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  showHeader = true,
  showBorder = true,
  showCloseButton = true,
  noPadding = false,
  maxWidth,
  onBackdropClick
}) => {
  const { layout } = useRestaurant()

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (onBackdropClick) {
        onBackdropClick(e)
      } else {
        onClose()
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <S.SlideOverlay onClick={handleBackdropClick}>
          <S.SlideContainer
            as={motion.div}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: 'linear' }}
            $maxWidth={maxWidth}
            className={`slider-container layout-${layout}`}
          >
            {showHeader && (
              <S.SlideHeader $showBorder={showBorder} className={`slider-header layout-${layout}`}>
                <S.HeaderContent>
                  {icon}
                  {title && <S.HeaderTitle className={`slider-title layout-${layout}`}>{title}</S.HeaderTitle>}
                </S.HeaderContent>
                {showCloseButton && (
                  <S.CloseButton onClick={onClose} className={`slider-close-button layout-${layout}`}>
                    <XIcon size={24} />
                  </S.CloseButton>
                )}
              </S.SlideHeader>
            )}

            <S.SlideContent $noPadding={noPadding}>{children}</S.SlideContent>
          </S.SlideContainer>
        </S.SlideOverlay>
      )}
    </AnimatePresence>
  )
}

Slider.displayName = 'Slider'

export default Slider
