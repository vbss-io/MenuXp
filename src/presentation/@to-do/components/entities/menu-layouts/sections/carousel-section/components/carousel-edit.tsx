import { ImageIcon, PlusIcon, UploadIcon, WarningIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useMemo, useRef, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { UpdateCarouselSectionUsecase } from '@/application/menu-layouts/sections/update-carousel-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { validateSection } from '@/presentation/hooks/use-menu-layouts'

import * as S from '../styles'

interface CarouselEditProps {
  section: MenuSection
  layoutId: string
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
}

export const CarouselEdit: React.FC<CarouselEditProps> = ({
  section,
  layoutId,
  onSectionUpdated,
  onClose,
  sectionDefinitions = []
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [imageErrors, setImageErrors] = useState<boolean[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [removedMediaPaths, setRemovedMediaPaths] = useState<string[]>([])
  const multiFileInputRef = useRef<HTMLInputElement>(null)
  const singleFileInputRef = useRef<HTMLInputElement>(null)

  const imagePaths = useMemo(() => {
    if (!section || section.type !== MenuSectionType.CAROUSEL) return []
    const config = section.config as any
    const paths = config?.imagePaths as string[]
    return Array.isArray(paths) ? paths : []
  }, [section])

  const maxImages = 5
  const minImages = 2

  useEffect(() => {
    if (sectionDefinitions.length > 0 && section) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions])

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

  const handleSaveChanges = async () => {
    if (!section?.id || !layoutId) {
      toast.error('Erro: informações da seção inválidas')
      return
    }

    if (selectedFiles.length === 0 && removedMediaPaths.length === 0) {
      onClose?.()
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
      onClose?.()
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
          <Button variant="ghost" onClick={onClose} disabled={isUploading}>
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
