import { ImageIcon, UploadIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { UpdateBannerSectionUsecase } from '@/application/menu-layouts/sections/update-banner-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection, BannerConfig } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { FormInput } from '@/presentation/components/ui/form-input'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'

import * as S from '../styles'

interface BannerEditProps {
  section: MenuSection
  layoutId: string
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
}

export const BannerEdit: React.FC<BannerEditProps> = ({
  section,
  layoutId,
  onSectionUpdated,
  onClose,
  sectionDefinitions = []
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [imageError, setImageError] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [tag, setTag] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Helper function para acessar dados do banner
  const getBannerData = (): BannerConfig | null => {
    if (!section || section.type !== MenuSectionType.BANNER) return null
    return section.config as BannerConfig
  }

  const bannerData = getBannerData()

  useEffect(() => {
    if (sectionDefinitions.length > 0 && section) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions])

  useEffect(() => {
    if (bannerData?.imagePath) {
      setImageError(false)
    }
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

  const handleSaveEdit = async () => {
    if (!section?.id || !layoutId) {
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

    setIsUploading(true)
    setImageError(false)

    try {
      const updateBannerUsecase = new UpdateBannerSectionUsecase()
      await updateBannerUsecase.execute({
        layoutId,
        sectionId: section.id!,
        tag: tag || undefined,
        title: title || undefined,
        subtitle: subtitle || undefined,
        files: selectedFile ? [selectedFile] : undefined
      })

      onSectionUpdated?.()
      onClose?.()
      toast.success('Banner atualizado com sucesso!')
    } catch {
      toast.error('Erro ao atualizar banner')
      setImageError(true)
    } finally {
      setIsUploading(false)
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

  const currentImagePath = previewUrl || bannerData?.imagePath

  return (
    <S.EditContainer>
      <S.EditHeader>
        <S.EditTitle>
          <ImageIcon size={20} />
          <span>Banner</span>
        </S.EditTitle>
      </S.EditHeader>

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
              <Button variant="ghost" size="sm" onClick={handleUploadClick} disabled={isUploading}>
                <UploadIcon size={16} />
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
          <S.FormField>
            <FormInput
              id="tag"
              label="Tag (opcional)"
              placeholder="Ex: Combo do Dia"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </S.FormField>
          <S.FormField>
            <FormInput
              id="title"
              label="Título (opcional)"
              placeholder="Ex: Costela Fire"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </S.FormField>
          <S.FormField>
            <FormInput
              id="subtitle"
              label="Subtítulo (opcional)"
              placeholder="Ex: Bebida grátis"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </S.FormField>
        </S.FormFields>

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

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="ghost" onClick={onClose} disabled={isUploading}>
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} disabled={isUploading}>
            {isUploading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </S.EditContent>
    </S.EditContainer>
  )
}
