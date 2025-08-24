import { ImageIcon, UploadIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection, BannerConfig } from '@/domain/models/menu-layout.model'

import { FormInput } from '@/presentation/components/ui/form-input'

import * as S from '../styles'

interface BannerAddProps {
  layoutId: string
  position: number
  onSectionUpdated?: () => void
  onClose?: () => void
}

export const BannerAdd: React.FC<BannerAddProps> = ({
  layoutId,
  position,
  onSectionUpdated,
  onClose
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [tag, setTag] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    const imageUrl = URL.createObjectURL(file)
    setPreviewUrl(imageUrl)
  }

  const handleAddSection = async () => {
    if (!layoutId || position === undefined || position === null) {
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
        config: {
          tag: tag || undefined,
          title: title || undefined,
          subtitle: subtitle || undefined
        } as BannerConfig
      }

      await addSectionUsecase.execute({
        layoutId,
        section: newSection,
        position,
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

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <S.EditContainer>
      <S.EditHeader>
        <S.EditTitle>
          <ImageIcon size={20} />
          <span>Novo Banner</span>
        </S.EditTitle>
      </S.EditHeader>

      <S.EditContent>
        {previewUrl ? (
          <S.ImagePreview>
            <img
              src={previewUrl}
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
