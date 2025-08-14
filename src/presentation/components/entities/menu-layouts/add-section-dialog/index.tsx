import { Button } from '@vbss-ui/button'
import { Dialog } from '@vbss-ui/dialog'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { BannerSection } from '@/presentation/components/sections/banner-section'
import { CarouselSection } from '@/presentation/components/sections/carousel-section'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'

import * as S from './styles'

interface AddSectionDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (section: MenuSection, files?: File[]) => void
  sectionType: MenuSectionType
  sectionDefinitions: MenuSectionDefinition[]
  position: number
}

export const AddSectionDialog: React.FC<AddSectionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  sectionType,
  sectionDefinitions,
  position
}) => {
  const [section, setSection] = useState<MenuSection | null>(null)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [pendingFiles, setPendingFiles] = useState<(File | null)[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && sectionType) {
      const initialSection: MenuSection = {
        type: sectionType,
        config: sectionType === MenuSectionType.CAROUSEL ? { imagePaths: [] } : {}
      }
      setSection(initialSection)
      setPendingFile(null)
      setPendingFiles(sectionType === MenuSectionType.CAROUSEL ? [null, null] : [])
    }
  }, [isOpen, sectionType, position])

  const handleSectionUpdate = (updatedSection: MenuSection) => {
    setSection(updatedSection)
  }

  const handlePendingFileChange = (file: File | null, imageIndex?: number) => {
    if (sectionType === MenuSectionType.CAROUSEL && imageIndex !== undefined) {
      const newPendingFiles = [...pendingFiles]
      newPendingFiles[imageIndex] = file
      setPendingFiles(newPendingFiles)
    } else {
      setPendingFile(file)
    }
  }

  const handleConfirm = async () => {
    if (!section) return
    const validation = validateSection(section, sectionDefinitions)
    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error))
      return
    }
    if (sectionType === MenuSectionType.BANNER && !pendingFile && !section.config.imagePath) {
      toast.error('A imagem é obrigatória')
      return
    }
    if (sectionType === MenuSectionType.CAROUSEL) {
      const validFiles = pendingFiles.filter((file) => file !== null)
      const validImages = ((section.config.imagePaths as string[]) || []).filter((path) => path && path.trim())
      if (validFiles.length + validImages.length < 2) {
        toast.error('Pelo menos 2 imagens são obrigatórias')
        return
      }
    }

    setIsLoading(true)
    try {
      if (sectionType === MenuSectionType.CAROUSEL) {
        const validFiles = pendingFiles.filter((file) => file !== null) as File[]
        onConfirm(section, validFiles)
      } else {
        onConfirm(section, pendingFile ? [pendingFile] : undefined)
      }
      onClose()
    } catch (error) {
      console.error('Error confirming section:', error)
      toast.error('Erro ao adicionar seção')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setSection(null)
    setPendingFile(null)
    setPendingFiles([])
    onClose()
  }

  if (!isOpen || !section) return null

  const getSectionTitle = () => {
    switch (sectionType) {
      case MenuSectionType.BANNER:
        return 'Adicionar Banner'
      case MenuSectionType.CAROUSEL:
        return 'Adicionar Carousel'
      default:
        return 'Adicionar Seção'
    }
  }

  const renderSectionComponent = () => {
    switch (sectionType) {
      case MenuSectionType.BANNER:
        return (
          <BannerSection
            section={section}
            isEditMode={true}
            onUpdate={handleSectionUpdate}
            sectionDefinitions={sectionDefinitions}
            layoutId=""
            onPendingFileChange={(_, file) => handlePendingFileChange(file)}
            sectionIndex={0}
          />
        )
      case MenuSectionType.CAROUSEL:
        return (
          <CarouselSection
            section={section}
            isEditMode={true}
            onUpdate={handleSectionUpdate}
            sectionDefinitions={sectionDefinitions}
            layoutId=""
            onPendingFileChange={(_, file, imageIndex) => handlePendingFileChange(file, imageIndex)}
            sectionIndex={0}
          />
        )
      default:
        return <div>Tipo de seção não suportado</div>
    }
  }

  return (
    <Dialog
      title={getSectionTitle()}
      description="Configure a nova seção do seu menu"
      open={isOpen}
      onOpenChange={handleCancel}
      variant="outline"
      footer={
        <S.DialogFooter>
          <Button variant="ghost" onClick={handleCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? 'Adicionando...' : 'Adicionar Seção'}
          </Button>
        </S.DialogFooter>
      }
    >
      <S.DialogContent>{renderSectionComponent()}</S.DialogContent>
    </Dialog>
  )
}
