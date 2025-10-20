import { PlusIcon, UploadIcon, WarningIcon, XIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useMemo, useRef, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { UpdateCarouselSectionUsecase } from '@/application/menu-layouts/sections/update-carousel-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { CarouselConfig, MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { Button } from '@menuxp/ui'
import { Loading } from '@/presentation/components/ui/loading'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'

import * as S from '../styles'

interface CarouselEditProps {
  section?: MenuSection
  layoutId: string
  position?: number
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
}

export const CarouselEdit: React.FC<CarouselEditProps> = ({
  section,
  layoutId,
  position,
  onSectionUpdated,
  onClose,
  sectionDefinitions = []
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [imageErrors, setImageErrors] = useState<boolean[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [removedMediaPaths, setRemovedMediaPaths] = useState<string[]>([])
  const multiFileInputRef = useRef<HTMLInputElement>(null)
  const singleFileInputRef = useRef<HTMLInputElement>(null)

  const isEditing = !!section

  const imagePaths = useMemo(() => {
    if (!section || section.type !== MenuSectionType.CAROUSEL) return []
    const config = section.config as CarouselConfig
    const paths = config?.imagePaths as string[]
    return Array.isArray(paths) ? paths : []
  }, [section])

  const maxImages = 5
  const minImages = 2

  useEffect(() => {
    if (sectionDefinitions.length > 0 && section && isEditing) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions, isEditing])

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

  const handleSave = async () => {
    if (!layoutId) {
      toast.error('Erro: informações de layout inválidas')
      return
    }

    if (isEditing) {
      if (!section?.id) {
        toast.error('Erro: informações da seção inválidas')
        return
      }
      if (selectedFiles.length === 0 && removedMediaPaths.length === 0) {
        onClose?.()
        return
      }
    } else {
      if (selectedFiles.length < minImages) {
        toast.error(`Selecione pelo menos ${minImages} imagens`)
        return
      }
      if (position === undefined || position === null) {
        toast.error('Erro: posição da seção inválida')
        return
      }
    }

    setIsLoading(true)
    try {
      if (isEditing) {
        const updateCarouselUsecase = new UpdateCarouselSectionUsecase()
        if (!section.id) {
          toast.error('Erro: informações da seção inválidas')
          return
        }
        await updateCarouselUsecase.execute({
          layoutId,
          sectionId: section.id,
          files: selectedFiles.length > 0 ? selectedFiles : undefined,
          removeMedias: removedMediaPaths.length > 0 ? removedMediaPaths : undefined
        })
        setSelectedFiles([])
        setPreviewUrls([])
        setRemovedMediaPaths([])
        toast.success('Carousel atualizado com sucesso!')
      } else {
        const addSectionUsecase = new AddSectionUsecase()
        const newSection: MenuSection = {
          type: MenuSectionType.CAROUSEL,
          config: {}
        }
        await addSectionUsecase.execute({
          layoutId,
          section: newSection,
          position: position!,
          files: selectedFiles
        })
        toast.success('Carousel adicionado com sucesso!')
      }
      onSectionUpdated?.()
      onClose?.()
    } catch {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'adicionar'} carousel`)
    } finally {
      setIsLoading(false)
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

  const getButtonText = () => {
    if (isLoading) return <Loading />
    return isEditing ? 'Salvar Alterações' : 'Adicionar Carousel'
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <S.EditContainer variants={containerVariants} initial="hidden" animate="visible">
      <S.EditContent>
        {!isEditing && (
          <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
            Selecione de {minImages} a {maxImages} imagens para criar um carousel interativo.
          </p>
        )}
        {imagePaths.length > 0 && (
          <motion.div variants={sectionVariants}>
            <S.SectionTitle>Imagens atuais</S.SectionTitle>
            <S.ImagesGrid>
              {imagePaths.map((imagePath, index) => (
                <S.ImagePreview key={index}>
                  <img
                    src={imagePath}
                    alt={`Current ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      opacity: removedMediaPaths.includes(imagePath) ? 0.5 : 1
                    }}
                    onError={() => handleImageError(index)}
                    onLoad={() => handleImageLoad(index)}
                  />
                  {!removedMediaPaths.includes(imagePath) && (
                    <S.RemoveButton
                      onClick={() => handleRemoveExistingMedia(imagePath)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <XIcon size={12} />
                    </S.RemoveButton>
                  )}
                  {removedMediaPaths.includes(imagePath) && (
                    <S.RemovedOverlay>
                      <span>Será removida</span>
                    </S.RemovedOverlay>
                  )}
                </S.ImagePreview>
              ))}
            </S.ImagesGrid>
          </motion.div>
        )}
        {previewUrls.length > 0 ? (
          <motion.div variants={sectionVariants}>
            <S.SectionTitle>Novas imagens</S.SectionTitle>
            <S.ImagesGrid>
              {previewUrls.map((url, index) => (
                <S.ImagePreview key={index}>
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0'
                    }}
                  />
                  <S.RemoveButton
                    onClick={() => handleRemovePreviewFile(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XIcon size={12} />
                  </S.RemoveButton>
                </S.ImagePreview>
              ))}
            </S.ImagesGrid>
            <S.ActionButtons>
              <Button
                variant="outline"
                size="sm"
                onClick={() => singleFileInputRef.current?.click()}
                leftIcon={<PlusIcon size={16} />}
              >
                Adicionar Imagem
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => multiFileInputRef.current?.click()}
                leftIcon={<UploadIcon size={16} />}
              >
                Adicionar Múltiplas
              </Button>
            </S.ActionButtons>
          </motion.div>
        ) : (
          <S.UploadArea onClick={() => singleFileInputRef.current?.click()}>
            <UploadIcon size={32} />
            <span>Clique para selecionar {isEditing ? 'novas ' : ''}imagens</span>
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
        {isLoading && (
          <S.UploadingOverlay>
            <Loading />
            <span>{isEditing ? 'Atualizando carousel...' : 'Adicionando carousel...'}</span>
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
        <S.ModalFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSave} disabled={isLoading || (!isEditing && selectedFiles.length < minImages)}>
              {getButtonText()}
            </Button>
          </motion.div>
        </S.ModalFooter>
      </S.EditContent>
    </S.EditContainer>
  )
}
