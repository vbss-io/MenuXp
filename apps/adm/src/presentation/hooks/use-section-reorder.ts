import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { ReorderSectionsUsecase } from '@/application/menu-layouts/sections/reorder-sections.usecase'
import type { MenuSection } from '@/domain/models/menu-layout.model'

interface UseSectionReorderProps {
  sections: MenuSection[]
  layoutId: string
  onSectionsReordered: (newSections: MenuSection[]) => void
}

export const useSectionReorder = ({ sections, layoutId, onSectionsReordered }: UseSectionReorderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [reorderedSections, setReorderedSections] = useState<MenuSection[]>(sections)

  useEffect(() => {
    setReorderedSections(sections)
  }, [sections])

  const handleReorder = useCallback(
    (newOrder: string[]) => {
      const newSections = newOrder
        .map((id) => sections.find((section) => section.id === id))
        .filter((section): section is MenuSection => section !== undefined)

      setReorderedSections(newSections)
    },
    [sections]
  )

  const handleSaveOrder = useCallback(async () => {
    if (!layoutId) {
      toast.error('ID do layout não encontrado')
      return
    }

    setIsLoading(true)
    try {
      const reorderUsecase = new ReorderSectionsUsecase()
      await reorderUsecase.execute({
        layoutId,
        newOrder: reorderedSections.map((section) => section.id).filter((id): id is string => id !== undefined)
      })

      onSectionsReordered(reorderedSections)

      toast.success('Ordem das seções salva com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar ordem das seções:', error)
      toast.error('Erro ao salvar ordem das seções. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [layoutId, reorderedSections, onSectionsReordered])

  const resetOrder = useCallback(() => {
    setReorderedSections(sections)
  }, [sections])

  return {
    reorderedSections,
    isLoading,
    handleReorder,
    handleSaveOrder,
    resetOrder
  }
}
