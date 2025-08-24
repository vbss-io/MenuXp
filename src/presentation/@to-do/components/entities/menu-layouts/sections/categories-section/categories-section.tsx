import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { CategoriesView } from './components/categories-view'
import { CategoriesPreviewEdit } from './components/categories-preview-edit'
import { CategoriesEdit } from './components/categories-edit'
import { CategoriesAdd } from './components/categories-add'

type CategoriesSectionMode = 'view' | 'preview-edit' | 'edit' | 'add'

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
  // Modo 1: VIEW - Visualização normal (preview e clientes)
  if (mode === 'view') {
    if (!section) return null
    return <CategoriesView section={section} menuLayout={menuLayout} />
  }

  // Modo 2: PREVIEW-EDIT - Visualização no preview com controles de exclusão
  if (mode === 'preview-edit') {
    if (!section) return null
    return (
      <CategoriesPreviewEdit
        section={section}
        onEdit={onEdit}
        onRemove={onRemove}
        menuLayout={menuLayout}
      />
    )
  }

  // Modo 3: EDIT - Visualização de edição (usada no SectionDialog)
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

  // Modo 4: ADD - Interface para adicionar nova seção
  if (mode === 'add') {
    if (!layoutId || position === undefined) return null
    return (
      <CategoriesAdd
        layoutId={layoutId}
        position={position}
        onSectionUpdated={onSectionUpdated}
        onClose={onClose}
      />
    )
  }

  return null
}
