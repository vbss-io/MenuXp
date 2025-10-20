import { UploadIcon, WarningIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { UpdateBannerSectionUsecase } from '@/application/menu-layouts/sections/update-banner-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection, BannerConfig } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { Button } from '@menuxp/ui'
import { FormInput } from '@/presentation/components/ui/form-input'
import { Loading } from '@/presentation/components/ui/loading'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'

import * as S from '../styles'

interface BannerEditProps {
  section?: MenuSection
  layoutId: string
  position?: number
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
}

export const BannerEdit: React.FC<BannerEditProps> = ({
  section,
  layoutId,
  position,
  onSectionUpdated,
  onClose,
  sectionDefinitions = []
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [imageError, setImageError] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [tag, setTag] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isEditing = !!section

  const getBannerData = (): BannerConfig | null => {
    if (!section || section.type !== MenuSectionType.BANNER) return null
    return section.config as BannerConfig
  }
  const bannerData = getBannerData()
  useEffect(() => {
    if (sectionDefinitions.length > 0 && section && isEditing) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions, isEditing])

  useEffect(() => {
    if (bannerData?.imagePath) {
      setImageError(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  useEffect(() => {
    if (bannerData) {
      setTag(bannerData?.tag || '')
      setTitle(bannerData?.title || '')
      setSubtitle(bannerData?.subtitle || '')
    }
  }, [bannerData])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    const imageUrl = URL.createObjectURL(file)
    setPreviewUrl(imageUrl)
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
      if (
        !selectedFile &&
        tag === (bannerData?.tag || '') &&
        title === (bannerData?.title || '') &&
        subtitle === (bannerData?.subtitle || '')
      ) {
        onClose?.()
        return
      }
    } else {
      if (!selectedFile) {
        toast.error('Selecione uma imagem')
        return
      }
      if (position === undefined || position === null) {
        toast.error('Erro: posição da seção inválida')
        return
      }
    }

    setIsLoading(true)
    setImageError(false)
    try {
      if (isEditing) {
        const updateBannerUsecase = new UpdateBannerSectionUsecase()
        await updateBannerUsecase.execute({
          layoutId,
          sectionId: section!.id!,
          tag: tag || undefined,
          title: title || undefined,
          subtitle: subtitle || undefined,
          files: selectedFile ? [selectedFile] : undefined
        })
        toast.success('Banner atualizado com sucesso!')
      } else {
        const addSectionUsecase = new AddSectionUsecase()
        const newSection: MenuSection = {
          type: MenuSectionType.BANNER,
          config: {
            tag: tag || undefined,
            title: title || undefined,
            subtitle: subtitle || undefined
          } as BannerConfig
        }

        await addSectionUsecase.execute({
          layoutId,
          section: newSection,
          position: position!,
          files: [selectedFile!]
        })
        toast.success('Banner adicionado com sucesso!')
      }
      onSectionUpdated?.()
      onClose?.()
    } catch {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'adicionar'} banner`)
      setImageError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageError(false)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const getButtonText = () => {
    if (isLoading) return <Loading />
    return isEditing ? 'Salvar Alterações' : 'Adicionar Banner'
  }

  const currentImagePath = previewUrl || bannerData?.imagePath

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const formGroupVariants = {
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
        {currentImagePath && !imageError ? (
          <S.ImagePreview>
            <img
              key={currentImagePath}
              src={currentImagePath}
              alt="Banner preview"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{
                width: '100%',
                maxHeight: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}
            />
            <S.ImageOverlay>
              <Button
                variant="primary"
                size="sm"
                onClick={handleUploadClick}
                disabled={isLoading}
                leftIcon={<UploadIcon size={16} />}
              >
                Trocar Imagem
              </Button>
            </S.ImageOverlay>
          </S.ImagePreview>
        ) : (
          <S.UploadArea onClick={handleUploadClick}>
            <UploadIcon size={32} />
            <span>
              {imageError
                ? 'Imagem não encontrada. Clique para fazer upload de uma nova imagem.'
                : 'Clique para selecionar uma imagem'}
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
        <S.FormFields>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="tag"
              label="Tag (opcional)"
              placeholder="Ex: Combo do Dia"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              fontSize="sm"
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="title"
              label="Título (opcional)"
              placeholder="Ex: Costela Fire"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fontSize="sm"
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="subtitle"
              label="Subtítulo (opcional)"
              placeholder="Ex: Bebida grátis"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              fontSize="sm"
            />
          </S.FormGroup>
        </S.FormFields>
        {isLoading && (
          <S.UploadingOverlay>
            <Loading />
            <span>{isEditing ? 'Fazendo upload...' : 'Adicionando banner...'}</span>
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
            <Button onClick={handleSave} disabled={isLoading}>
              {getButtonText()}
            </Button>
          </motion.div>
        </S.ModalFooter>
      </S.EditContent>
    </S.EditContainer>
  )
}
