import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { CarouselEdit } from './components/carousel-edit'
import { CarouselPreviewEdit } from './components/carousel-preview-edit'

type CarouselSectionMode = 'preview-edit' | 'edit' | 'add'

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
  if (mode === 'preview-edit') {
    if (!section) return null
    return <CarouselPreviewEdit section={section} onEdit={onEdit} onRemove={onRemove} />
  }

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

  if (mode === 'add') {
    if (!layoutId || position === undefined) return null
    return (
      <CarouselEdit
        layoutId={layoutId}
        position={position}
        onSectionUpdated={onSectionUpdated}
        onClose={onClose}
        sectionDefinitions={sectionDefinitions}
      />
    )
  }

  return null
}
