import { FolderIcon } from '@phosphor-icons/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { GetRestaurantMenuCategoriesUsecase } from '@/application/clients-menu/get-restaurant-menu-categories.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { ICONS_KEYS, ICONS } from '@/domain/consts/icons.const.tsx'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { getCategoriesConfig } from '@/presentation/hooks/use-menu-layouts'

import * as S from '../styles'

interface CategoryData {
  id: string
  name: string
  description?: string
  icon?: string
}

interface CategoriesViewProps {
  section: MenuSection
  menuLayout?: string
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ section, menuLayout }) => {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { restaurant } = useRestaurant()

  // Estados para drag horizontal
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const categoriesData = getCategoriesConfig(section)
  const isAllCategories =
    categoriesData?.categoryIds === null || categoriesData?.categoryIds === undefined
  const layoutType = menuLayout || 'default'

  // Cor primária do restaurante ou fallback para MenuXP
  const primaryColor = restaurant?.style?.primaryColor || '#FF6B35'
  const secondaryColor = restaurant?.style?.secondaryColor || '#FF8C00'

  // Funções para drag horizontal
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      e.preventDefault()
      const x = e.pageX - containerRef.current.offsetLeft
      const walk = (x - startX) * 2 // Velocidade do scroll
      containerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Event listeners para drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Carrega categorias para exibição
  const loadCategoriesForDisplay = useCallback(async () => {
    if (!restaurant?.id) return

    console.log('CategoriesView - loadCategoriesForDisplay called:', {
      restaurantId: restaurant.id,
      isAllCategories,
      sectionCategoryIds: categoriesData?.categoryIds,
      categoryIdsToFetch: isAllCategories ? undefined : categoriesData?.categoryIds || undefined
    })

    setIsLoading(true)
    try {
      const getCategoriesUsecase = new GetRestaurantMenuCategoriesUsecase()
      const result = await getCategoriesUsecase.execute({
        restaurantId: restaurant.id,
        categoryIds: isAllCategories ? undefined : categoriesData?.categoryIds || undefined
      })

      console.log('CategoriesView - loadCategoriesForDisplay result:', {
        categoriesCount: result.categories.length,
        categories: result.categories.map((c) => ({ id: c.id, name: c.name }))
      })

      setCategories(result.categories)
    } catch {
      toast.error('Erro ao carregar categorias')
    } finally {
      setIsLoading(false)
    }
  }, [restaurant?.id, isAllCategories, categoriesData?.categoryIds])

  useEffect(() => {
    loadCategoriesForDisplay()
  }, [loadCategoriesForDisplay])

  const getIconComponent = (iconKey?: string) => {
    if (!iconKey || !(iconKey in ICONS_KEYS)) return <FolderIcon size={24} />
    const iconName = ICONS_KEYS[iconKey]
    const IconComponent = ICONS[iconName as keyof typeof ICONS]
    return IconComponent ? <IconComponent size={24} /> : <FolderIcon size={24} />
  }

  const getLayoutStyles = () => {
    switch (layoutType) {
      case 'dark':
        return {
          container: {
            backgroundColor: '#1a1a1a',
            color: '#ffffff'
          },
          category: {
            backgroundColor: '#2d2d2d',
            border: '1px solid #404040',
            color: '#ffffff'
          }
        }
      case 'clean':
        return {
          container: {
            backgroundColor: '#ffffff',
            color: '#333333'
          },
          category: {
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            color: '#333333'
          }
        }
      case 'square':
        return {
          container: {
            backgroundColor: '#ffffff',
            color: '#333333'
          },
          category: {
            backgroundColor: '#ffffff',
            border: '2px solid #dee2e6',
            color: '#333333',
            borderRadius: '0px'
          }
        }
      default:
        return {
          container: {
            backgroundColor: '#ffffff',
            color: '#333333'
          },
          category: {
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            color: '#333333'
          }
        }
    }
  }

  const layoutStyles = getLayoutStyles()

  if (isLoading) {
    return (
      <S.ViewContainer>
        <S.LoadingContainer>
          <S.LoadingSpinner />
          <span>Carregando categorias...</span>
        </S.LoadingContainer>
      </S.ViewContainer>
    )
  }

  if (!categories.length) {
    return null
  }

  return (
    <S.ViewContainer style={layoutStyles.container}>
      <S.CategoriesGrid
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {categories.map((category) => (
          <S.CategoryCard
            key={category.id}
            style={{
              ...layoutStyles.category,
              borderColor: layoutType === 'square' ? '#dee2e6' : primaryColor
            }}
          >
            <S.CategoryIcon style={{ color: primaryColor }}>
              {getIconComponent(category.icon)}
            </S.CategoryIcon>
            <S.CategoryName>{category.name}</S.CategoryName>
            {category.description && (
              <S.CategoryDescription>{category.description}</S.CategoryDescription>
            )}
          </S.CategoryCard>
        ))}
      </S.CategoriesGrid>
    </S.ViewContainer>
  )
}
