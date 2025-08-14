import { CaretLeftIcon, CaretRightIcon, ImageIcon, TrashIcon, UploadIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'

import * as S from './styles'

interface CarouselSectionProps {
  section: MenuSection
  isEditMode?: boolean
  onUpdate?: (section: MenuSection) => void
  onRemove?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  onPendingFileChange?: (sectionIndex: number, file: File | null, imageIndex?: number) => void
  onRemoveMedia?: (mediaUrl: string) => void
  sectionIndex?: number
}

export const CarouselSection = ({
  section,
  isEditMode = false,
  onUpdate,
  onRemove,
  sectionDefinitions = [],
  onPendingFileChange,
  onRemoveMedia,
  sectionIndex
}: CarouselSectionProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [imageErrors, setImageErrors] = useState<boolean[]>([])
  const [pendingFiles, setPendingFiles] = useState<(File | null)[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const autoPlayInterval = useRef<NodeJS.Timeout>()

  const imagePaths = useMemo(() => {
    const paths = section.config.imagePaths as string[]
    const result = Array.isArray(paths) ? paths : []
    return result
  }, [section.config.imagePaths])
  const maxImages = 5
  const minImages = 2

  useEffect(() => {
    if (sectionDefinitions.length > 0) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions])

  useEffect(() => {
    if (!isEditMode && imagePaths.length > 1 && isAutoPlaying) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length)
      }, 4000)
    }
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current)
      }
    }
  }, [isEditMode, imagePaths.length, isAutoPlaying])

  useEffect(() => {
    setImageErrors(new Array(imagePaths.length).fill(false))
  }, [imagePaths.length])

  useEffect(() => {
    const newPendingFiles = [...pendingFiles]
    let hasChanges = false
    imagePaths.forEach((imagePath, index) => {
      if (imagePath && pendingFiles[index] && !imagePath.startsWith('blob:')) {
        newPendingFiles[index] = null
        hasChanges = true
        if (onPendingFileChange && sectionIndex !== undefined) {
          onPendingFileChange(sectionIndex, null, index)
        }
      }
    })
    if (hasChanges) {
      setPendingFiles(newPendingFiles)
    }
  }, [imagePaths, pendingFiles, onPendingFileChange, sectionIndex])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, imageIndex: number) => {
    const file = event.target.files?.[0]
    if (!file || !onUpdate) {
      return
    }
    setIsUploading(true)
    try {
      const imageUrl = URL.createObjectURL(file)
      const newPendingFiles = [...pendingFiles]
      newPendingFiles[imageIndex] = file
      setPendingFiles(newPendingFiles)
      if (onPendingFileChange && sectionIndex !== undefined) {
        onPendingFileChange(sectionIndex, file, imageIndex)
      }
      const newImagePaths = [...imagePaths]
      newImagePaths[imageIndex] = imageUrl
      const updatedSection: MenuSection = {
        ...section,
        config: {
          ...section.config,
          imagePaths: newImagePaths
        }
      }
      onUpdate(updatedSection)
    } catch (error) {
      console.error('Error processing image:', error)
      toast.error('Erro ao processar imagem')
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddImage = () => {
    if (imagePaths.length >= maxImages) {
      toast.error(`Máximo de ${maxImages} imagens permitido`)
      return
    }
    const newImagePaths = [...imagePaths, '']
    const updatedSection: MenuSection = {
      ...section,
      config: {
        ...section.config,
        imagePaths: newImagePaths
      }
    }
    onUpdate?.(updatedSection)
  }

  const handleRemoveImage = (imageIndex: number) => {
    if (imagePaths.length <= minImages) {
      toast.error(`Mínimo de ${minImages} imagens obrigatório`)
      return
    }
    const imageToRemove = imagePaths[imageIndex]
    if (imageToRemove && !imageToRemove.startsWith('blob:') && onRemoveMedia) {
      onRemoveMedia(imageToRemove)
    }
    const newImagePaths = imagePaths.filter((_, index) => index !== imageIndex)
    const newPendingFiles = pendingFiles.filter((_, index) => index !== imageIndex)
    setPendingFiles(newPendingFiles)
    setCurrentImageIndex(0)
    const updatedSection: MenuSection = {
      ...section,
      config: {
        ...section.config,
        imagePaths: newImagePaths
      }
    }
    onUpdate?.(updatedSection)
  }

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

  const handleUploadClick = (imageIndex: number) => {
    fileInputRefs.current[imageIndex]?.click()
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

  if (isEditMode) {
    return (
      <S.EditContainer>
        <S.EditHeader>
          <S.EditTitle>
            <ImageIcon size={20} />
            <span>Carousel</span>
          </S.EditTitle>
          {onRemove && (
            <Button variant="ghost" size="sm" onClick={onRemove}>
              <TrashIcon size={16} />
              Remover
            </Button>
          )}
        </S.EditHeader>
        <S.EditContent>
          <S.ImagesGrid>
            {Array.from({ length: Math.max(imagePaths.length, minImages) }).map((_, index) => {
              const imagePath = imagePaths[index]
              const hasError = imageErrors[index]
              return (
                <S.ImageSlot key={index}>
                  {imagePath && !hasError ? (
                    <S.ImagePreview>
                      <img
                        key={imagePath}
                        src={imagePath}
                        alt={`Carousel ${index + 1}`}
                        onError={() => handleImageError(index)}
                        onLoad={() => handleImageLoad(index)}
                      />
                      <S.ImageOverlay>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUploadClick(index)}
                          disabled={isUploading}
                        >
                          <UploadIcon size={16} />
                          Alterar
                        </Button>
                        {imagePaths.length > minImages && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
                            disabled={isUploading}
                          >
                            <TrashIcon size={16} />
                            Remover
                          </Button>
                        )}
                      </S.ImageOverlay>
                    </S.ImagePreview>
                  ) : (
                    <S.UploadArea onClick={() => handleUploadClick(index)}>
                      <UploadIcon size={24} />
                      <span>
                        {hasError ? 'Imagem não encontrada. Clique para fazer upload.' : `Imagem ${index + 1}`}
                      </span>
                      <span className="subtitle">PNG, JPG até 5MB</span>
                    </S.UploadArea>
                  )}
                  <input
                    ref={(el) => (fileInputRefs.current[index] = el)}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, index)}
                    style={{ display: 'none' }}
                  />
                </S.ImageSlot>
              )
            })}
          </S.ImagesGrid>
          {imagePaths.length < maxImages && (
            <S.AddImageButton>
              <Button variant="outline" onClick={handleAddImage} disabled={isUploading}>
                <UploadIcon size={16} />
                Adicionar Imagem ({imagePaths.length}/{maxImages})
              </Button>
            </S.AddImageButton>
          )}
          {isUploading && (
            <S.UploadingOverlay>
              <S.LoadingSpinner />
              <span>Processando imagens...</span>
            </S.UploadingOverlay>
          )}
          {validationErrors.length > 0 && (
            <S.ValidationErrors>
              {validationErrors.map((error, index) => (
                <S.ValidationError key={index}>
                  <WarningIcon size={16} />
                  <span>{error}</span>
                </S.ValidationError>
              ))}
            </S.ValidationErrors>
          )}
        </S.EditContent>
      </S.EditContainer>
    )
  }

  if (!imagePaths.length || imagePaths.every((path) => !path)) {
    return null
  }

  const validImages = imagePaths.filter((path) => path && !imageErrors[imagePaths.indexOf(path)])

  if (!validImages.length) {
    return (
      <S.FallbackContainer>
        <S.FallbackContent>
          <ImageIcon size={48} />
          <span>Imagens não disponíveis</span>
        </S.FallbackContent>
      </S.FallbackContainer>
    )
  }

  if (!isEditMode) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <S.ViewContainer>
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
                        <S.CarouselImage
                          src={imagePath}
                          alt={`Carousel ${index + 1}`}
                          onError={() => handleImageError(index)}
                          onLoad={() => handleImageLoad(index)}
                        />
                      </S.CarouselSlide>
                    )
                )}
              </S.CarouselTrack>
              {validImages.length > 1 && (
                <>
                  <S.CarouselButton onClick={handlePrevImage} position="left">
                    <CaretLeftIcon size={20} />
                  </S.CarouselButton>
                  <S.CarouselButton onClick={handleNextImage} position="right">
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
            {onRemove && (
              <Button variant="ghost" size="sm" onClick={onRemove}>
                <TrashIcon size={16} />
              </Button>
            )}
          </S.PreviewHeader>
          <S.ViewContainer>
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
                        <S.CarouselImage
                          src={imagePath}
                          alt={`Carousel ${index + 1}`}
                          onError={() => handleImageError(index)}
                          onLoad={() => handleImageLoad(index)}
                        />
                      </S.CarouselSlide>
                    )
                )}
              </S.CarouselTrack>
              {validImages.length > 1 && (
                <>
                  <S.CarouselButton onClick={handlePrevImage} position="left">
                    <CaretLeftIcon size={20} />
                  </S.CarouselButton>
                  <S.CarouselButton onClick={handleNextImage} position="right">
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
                      />
                    )
                )}
              </S.CarouselIndicators>
            )}
          </S.ViewContainer>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
