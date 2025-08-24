import { ImageIcon, PlusIcon, UploadIcon, WarningIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'

import * as S from '../styles'

interface CarouselAddProps {
  layoutId: string
  position: number
  onSectionUpdated?: () => void
  onClose?: () => void
}

export const CarouselAdd: React.FC<CarouselAddProps> = ({ layoutId, position, onSectionUpdated, onClose }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const multiFileInputRef = useRef<HTMLInputElement>(null)
  const singleFileInputRef = useRef<HTMLInputElement>(null)

  const maxImages = 5
  const minImages = 2

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

  const handleAddSection = async () => {
    if (!layoutId || position === undefined || position === null) {
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
        position,
        files: selectedFiles
      })

      onSectionUpdated?.()
      onClose?.()
      toast.success('Carousel adicionado com sucesso!')
    } catch {
      toast.error('Erro ao adicionar carousel')
    } finally {
      setIsUploading(false)
    }
  }

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

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="ghost" onClick={onClose} disabled={isUploading}>
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
