import { ImageIcon, PencilIcon, TrashIcon, UploadIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { UpdateBannerSectionUsecase } from '@/application/menu-layouts/sections/update-banner-section.usecase'
import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { Chip } from '@/presentation/components/ui/chip'
import { FormInput } from '@/presentation/components/ui/form-input'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from './styles'

type BannerSectionMode = 'view' | 'preview-edit' | 'edit' | 'add'

interface BannerSectionProps {
  section?: MenuSection
  mode: BannerSectionMode
  onRemove?: () => void
  onEdit?: () => void
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  position?: number
}

export const BannerSection = ({
  section,
  mode,
  onRemove,
  onEdit,
  onSectionUpdated,
  onClose,
  sectionDefinitions = [],
  layoutId,
  position: _position
}: BannerSectionProps) => {
  const { restaurant } = useRestaurant()
  const [isUploading, setIsUploading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [imageError, setImageError] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [tag, setTag] = useState(section?.config.tag || '')
  const [title, setTitle] = useState(section?.config.title || '')
  const [subtitle, setSubtitle] = useState(section?.config.subtitle || '')
  const [bannerSize, setBannerSize] = useState({ width: 0, height: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  const primaryColor = restaurant?.style?.primaryColor || '#FF0000'

  // Debug: Log banner size changes
  console.log('📏 Current banner size:', bannerSize)

  // Calculate responsive sizes based on banner width
  const calculateTagScale = () => {
    if (bannerSize.width === 0) return 1
    const minScale = 0.5
    const maxScale = 1.2
    const scale = Math.max(minScale, Math.min(maxScale, bannerSize.width / 800))
    return scale
  }

  const calculateTitleSize = () => {
    if (bannerSize.width === 0) return '1.5rem'
    const minSize = 1.2
    const maxSize = 2.5
    const size = Math.max(minSize, Math.min(maxSize, 1.2 + (bannerSize.width / 800) * 1.3))
    return `${size}rem`
  }

  const calculateSubtitleSize = () => {
    if (bannerSize.width === 0) return '1rem'
    const minSize = 0.9
    const maxSize = 1.25
    const size = Math.max(minSize, Math.min(maxSize, 0.9 + (bannerSize.width / 800) * 0.35))
    return `${size}rem`
  }

  useEffect(() => {
    if (sectionDefinitions.length > 0 && section) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions])

  useEffect(() => {
    if (section?.config.imagePath) {
      setImageError(false)
    }
  }, [section?.config.imagePath])

  useEffect(() => {
    if (section) {
      setTag(section.config.tag || '')
      setTitle(section.config.title || '')
      setSubtitle(section.config.subtitle || '')
    }
  }, [section])

  useEffect(() => {
    if (!bannerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setBannerSize({ width, height })
        console.log('🔍 Banner size changed:', { width, height })
      }
    })

    resizeObserver.observe(bannerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    const imageUrl = URL.createObjectURL(file)
    setPreviewUrl(imageUrl)
  }

  const handleAddSection = async () => {
    if (!layoutId || _position === undefined || _position === null) {
      toast.error('Erro: informações de layout inválidas')
      return
    }

    if (!selectedFile) {
      toast.error('Selecione uma imagem')
      return
    }

    setIsUploading(true)
    try {
      const addSectionUsecase = new AddSectionUsecase()
      const newSection: MenuSection = {
        type: MenuSectionType.BANNER,
        config: {}
      }

      await addSectionUsecase.execute({
        layoutId,
        section: newSection,
        position: _position,
        tag: tag || undefined,
        title: title || undefined,
        subtitle: subtitle || undefined,
        files: [selectedFile]
      })

      onSectionUpdated?.()
      onClose?.()
      toast.success('Banner adicionado com sucesso!')
    } catch {
      toast.error('Erro ao adicionar banner')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!section?.id || !layoutId) {
      toast.error('Erro: informações da seção inválidas')
      return
    }

    if (
      !selectedFile &&
      tag === (section.config.tag || '') &&
      title === (section.config.title || '') &&
      subtitle === (section.config.subtitle || '')
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

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const imgSrc = event.currentTarget.src
    if (imgSrc === section?.config.imagePath && !isUploading) {
      setImageError(true)
    }
  }

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const imgSrc = event.currentTarget.src
    if (imgSrc === section?.config.imagePath) {
      setImageError(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const currentImagePath = previewUrl || section?.config.imagePath
  const displayImagePath = mode === 'add' ? previewUrl : currentImagePath

  if (mode === 'view') {
    if (!section?.config.imagePath || imageError) {
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
          <S.ViewContainer ref={bannerRef}>
            <S.BannerImage
              key={currentImagePath}
              src={currentImagePath}
              alt="Banner"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <S.BannerOverlay>
              {section.config.tag && (
                <S.TagContainer style={{ transform: `scale(${calculateTagScale()})`, transformOrigin: 'top left' }}>
                  <Chip backgroundColor={primaryColor} size="sm" noBorder padding="10px 20px">
                    {section.config.tag}
                  </Chip>
                </S.TagContainer>
              )}
              {(section.config.title || section.config.subtitle) && (
                <S.TextContainer>
                  {section.config.title && (
                    <S.BannerTitle style={{ fontSize: calculateTitleSize() }}>{section.config.title}</S.BannerTitle>
                  )}
                  {section.config.subtitle && (
                    <S.BannerSubtitle style={{ fontSize: calculateSubtitleSize() }}>
                      {section.config.subtitle}
                    </S.BannerSubtitle>
                  )}
                </S.TextContainer>
              )}
            </S.BannerOverlay>
          </S.ViewContainer>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (mode === 'preview-edit') {
    if (!section?.config.imagePath) {
      return (
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>
              <ImageIcon size={20} />
              <span>Banner</span>
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
              <span>Banner sem imagem</span>
            </S.FallbackContent>
          </S.FallbackContainer>
        </S.PreviewContainer>
      )
    }

    if (imageError) {
      return (
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>
              <ImageIcon size={20} />
              <span>Banner</span>
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
              <span>Imagem não disponível</span>
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
                <span>Banner</span>
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
            <S.ViewContainer ref={bannerRef}>
              <S.BannerImage
                key={currentImagePath}
                src={currentImagePath}
                alt="Banner"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              <S.BannerOverlay>
                {section.config.tag && (
                  <S.TagContainer style={{ transform: `scale(${calculateTagScale()})`, transformOrigin: 'top left' }}>
                    <Chip backgroundColor={primaryColor} size="sm" noBorder padding="10px 20px">
                      {section.config.tag}
                    </Chip>
                  </S.TagContainer>
                )}
                {(section.config.title || section.config.subtitle) && (
                  <S.TextContainer>
                    {section.config.title && (
                      <S.BannerTitle style={{ fontSize: calculateTitleSize() }}>{section.config.title}</S.BannerTitle>
                    )}
                    {section.config.subtitle && (
                      <S.BannerSubtitle style={{ fontSize: calculateSubtitleSize() }}>
                        {section.config.subtitle}
                      </S.BannerSubtitle>
                    )}
                  </S.TextContainer>
                )}
              </S.BannerOverlay>
            </S.ViewContainer>
          </S.PreviewContainer>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (mode === 'edit') {
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

  if (mode === 'add') {
    return (
      <S.EditContainer>
        <S.EditHeader>
          <S.EditTitle>
            <ImageIcon size={20} />
            <span>Novo Banner</span>
          </S.EditTitle>
        </S.EditHeader>

        <S.EditContent>
          {displayImagePath ? (
            <S.ImagePreview>
              <img
                src={displayImagePath}
                alt="Banner preview"
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
              <span>Clique para selecionar uma imagem</span>
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
                register={() => ({})}
              />
            </S.FormField>
            <S.FormField>
              <FormInput
                id="title"
                label="Título (opcional)"
                placeholder="Ex: Costela Fire"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                register={() => ({})}
              />
            </S.FormField>
            <S.FormField>
              <FormInput
                id="subtitle"
                label="Subtítulo (opcional)"
                placeholder="Ex: Bebida grátis"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                register={() => ({})}
              />
            </S.FormField>
          </S.FormFields>

          {isUploading && (
            <S.UploadingOverlay>
              <S.LoadingSpinner />
              <span>Adicionando banner...</span>
            </S.UploadingOverlay>
          )}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button variant="ghost" onClick={onClose} disabled={isUploading}>
              Cancelar
            </Button>
            <Button onClick={handleAddSection} disabled={isUploading || !selectedFile}>
              {isUploading ? 'Adicionando...' : 'Adicionar Banner'}
            </Button>
          </div>
        </S.EditContent>
      </S.EditContainer>
    )
  }

  return null
}
