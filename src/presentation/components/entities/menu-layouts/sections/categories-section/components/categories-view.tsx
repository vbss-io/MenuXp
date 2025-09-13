import { FolderIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { GetRestaurantMenuCategoriesUsecase } from '@/application/clients-menu/get-restaurant-menu-categories.usecase'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { ICONS_KEYS, ICONS } from '@/domain/consts/icons.const.tsx'
import { Loading } from '@/presentation/components/ui/loading'
import { getCategoriesConfig } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

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
  isClientView?: boolean
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ section, menuLayout, isClientView }) => {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { restaurant } = useRestaurant()
  const navigate = useNavigate()

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const categoriesData = getCategoriesConfig(section)
  const isAllCategories = categoriesData?.categoryIds === null || categoriesData?.categoryIds === undefined
  const layoutType = menuLayout || 'default'

  const primaryColor = restaurant?.style?.primaryColor
  const secondaryColor = restaurant?.style?.secondaryColor

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
      const walk = (x - startX) * 2
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

  const loadCategoriesForDisplay = useCallback(async () => {
    if (!restaurant?.id) return

    setIsLoading(true)
    try {
      const getCategoriesUsecase = new GetRestaurantMenuCategoriesUsecase()
      const result = await getCategoriesUsecase.execute({
        restaurantId: restaurant.id,
        categoryIds: isAllCategories ? undefined : categoriesData?.categoryIds || undefined
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

  const handleCategoryClick = (category: CategoryData) => {
    if (isClientView) {
      navigate(`/${restaurant?.slug}/category/${category.id}`, {
        state: { category }
      })
    }
  }

  if (isLoading) {
    return (
      <S.ViewContainer>
        <S.LoadingContainer>
          <Loading />
          <span>Carregando categorias...</span>
        </S.LoadingContainer>
      </S.ViewContainer>
    )
  }

  if (!categories.length) {
    return (
      <S.ViewContainer>
        <S.EmptyStateContainer>
          <S.EmptyStateDescription>Não há categorias disponíveis para exibir nesta seção.</S.EmptyStateDescription>
        </S.EmptyStateContainer>
      </S.ViewContainer>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <S.ViewContainer>
          <S.CategoriesGrid
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            layout={layoutType}
          >
            {categories.map((category) => (
              <S.CategoryCard
                key={category.id}
                layout={layoutType}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                onClick={() => handleCategoryClick(category)}
              >
                <S.CategoryIcon layout={layoutType} primaryColor={primaryColor} secondaryColor={secondaryColor}>
                  {getIconComponent(category.icon)}
                </S.CategoryIcon>
                <S.CategoryName layout={layoutType} primaryColor={primaryColor} secondaryColor={secondaryColor}>
                  {category.name}
                </S.CategoryName>
                {category.description && <S.CategoryDescription>{category.description}</S.CategoryDescription>}
              </S.CategoryCard>
            ))}
          </S.CategoriesGrid>
        </S.ViewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
