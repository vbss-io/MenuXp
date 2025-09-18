import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { MenuItemsEdit } from './components/menu-items-edit'
import { MenuItemsPreviewEdit } from './components/menu-items-preview-edit'

type MenuItemsSectionMode = 'preview-edit' | 'edit' | 'add'

interface MenuItemsSectionProps {
  section?: MenuSection
  mode: MenuItemsSectionMode
  onRemove?: () => void
  onEdit?: () => void
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  position?: number
  menuLayout?: string
}

export const MenuItemsSection: React.FC<MenuItemsSectionProps> = ({
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
    return <MenuItemsPreviewEdit section={section} onEdit={onEdit} onRemove={onRemove} menuLayout={menuLayout} />
  }

  if (mode === 'edit') {
    if (!section || !layoutId) return null
    return (
      <MenuItemsEdit
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
      <MenuItemsEdit
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
