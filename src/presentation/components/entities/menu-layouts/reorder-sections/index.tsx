import {
  type DragEndEvent,
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DotsSixVerticalIcon } from '@phosphor-icons/react'
import styled from 'styled-components'

import type { MenuSection } from '@/domain/models/menu-layout.model'

interface ReorderSectionsProps {
  sections: MenuSection[]
  onReorder: (newOrder: string[]) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`

const SectionItem = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  transition: all 0.2s ease;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.8 : 1)};
  transform: ${({ $isDragging }) => ($isDragging ? 'rotate(2deg)' : 'none')};

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.gray[300]};
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: grab;
  color: ${({ theme }) => theme.colors.mx.gray[400]};
  transition: all 0.2s ease;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.colors.mx.gray[600]};
    background-color: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:active {
    cursor: grabbing;
    color: ${({ theme }) => theme.colors.mx.gray[700]};
  }
`

const SectionInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const SectionType = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

const getSectionDisplayName = (section: MenuSection): string => {
  switch (section.type) {
    case 'BANNER':
      return 'Banner'
    case 'CAROUSEL':
      return 'Carrossel'
    case 'CATEGORIES':
      return 'Categorias'
    case 'MENU_ITEMS':
      return 'Itens do Menu'
    default:
      return section.type
  }
}

interface SortableItemProps {
  section: MenuSection
  index: number
}

const SortableItem: React.FC<SortableItemProps> = ({ section, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id || `section-${index}`
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <SectionItem ref={setNodeRef} style={style} $isDragging={isDragging}>
      <DragHandle {...attributes} {...listeners}>
        <DotsSixVerticalIcon size={16} weight="bold" />
      </DragHandle>
      <SectionInfo>
        <SectionType>{getSectionDisplayName(section)}</SectionType>
      </SectionInfo>
    </SectionItem>
  )
}

export const ReorderSections: React.FC<ReorderSectionsProps> = ({ sections, onReorder }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = sections.findIndex(
      (section) => (section.id || `section-${sections.indexOf(section)}`) === active.id
    )
    const newIndex = sections.findIndex((section) => (section.id || `section-${sections.indexOf(section)}`) === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      const newSections = arrayMove(sections, oldIndex, newIndex)
      const newOrder = newSections.map((section) => section.id).filter((id): id is string => id !== undefined)
      onReorder(newOrder)
    }
  }

  if (!sections || sections.length === 0) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Nenhuma seção encontrada para reordenar.
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={sections.map((section) => section.id || `section-${sections.indexOf(section)}`)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section, index) => (
            <SortableItem key={section.id || `section-${index}`} section={section} index={index} />
          ))}
        </SortableContext>
      </DndContext>
    </Container>
  )
}
