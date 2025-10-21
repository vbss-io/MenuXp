import { CaretLeftIcon, CaretRightIcon, ImageBrokenIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { Dialog } from '@menuxp/ui'

import * as S from './styles'

interface ImageCarouselProps {
  images: string[]
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageBroken, setIsImageBroken] = useState(false)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    setIsImageBroken(false)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    setIsImageBroken(false)
  }

  if (images.length === 0) {
    return (
      <S.CarouselContainer>
        <S.ImageContainer>
          <S.Placeholder>
            <ImageBrokenIcon size={64} weight="fill" />
          </S.Placeholder>
        </S.ImageContainer>
      </S.CarouselContainer>
    )
  }

  return (
    <>
      <S.CarouselContainer className="image-carousel">
        <S.ImagesContainer onClick={(e) => e.stopPropagation()}>
          {images.map((image, index) => (
            <S.ImageWrapper key={index} onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
              <S.ThumbnailImage src={image} alt={`Imagem ${index + 1}`} />
            </S.ImageWrapper>
          ))}
        </S.ImagesContainer>
      </S.CarouselContainer>
      <Dialog
        title="Visualizar Imagens"
        description={`Imagem ${currentIndex + 1} de ${images.length}`}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <S.ModalCarouselContainer>
          <S.ModalImageContainer>
            {isImageBroken ? (
              <S.ModalPlaceholder>
                <ImageBrokenIcon size={80} weight="fill" />
              </S.ModalPlaceholder>
            ) : (
              <S.ModalImage
                src={images[currentIndex]}
                alt={`Imagem ${currentIndex + 1}`}
                onError={() => setIsImageBroken(true)}
              />
            )}
          </S.ModalImageContainer>
          {images.length > 1 && (
            <>
              <S.ModalNavigationButton onClick={handlePrevious} $direction="left">
                <CaretLeftIcon weight="bold" />
              </S.ModalNavigationButton>
              <S.ModalNavigationButton onClick={handleNext} $direction="right">
                <CaretRightIcon weight="bold" />
              </S.ModalNavigationButton>
            </>
          )}
          {images.length > 1 && (
            <S.ThumbsContainer>
              {images
                .slice(Math.max(0, currentIndex - 1), Math.min(images.length, currentIndex + 2))
                .map((img, idx) => {
                  const realIndex = Math.max(0, currentIndex - 1) + idx
                  return (
                    <S.Thumb
                      key={img + realIndex}
                      $active={realIndex === currentIndex}
                      onClick={() => {
                        setCurrentIndex(realIndex)
                        setIsImageBroken(false)
                      }}
                      aria-label={`Selecionar imagem ${realIndex + 1}`}
                    >
                      <img src={img} alt={`Miniatura ${realIndex + 1}`} />
                    </S.Thumb>
                  )
                })}
            </S.ThumbsContainer>
          )}
        </S.ModalCarouselContainer>
      </Dialog>
    </>
  )
}
