import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'

import { BannerView } from './components/banner-view'
import { BannerPreviewEdit } from './components/banner-preview-edit'
import { BannerEdit } from './components/banner-edit'
import { BannerAdd } from './components/banner-add'

type BannerSectionMode = 'view' | 'preview-edit' | 'edit' | 'add'

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
  // Modo 1: VIEW - Visualização normal (preview e clientes)
  if (mode === 'view') {
    if (!section) return null
    return <BannerView section={section} />
  }

  // Modo 2: PREVIEW-EDIT - Visualização no preview com controles de exclusão
  if (mode === 'preview-edit') {
    if (!section) return null
    return <BannerPreviewEdit section={section} onEdit={onEdit} onRemove={onRemove} />
  }

  // Modo 3: EDIT - Visualização de edição (usada no SectionDialog)
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

  // Modo 4: ADD - Interface para adicionar nova seção
  if (mode === 'add') {
    if (!layoutId || position === undefined) return null
    return <BannerAdd layoutId={layoutId} position={position} onSectionUpdated={onSectionUpdated} onClose={onClose} />
  }

  return null
}
