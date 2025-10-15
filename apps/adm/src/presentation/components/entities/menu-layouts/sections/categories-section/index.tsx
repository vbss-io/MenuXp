import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { CategoriesEdit } from './components/categories-edit'
import { CategoriesPreviewEdit } from './components/categories-preview-edit'

type CategoriesSectionMode = 'preview-edit' | 'edit' | 'add'

interface CategoriesSectionProps {
  section?: MenuSection
  mode: CategoriesSectionMode
  onRemove?: () => void
  onEdit?: () => void
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  position?: number
  menuLayout?: string
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
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
    return <CategoriesPreviewEdit section={section} onEdit={onEdit} onRemove={onRemove} menuLayout={menuLayout} />
  }

  if (mode === 'edit') {
    if (!section || !layoutId) return null
    return (
      <CategoriesEdit
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
      <CategoriesEdit
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
