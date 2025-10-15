import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { CombosEdit } from './components/combos-edit'
import { CombosPreviewEdit } from './components/combos-preview-edit'

type CombosSectionMode = 'preview-edit' | 'edit' | 'add'

interface CombosSectionProps {
  section?: MenuSection
  mode: CombosSectionMode
  onRemove?: () => void
  onEdit?: () => void
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  position?: number
  menuLayout?: string
}

export const CombosSection: React.FC<CombosSectionProps> = ({
  section,
  mode,
  onRemove,
  onEdit,
  onSectionUpdated,
  onClose,
  sectionDefinitions = [],
  layoutId,
  position,
  menuLayout
}) => {
  if (mode === 'preview-edit') {
    if (!section) return null
    return <CombosPreviewEdit section={section} onEdit={onEdit} onRemove={onRemove} menuLayout={menuLayout} />
  }

  if (mode === 'edit') {
    if (!section || !layoutId) return null
    return (
      <CombosEdit
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
      <CombosEdit
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
