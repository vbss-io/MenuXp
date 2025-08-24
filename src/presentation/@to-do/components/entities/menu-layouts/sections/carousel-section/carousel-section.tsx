import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { CarouselView } from './components/carousel-view'
import { CarouselPreviewEdit } from './components/carousel-preview-edit'
import { CarouselEdit } from './components/carousel-edit'
import { CarouselAdd } from './components/carousel-add'

type CarouselSectionMode = 'view' | 'preview-edit' | 'edit' | 'add'

interface CarouselSectionProps {
  section?: MenuSection
  mode: CarouselSectionMode
  onRemove?: () => void
  onEdit?: () => void
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  position?: number
}

export const CarouselSection: React.FC<CarouselSectionProps> = ({
  section,
  mode,
  onRemove,
  onEdit,
  onSectionUpdated,
  onClose,
  sectionDefinitions = [],
  layoutId,
  position
}) => {
  // Modo 1: VIEW - Visualização normal (preview e clientes)
  if (mode === 'view') {
    if (!section) return null
    return <CarouselView section={section} />
  }

  // Modo 2: PREVIEW-EDIT - Visualização no preview com controles de exclusão
  if (mode === 'preview-edit') {
    if (!section) return null
    return (
      <CarouselPreviewEdit
        section={section}
        onEdit={onEdit}
        onRemove={onRemove}
      />
    )
  }

  // Modo 3: EDIT - Visualização de edição (usada no SectionDialog)
  if (mode === 'edit') {
    if (!section || !layoutId) return null
    return (
      <CarouselEdit
        section={section}
        layoutId={layoutId}
        onSectionUpdated={onSectionUpdated}
        onClose={onClose}
        sectionDefinitions={sectionDefinitions}
      />
    )
  }

  // Modo 4: ADD - Interface para adicionar nova seção
  if (mode === 'add') {
    if (!layoutId || position === undefined) return null
    return (
      <CarouselAdd
        layoutId={layoutId}
        position={position}
        onSectionUpdated={onSectionUpdated}
        onClose={onClose}
      />
    )
  }

  return null
}
