import { useCallback, useState } from 'react'

import { CreateMenuLayoutUsecase } from '@/application/menu-layouts/create-menu-layout.usecase'
import { GetMenuLayoutUsecase } from '@/application/menu-layouts/get-menu-layout.usecase'
import { GetMenuLayoutsUsecase } from '@/application/menu-layouts/get-menu-layouts.usecase'
import { GetMenuSectionsUsecase } from '@/application/menu-layouts/get-menu-sections.usecase'
import { MenuLayoutStatus } from '@/domain/enums/menu-layouts/menu-layout-status.enum'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type {
  BannerConfig,
  CarouselConfig,
  CategoriesConfig,
  MenuItemsConfig,
  MenuLayout,
  MenuSection
} from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { useAuth } from './use-auth'

export const getBannerConfig = (section: MenuSection): BannerConfig | null => {
  if (section.type === MenuSectionType.BANNER) {
    return section.config as BannerConfig
  }
  return null
}

export const getCarouselConfig = (section: MenuSection): CarouselConfig | null => {
  if (section.type === MenuSectionType.CAROUSEL) {
    return section.config as CarouselConfig
  }
  return null
}

export const getCategoriesConfig = (section: MenuSection): CategoriesConfig | null => {
  if (section.type === MenuSectionType.CATEGORIES) {
    return section.config as CategoriesConfig
  }
  return null
}

export const getMenuItemsConfig = (section: MenuSection): MenuItemsConfig | null => {
  if (section.type === MenuSectionType.MENU_ITEMS) {
    return section.config as MenuItemsConfig
  }
  return null
}

export const validateSection = (section: MenuSection, sectionDefinitions: MenuSectionDefinition[]) => {
  const definition = sectionDefinitions.find((def) => def.type === section.type)
  if (!definition) return { isValid: false, errors: ['Tipo de seção não encontrado'] }
  const errors: string[] = []
  let config = section.config || {}
  switch (section.type) {
    case 'BANNER':
      if (!(config as BannerConfig)?.imagePath) {
        errors.push('A imagem é obrigatória')
      }
      break
    case 'CAROUSEL':
      config = config as CarouselConfig
      if (!config?.imagePaths || config.imagePaths.length < 2) {
        errors.push('Pelo menos 2 imagens são obrigatórias')
      } else if (config.imagePaths.length > 5) {
        errors.push('Máximo de 5 imagens permitido')
      }
      break
    case 'CATEGORIES':
      break
    case 'MENU_ITEMS':
      break
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

  const createLayout = useCallback(async () => {
    if (!restaurantId) return
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const createLayoutUsecase = new CreateMenuLayoutUsecase()
      await createLayoutUsecase.execute({ restaurantId })
      await loadLayouts()
      setState((prev) => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Erro ao criar layout',
        isLoading: false
      }))
      console.error('Error creating layout:', error)
    }
  }, [restaurantId, loadLayouts])

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
    createLayout,
    clearError,
    updateSelectedLayout
  }
}
