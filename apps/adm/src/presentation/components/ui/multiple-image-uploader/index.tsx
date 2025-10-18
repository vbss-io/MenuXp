import { CameraIcon, TrashIcon, StarIcon } from '@phosphor-icons/react'
import { useState, useRef } from 'react'

import * as S from './styles'

interface MultipleImageUploaderProps {
  label: string
  maxImages?: number
  existingImages?: string[]
  onChange: (medias: File[], removeMedias: string[]) => void
  error?: string
}

export const MultipleImageUploader = ({
  label,
  maxImages = 5,
  existingImages = [],
  onChange,
  error
}: MultipleImageUploaderProps) => {
  const [images, setImages] = useState<File[]>([])
  const [removeMedias, setRemoveMedias] = useState<string[]>([])
  const [coverIndex, setCoverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).slice(0, maxImages - images.length)
      setImages(prev => [...prev, ...newImages])
      onChange([...images, ...newImages], removeMedias)
    }
    if (event.target) {
      event.target.value = ''
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onChange(newImages, removeMedias)
  }

  const handleRemoveExisting = (url: string) => {
    const updatedRemoveMedias = [...removeMedias, url]
    setRemoveMedias(updatedRemoveMedias)
    onChange(images, updatedRemoveMedias)
  }

  const handleSetCover = (index: number) => {
    setCoverIndex(index)
  }

  const renderImages = () => {
    const allImages = [...images, ...existingImages.filter(url => !removeMedias.includes(url))]
    
    return allImages.map((image, index) => {
      const isFile = image instanceof File
      const src = isFile ? URL.createObjectURL(image) : image
      const isCover = coverIndex === index
      
      return (
        <S.ImageContainer key={index}>
          <S.ImagePreview src={src} alt={`Preview ${index + 1}`} />
          <S.ButtonsContainer>
            <S.CoverBadge 
              active={isCover} 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSetCover(index)
              }}
              title="Definir como capa"
            >
              <StarIcon size={12} weight={isCover ? "fill" : "regular"} />
            </S.CoverBadge>
            <S.RemoveButton 
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                isFile ? handleRemoveImage(index) : handleRemoveExisting(image as string)
              }} 
              title="Remover imagem"
            >
              <TrashIcon size={14} />
            </S.RemoveButton>
          </S.ButtonsContainer>
        </S.ImageContainer>
      )
    })
  }

  const totalImages = images.length + existingImages.length - removeMedias.length

  return (
    <S.Container>
      <S.HeaderRow>
        <S.Label>{label}</S.Label>
        <S.Counter>{totalImages}/{maxImages}</S.Counter>
      </S.HeaderRow>
      
      <S.RulesContainer>
        <S.RuleItem>Formatos: JPG, PNG, WEBP, MP4</S.RuleItem>
        <S.RuleItem>Máximo: {maxImages} arquivos</S.RuleItem>
        <S.RuleItem>Tamanho: até 10 MB cada</S.RuleItem>
        <S.RuleItem>Clique na estrela para definir capa</S.RuleItem>
      </S.RulesContainer>

      <S.MainGrid>
        <S.UploadWrapper>
          <S.UploadLabel htmlFor="image-upload">
            <CameraIcon size={24} />
            <S.UploadText>Adicionar Imagens/Vídeos</S.UploadText>
          </S.UploadLabel>
          <S.UploadInput
            id="image-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleImageChange}
          />
        </S.UploadWrapper>
        
        {renderImages()}
      </S.MainGrid>

      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  )
}