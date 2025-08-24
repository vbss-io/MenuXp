import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { MenuItemsView } from './components/menu-items-view'
import { MenuItemsPreviewEdit } from './components/menu-items-preview-edit'
import { MenuItemsEdit } from './components/menu-items-edit'
import { MenuItemsAdd } from './components/menu-items-add'

type MenuItemsSectionMode = 'view' | 'preview-edit' | 'edit' | 'add'

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
  position
}) => {
  // Modo 1: VIEW - Visualização normal (preview e clientes)
  if (mode === 'view') {
    if (!section) return null
    return <MenuItemsView section={section} />
  }

  // Modo 2: PREVIEW-EDIT - Visualização no preview com controles de exclusão
  if (mode === 'preview-edit') {
    if (!section) return null
    return (
      <MenuItemsPreviewEdit
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
      <MenuItemsEdit
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
      <MenuItemsAdd
        layoutId={layoutId}
        position={position}
        onSectionUpdated={onSectionUpdated}
        onClose={onClose}
      />
    )
  }

  return null
}
