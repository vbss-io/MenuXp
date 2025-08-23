import {
  CaretLeftIcon,
  CaretRightIcon,
  ImageIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
  WarningIcon,
  XIcon
} from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { UpdateCarouselSectionUsecase } from '@/application/menu-layouts/sections/update-carousel-section.usecase'
import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from './styles'

type CarouselSectionMode = 'view' | 'preview-edit' | 'edit' | 'add'

interface CarouselSectionProps {
  section?: MenuSection
  mode: CarouselSectionMode
  onRemove?: () => void
  onEdit?: () => void
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  position?: number
}

export const CarouselSection = ({
  section,
  mode,
  onRemove,
  onEdit,
  onSectionUpdated,
  onClose: _onClose,
  sectionDefinitions = [],
  layoutId,
  position: _position
}: CarouselSectionProps) => {
  const { restaurant } = useRestaurant()
  const [isUploading, setIsUploading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [imageErrors, setImageErrors] = useState<boolean[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [removedMediaPaths, setRemovedMediaPaths] = useState<string[]>([])
  const multiFileInputRef = useRef<HTMLInputElement>(null)
  const singleFileInputRef = useRef<HTMLInputElement>(null)
  const autoPlayInterval = useRef<NodeJS.Timeout>()

  const imagePaths = useMemo(() => {
    const paths = section?.config.imagePaths as string[]
    return Array.isArray(paths) ? paths : []
  }, [section?.config.imagePaths])

  const maxImages = 5
  const minImages = 2
  const primaryColor = restaurant?.style?.primaryColor || '#FF0000'

  useEffect(() => {
    if (sectionDefinitions.length > 0 && section) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions])

  useEffect(() => {
    if (mode === 'view' && imagePaths.length > 1 && isAutoPlaying) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length)
      }, 4000)
    }
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current)
      }
    }
  }, [mode, imagePaths.length, isAutoPlaying])

  useEffect(() => {
    setImageErrors(new Array(imagePaths.length).fill(false))
  }, [imagePaths.length])

  const handleMultipleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const totalFiles = selectedFiles.length + files.length

    if (totalFiles > maxImages) {
      toast.error(`Máximo de ${maxImages} imagens permitidas`)
      return
    }

    setSelectedFiles((prev) => [...prev, ...files])
    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls((prev) => [...prev, ...urls])
  }

  const handleSingleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const totalFiles = selectedFiles.length + 1

    if (totalFiles > maxImages) {
      toast.error(`Máximo de ${maxImages} imagens permitidas`)
      return
    }

    setSelectedFiles((prev) => [...prev, file])
    const url = URL.createObjectURL(file)
    setPreviewUrls((prev) => [...prev, url])
  }

  const handleRemovePreviewFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newUrls = previewUrls.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    setPreviewUrls(newUrls)
  }

  const handleRemoveExistingMedia = (mediaUrl: string) => {
    setRemovedMediaPaths((prev) => [...prev, mediaUrl])
  }

  const handleAddSection = async () => {
    if (!layoutId || _position === undefined || _position === null) {
      toast.error('Erro: informações de layout inválidas')
      return
    }

    if (selectedFiles.length < minImages) {
      toast.error(`Selecione pelo menos ${minImages} imagens`)
      return
    }

    setIsUploading(true)
    try {
      const addSectionUsecase = new AddSectionUsecase()
      const newSection: MenuSection = {
        type: MenuSectionType.CAROUSEL,
        config: {}
      }

      await addSectionUsecase.execute({
        layoutId,
        section: newSection,
        position: _position,
        files: selectedFiles
      })

      onSectionUpdated?.()
      _onClose?.()
      toast.success('Carousel adicionado com sucesso!')
    } catch {
      toast.error('Erro ao adicionar carousel')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSaveChanges = async () => {
    if (!section?.id || !layoutId) {
      toast.error('Erro: informações da seção inválidas')
      return
    }

    if (selectedFiles.length === 0 && removedMediaPaths.length === 0) {
      _onClose?.()
      return
    }

    setIsUploading(true)
    try {
      const updateCarouselUsecase = new UpdateCarouselSectionUsecase()
      await updateCarouselUsecase.execute({
        layoutId,
        sectionId: section.id,
        files: selectedFiles.length > 0 ? selectedFiles : undefined,
        removeMedias: removedMediaPaths.length > 0 ? removedMediaPaths : undefined
      })

      setSelectedFiles([])
      setPreviewUrls([])
      setRemovedMediaPaths([])
      onSectionUpdated?.()
      _onClose?.()
      toast.success('Carousel atualizado com sucesso!')
    } catch {
      toast.error('Erro ao atualizar carousel')
    } finally {
      setIsUploading(false)
    }
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

  const validImages = imagePaths.filter((path) => path && !imageErrors[imagePaths.indexOf(path)])

  // Modo 1: VIEW - Visualização normal (preview e clientes)
  if (mode === 'view') {
    if (!imagePaths.length || imagePaths.every((path) => !path) || !validImages.length) {
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
                        style={{
                          backgroundColor: index === currentImageIndex ? primaryColor : undefined
                        }}
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

  // Modo 2: PREVIEW-EDIT - Visualização no preview com controles de exclusão
  if (mode === 'preview-edit') {
    if (!imagePaths.length || imagePaths.every((path) => !path)) {
      return (
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>
              <ImageIcon size={20} />
              <span>Carousel</span>
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
              <ImageIcon size={48} />
              <span>Carousel sem imagens</span>
            </S.FallbackContent>
          </S.FallbackContainer>
        </S.PreviewContainer>
      )
    }

    if (!validImages.length) {
      return (
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>
              <ImageIcon size={20} />
              <span>Carousel</span>
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
              <WarningIcon size={48} />
              <span>Imagens não disponíveis</span>
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
                <span>Carousel</span>
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
                          style={{
                            backgroundColor: index === currentImageIndex ? primaryColor : undefined
                          }}
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

  // Modo 3: ADD - Interface para adicionar nova seção
  if (mode === 'add') {
    return (
      <S.EditContainer>
        <S.EditHeader>
          <S.EditTitle>
            <ImageIcon size={20} />
            <span>Adicionar Carousel</span>
          </S.EditTitle>
        </S.EditHeader>

        <S.EditContent>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Selecione de {minImages} a {maxImages} imagens para criar um carousel interativo.
            </p>
          </div>

          {previewUrls.length > 0 ? (
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Imagens selecionadas ({previewUrls.length})
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                {previewUrls.map((url, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #e0e0e0'
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePreviewFile(index)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        minWidth: '24px',
                        height: '24px',
                        padding: '0',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      <XIcon size={12} />
                    </Button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="ghost" size="sm" onClick={() => singleFileInputRef.current?.click()}>
                  <PlusIcon size={16} />
                  Adicionar Imagem
                </Button>
                <Button variant="ghost" size="sm" onClick={() => multiFileInputRef.current?.click()}>
                  <UploadIcon size={16} />
                  Adicionar Múltiplas
                </Button>
              </div>
            </div>
          ) : (
            <S.UploadArea onClick={() => singleFileInputRef.current?.click()}>
              <UploadIcon size={32} />
              <span>Clique para selecionar imagens</span>
              <span className="subtitle">PNG, JPG até 5MB cada</span>
            </S.UploadArea>
          )}

          <input
            ref={multiFileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleMultipleFilesChange}
            style={{ display: 'none' }}
          />

          <input
            ref={singleFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSingleFileChange}
            style={{ display: 'none' }}
          />

          {isUploading && (
            <S.UploadingOverlay>
              <S.LoadingSpinner />
              <span>Adicionando carousel...</span>
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

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button variant="ghost" onClick={_onClose} disabled={isUploading}>
              Cancelar
            </Button>
            <Button onClick={handleAddSection} disabled={isUploading || selectedFiles.length < minImages}>
              {isUploading ? 'Adicionando...' : 'Adicionar Carousel'}
            </Button>
          </div>
        </S.EditContent>
      </S.EditContainer>
    )
  }

  // Modo 4: EDIT - Visualização de edição (usada no SectionDialog)
  if (mode === 'edit') {
    return (
      <S.EditContainer>
        <S.EditHeader>
          <S.EditTitle>
            <ImageIcon size={20} />
            <span>Carousel</span>
          </S.EditTitle>
        </S.EditHeader>

        <S.EditContent>
          {/* Imagens atuais */}
          {imagePaths.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Imagens atuais</h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                {imagePaths.map((imagePath, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={imagePath}
                      alt={`Current ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #e0e0e0',
                        opacity: removedMediaPaths.includes(imagePath) ? 0.5 : 1
                      }}
                      onError={() => handleImageError(index)}
                      onLoad={() => handleImageLoad(index)}
                    />
                    {!removedMediaPaths.includes(imagePath) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveExistingMedia(imagePath)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          minWidth: '24px',
                          height: '24px',
                          padding: '0',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        <XIcon size={12} />
                      </Button>
                    )}
                    {removedMediaPaths.includes(imagePath) && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'rgba(255, 0, 0, 0.8)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}
                      >
                        Será removida
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Novas imagens */}
          {previewUrls.length > 0 ? (
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Novas imagens</h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                {previewUrls.map((url, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #e0e0e0'
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePreviewFile(index)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        minWidth: '24px',
                        height: '24px',
                        padding: '0',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      <XIcon size={12} />
                    </Button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="ghost" size="sm" onClick={() => singleFileInputRef.current?.click()}>
                  <PlusIcon size={16} />
                  Adicionar Imagem
                </Button>
                <Button variant="ghost" size="sm" onClick={() => multiFileInputRef.current?.click()}>
                  <UploadIcon size={16} />
                  Adicionar Múltiplas
                </Button>
              </div>
            </div>
          ) : (
            <S.UploadArea onClick={() => singleFileInputRef.current?.click()}>
              <UploadIcon size={32} />
              <span>Clique para selecionar novas imagens</span>
              <span className="subtitle">PNG, JPG até 5MB cada</span>
            </S.UploadArea>
          )}

          <input
            ref={multiFileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleMultipleFilesChange}
            style={{ display: 'none' }}
          />

          <input
            ref={singleFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSingleFileChange}
            style={{ display: 'none' }}
          />

          {isUploading && (
            <S.UploadingOverlay>
              <S.LoadingSpinner />
              <span>Atualizando carousel...</span>
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

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button variant="ghost" onClick={_onClose} disabled={isUploading}>
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges} disabled={isUploading}>
              {isUploading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </S.EditContent>
      </S.EditContainer>
    )
  }

  return null
}
