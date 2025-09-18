import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { BannerEdit } from './components/banner-edit'
import { BannerPreviewEdit } from './components/banner-preview-edit'

type BannerSectionMode = 'preview-edit' | 'edit' | 'add'

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

export const BannerSection: React.FC<BannerSectionProps> = ({
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
    return <BannerPreviewEdit section={section} onEdit={onEdit} onRemove={onRemove} />
  }

  if (mode === 'edit') {
    if (!section || !layoutId) return null
    return (
      <BannerEdit
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
    return <BannerEdit layoutId={layoutId} position={position} onSectionUpdated={onSectionUpdated} onClose={onClose} />
  }

  return null
}
