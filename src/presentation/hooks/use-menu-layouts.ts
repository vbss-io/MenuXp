import { useCallback, useState } from 'react'

import { GetMenuLayoutUsecase } from '@/application/menu-layouts/get-menu-layout.usecase'
import { GetMenuLayoutsUsecase } from '@/application/menu-layouts/get-menu-layouts.usecase'
import { GetMenuSectionsUsecase } from '@/application/menu-layouts/get-menu-sections.usecase'
import { MenuLayoutStatus } from '@/domain/enums/menu-layouts/menu-layout-status.enum'
import type { MenuLayout, MenuSection, MenuSectionConfig } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { useAuth } from './use-auth'

export const validateSection = (section: MenuSection, sectionDefinitions: MenuSectionDefinition[]) => {
  const definition = sectionDefinitions.find((def) => def.type === section.type)
  if (!definition) return { isValid: false, errors: ['Tipo de seção não encontrado'] }
  const errors: string[] = []
  const config = section.config || {}
  Object.entries(definition.configSchema).forEach(([key, schema]) => {
    if (schema.required && !config[key as keyof MenuSectionConfig]) {
      if (key === 'imagePath') {
        errors.push('A imagem é obrigatória')
      } else if (key === 'imagePaths') {
        errors.push('Pelo menos 2 imagens são obrigatórias')
      } else {
        errors.push(`${key} é obrigatório`)
      }
    }
  })
  if (section.type === 'CAROUSEL' && config.imagePaths) {
    const imagePaths = config.imagePaths as string[]
    const validImages = imagePaths.filter((path) => path && path.trim())
    if (validImages.length < 2) {
      errors.push('Pelo menos 2 imagens são obrigatórias')
    } else if (validImages.length > 5) {
      errors.push('Máximo de 5 imagens permitido')
    }
  }
  return {
    isValid: errors.length === 0,
    errors
  }
}

interface UseMenuLayoutsState {
  layouts: MenuLayout[]
  sections: MenuSectionDefinition[]
  selectedLayout: MenuLayout | null
  isLoading: boolean
  error: string | null
}

export const useMenuLayouts = () => {
  const { restaurantId } = useAuth()
  const [state, setState] = useState<UseMenuLayoutsState>({
    layouts: [],
    sections: [],
    selectedLayout: null,
    isLoading: false,
    error: null
  })

  const loadLayouts = useCallback(async () => {
    if (!restaurantId) return
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const getLayoutsUsecase = new GetMenuLayoutsUsecase()
      const layouts = await getLayoutsUsecase.execute({ restaurantId })
      const activeLayout = layouts.find((layout) => layout.status === MenuLayoutStatus.ACTIVE)
      setState((prev) => ({
        ...prev,
        layouts,
        selectedLayout: activeLayout || null,
        isLoading: false
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Erro ao carregar layouts',
        isLoading: false
      }))
      console.error('Error loading layouts:', error)
    }
  }, [restaurantId])

  const loadLayout = useCallback(async (layoutId: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const getLayoutUsecase = new GetMenuLayoutUsecase()
      const layout = await getLayoutUsecase.execute({ layoutId })
      setState((prev) => ({ ...prev, selectedLayout: layout, isLoading: false }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Erro ao carregar layout',
        isLoading: false
      }))
      console.error('Error loading layout:', error)
    }
  }, [])

  const loadSections = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const getSectionsUsecase = new GetMenuSectionsUsecase()
      const sections = await getSectionsUsecase.execute()
      setState((prev) => ({ ...prev, sections, isLoading: false }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Erro ao carregar seções',
        isLoading: false
      }))
      console.error('Error loading sections:', error)
    }
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  const updateSelectedLayout = useCallback((layout: MenuLayout) => {
    setState((prev) => ({ ...prev, selectedLayout: layout }))
  }, [])

  return {
    ...state,
    loadLayouts,
    loadLayout,
    loadSections,
    clearError,
    updateSelectedLayout
  }
}
