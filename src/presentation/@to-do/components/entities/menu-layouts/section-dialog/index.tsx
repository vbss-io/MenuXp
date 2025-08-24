import { Dialog } from '@vbss-ui/dialog'
import React, { useEffect, useState } from 'react'

import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { BannerSection } from '@/presentation/@to-do/components/entities/menu-layouts/sections/banner-section'
import { CarouselSection } from '@/presentation/@to-do/components/entities/menu-layouts/sections/carousel-section'
import { CategoriesSection } from '@/presentation/@to-do/components/entities/menu-layouts/sections/categories-section'
import { MenuItemsSection } from '@/presentation/@to-do/components/entities/menu-layouts/sections/menu-items-section'

import * as S from './styles'

interface SectionDialogProps {
  isOpen: boolean
  onClose: () => void
  onSectionUpdated: () => void
  layoutId: string
  mode: 'add' | 'edit'
  sectionType?: MenuSectionType
  section?: MenuSection
  position?: number
}

export const SectionDialog: React.FC<SectionDialogProps> = ({
  isOpen,
  onClose,
  onSectionUpdated,
  layoutId,
  mode,
  sectionType,
  section,
  position
}) => {
  const [currentSection, setCurrentSection] = useState<MenuSection | null>(null)
  const currentSectionType = mode === 'edit' ? section?.type : sectionType

  useEffect(() => {
    if (isOpen && currentSectionType) {
      if (mode === 'edit' && section) {
        setCurrentSection(section)
      } else {
        // For ADD mode, we don't need to create a section here
        // The components will handle their own logic
        setCurrentSection(null)
      }
    }
  }, [isOpen, mode, section, currentSectionType])

  const handleCancel = () => {
    setCurrentSection(null)
    onClose()
  }



  if (!isOpen || !currentSectionType) return null

  const getTitle = () => {
    const action = mode === 'add' ? 'Adicionar' : 'Editar'
    switch (currentSectionType) {
      case MenuSectionType.BANNER:
        return `${action} Banner`
      case MenuSectionType.CAROUSEL:
        return `${action} Carousel`
      case MenuSectionType.CATEGORIES:
        return `${action} Seção de Categorias`
      case MenuSectionType.MENU_ITEMS:
        return `${action} Seção de Itens do Menu`
      default:
        return `${action} Seção`
    }
  }

  const renderContent = () => {
    // Use 'add' for add mode, 'edit' for edit mode
    const componentMode = mode === 'add' ? 'add' : 'edit'

    switch (currentSectionType) {
      case MenuSectionType.BANNER:
        return (
          <BannerSection
            section={currentSection || undefined}
            mode={componentMode}
            layoutId={layoutId}
            position={position}
            onSectionUpdated={onSectionUpdated}
            onClose={handleCancel}
          />
        )
      case MenuSectionType.CAROUSEL:
        return (
          <CarouselSection
            section={currentSection || undefined}
            mode={componentMode}
            layoutId={layoutId}
            position={position}
            onSectionUpdated={onSectionUpdated}
            onClose={handleCancel}
          />
        )
      case MenuSectionType.CATEGORIES:
        return (
          <CategoriesSection
            section={currentSection || undefined}
            mode={componentMode}
            layoutId={layoutId}
            position={position}
            onSectionUpdated={onSectionUpdated}
            onClose={handleCancel}
          />
        )
      case MenuSectionType.MENU_ITEMS:
        return (
          <MenuItemsSection
            section={currentSection || undefined}
            mode={componentMode}
            layoutId={layoutId}
            position={position}
            onSectionUpdated={onSectionUpdated}
            onClose={handleCancel}
          />
        )
      default:
        return <div>Tipo de seção não suportado</div>
    }
  }



  return (
    <Dialog
      title={getTitle()}
      description={mode === 'add' ? 'Configure a nova seção do seu menu' : 'Edite a configuração da seção'}
      open={isOpen}
      onOpenChange={handleCancel}
      variant="outline"
    >
      <S.DialogContent>{renderContent()}</S.DialogContent>
    </Dialog>
  )
}

// Export with old name for backward compatibility
export const AddSectionDialog = SectionDialog
