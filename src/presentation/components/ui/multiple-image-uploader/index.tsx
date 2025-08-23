import { CameraIcon, XIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import * as S from './styles'

interface MultipleImageUploaderUploaderProps {
  label: string
  maxImages?: number
  existingImages?: string[]
  onChange: (medias: File[], removeMedias: string[]) => void
  error?: string
}

// To-Do: Refactor styles

export const MultipleImageUploader = ({
  label,
  maxImages = 3,
  existingImages = [],
  onChange,
  error
}: MultipleImageUploaderUploaderProps) => {
  const [previews, setPreviews] = useState<string[]>([])
  const [removeMedias, setRemoveMedias] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    const fileArray = Array.from(files)
    const totalImages = existingImages.length + previews.length - removeMedias.length + fileArray.length
    if (totalImages > maxImages) {
      alert(`Máximo de ${maxImages} imagens permitido`)
      return
    }
    const newPreviews: string[] = []
    const filesToAdd: File[] = []
    fileArray.forEach((file, index) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result as string)
        setPreviews([...previews, ...newPreviews])
      }
      reader.readAsDataURL(file)
      const newFile = new File([file], `media-${index}`, { type: file.type })
      filesToAdd.push(newFile)
    })

    const updatedFiles = [...newFiles, ...filesToAdd]
    setNewFiles(updatedFiles)
    onChange(updatedFiles, removeMedias)
  }

  const handleRemoveImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      const imageToRemove = existingImages[index]
      const updatedRemoveMedias = [...removeMedias, imageToRemove]
      setRemoveMedias(updatedRemoveMedias)
      onChange(newFiles, updatedRemoveMedias)
    } else {
      const newPreviews = [...previews]
      const newFilesToKeep = [...newFiles]
      newPreviews.splice(index, 1)
      newFilesToKeep.splice(index, 1)
      setPreviews(newPreviews)
      setNewFiles(newFilesToKeep)
      onChange(newFilesToKeep, removeMedias)
    }
  }

  const renderImages = () => {
    const elements = []
    existingImages.forEach((image, index) => {
      if (!removeMedias.includes(image)) {
        elements.push(
          <S.ImageWrapper key={`existing-${index}`}>
            <S.ImagePreview src={image} alt={`Imagem ${index + 1}`} />
            <S.RemoveButton
              className="remove-button"
              onClick={() => handleRemoveImage(index, true)}
              title="Remover imagem existente"
            >
              <XIcon size={12} weight="bold" />
            </S.RemoveButton>
          </S.ImageWrapper>
        )
      }
    })
    previews.forEach((preview, index) => {
      elements.push(
        <S.ImageWrapper key={`preview-${index}`}>
          <S.ImagePreview src={preview} alt={`Nova imagem ${index + 1}`} />
          <S.RemoveButton
            className="remove-button"
            onClick={() => handleRemoveImage(index, false)}
            title="Remover nova imagem"
          >
            <XIcon size={20} weight="bold" />
          </S.RemoveButton>
        </S.ImageWrapper>
      )
    })
    const totalImages = existingImages.length + previews.length - removeMedias.length
    if (totalImages < maxImages) {
      elements.push(
        <S.UploadWrapper key="upload">
          <S.UploadInput
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            id={`upload-${label.toLowerCase()}`}
          />
          <S.UploadLabel htmlFor={`upload-${label.toLowerCase()}`}>
            <CameraIcon size={24} />
          </S.UploadLabel>
        </S.UploadWrapper>
      )
    }
    return elements
  }

  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.ImageGrid>{renderImages()}</S.ImageGrid>
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  )
}
