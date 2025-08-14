import { ImageIcon, TrashIcon, UploadIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'

import * as S from './styles'

interface BannerSectionProps {
  section: MenuSection
  isEditMode?: boolean
  onUpdate?: (section: MenuSection) => void
  onRemove?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  onPendingFileChange?: (sectionIndex: number, file: File | null) => void
  sectionIndex?: number
}

export const BannerSection = ({
  section,
  isEditMode = false,
  onUpdate,
  onRemove,
  sectionDefinitions = [],
  onPendingFileChange,
  sectionIndex
}: BannerSectionProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [imageError, setImageError] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sectionDefinitions.length > 0) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions])

  useEffect(() => {
    if (section.config.imagePath) {
      setImageError(false)
    }
  }, [section.config.imagePath])

  useEffect(() => {
    if (isEditMode) {
      setImageError(false)
    }
  }, [isEditMode])

  useEffect(() => {
    if (section.config.imagePath && pendingFile) {
      if (!section.config.imagePath.startsWith('blob:')) {
        setPendingFile(null)
        if (onPendingFileChange && sectionIndex !== undefined) {
          onPendingFileChange(sectionIndex, null)
        }
      }
    }
  }, [section.config.imagePath, pendingFile, onPendingFileChange, sectionIndex])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !onUpdate) return
    setIsUploading(true)
    setImageError(false)
    try {
      const imageUrl = URL.createObjectURL(file)
      setPendingFile(file)
      if (onPendingFileChange && sectionIndex !== undefined) {
        onPendingFileChange(sectionIndex, file)
      }
      const updatedSection: MenuSection = {
        ...section,
        config: {
          imagePath: imageUrl
        }
      }
      onUpdate(updatedSection)
    } catch (error) {
      console.error('Error processing image:', error)
      toast.error('Erro ao processar imagem')
      setImageError(true)
    } finally {
      setIsUploading(false)
    }
  }

  const handleUpdateImage = () => {
    fileInputRef.current?.click()
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const imgSrc = event.currentTarget.src
    if (imgSrc === section.config.imagePath && !isUploading) {
      setImageError(true)
    }
  }

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const imgSrc = event.currentTarget.src
    if (imgSrc === section.config.imagePath) {
      setImageError(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  if (isEditMode) {
    return (
      <S.EditContainer>
        <S.EditHeader>
          <S.EditTitle>
            <ImageIcon size={20} />
            <span>Banner</span>
          </S.EditTitle>
          {onRemove && (
            <Button variant="ghost" size="sm" onClick={onRemove}>
              <TrashIcon size={16} />
              Remover
            </Button>
          )}
        </S.EditHeader>
        <S.EditContent>
          {section.config.imagePath && !imageError ? (
            <S.ImagePreview>
              <img
                key={section.config.imagePath}
                src={section.config.imagePath}
                alt="Banner preview"
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <S.ImageOverlay>
                <Button variant="ghost" size="sm" onClick={handleUpdateImage} disabled={isUploading}>
                  <UploadIcon size={16} />
                  Atualizar
                </Button>
              </S.ImageOverlay>
            </S.ImagePreview>
          ) : (
            <S.UploadArea onClick={handleUploadClick}>
              <UploadIcon size={32} />
              <span>
                {imageError
                  ? 'Imagem não encontrada. Clique para fazer upload de uma nova imagem.'
                  : 'Clique para fazer upload da imagem'}
              </span>
              <span className="subtitle">PNG, JPG até 5MB</span>
            </S.UploadArea>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          {isUploading && (
            <S.UploadingOverlay>
              <S.LoadingSpinner />
              <span>Fazendo upload...</span>
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

  if (!section.config.imagePath) {
    return null
  }

  if (imageError) {
    return (
      <S.FallbackContainer>
        <S.FallbackContent>
          <ImageIcon size={48} />
          <span>Imagem não disponível</span>
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
            <S.BannerImage
              key={section.config.imagePath}
              src={section.config.imagePath}
              alt="Banner"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
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
              <span>Banner</span>
            </S.PreviewTitle>
            {onRemove && (
              <Button variant="ghost" size="sm" onClick={onRemove}>
                <TrashIcon size={16} />
              </Button>
            )}
          </S.PreviewHeader>
          <S.ViewContainer>
            <S.BannerImage
              key={section.config.imagePath}
              src={section.config.imagePath}
              alt="Banner"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </S.ViewContainer>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
