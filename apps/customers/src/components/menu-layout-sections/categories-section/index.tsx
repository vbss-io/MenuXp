import { FolderIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useTranslator } from 'vbss-translator'

import { useRestaurant } from '@/hooks/use-restaurant'
import { getRestaurantMenuCategories } from '@/services/menu/get-categories'
import type { Category } from '@/types/category'
import { MenuSectionType, type CategoriesConfig, type MenuSection } from '@/types/menu-layout'
import { ICONS, ICONS_KEYS, Loading } from '@menuxp/ui'
import { useQuery } from '@tanstack/react-query'

import * as S from './styles'

interface CategoryData {
  id: string
  name: string
  description?: string
  icon?: string
}

interface CategoriesSectionProps {
  section: MenuSection
  mockCategories?: Category[]
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ section, mockCategories }) => {
  const { t } = useTranslator()
  const { restaurant } = useRestaurant()
  const { layout } = useRestaurant()
  const navigate = useNavigate()

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const getCategoriesConfig = (section: MenuSection): CategoriesConfig | null => {
    if (section.type === MenuSectionType.CATEGORIES) {
      return section.config as CategoriesConfig
    }
    return null
  }

  const categoriesData = getCategoriesConfig(section)

  const {
    data: apiCategories = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['menu-categories', restaurant?.id, categoriesData?.categoryIds],
    queryFn: () =>
      getRestaurantMenuCategories({
        restaurantId: restaurant?.id?.toString() as string,
        categoryIds: categoriesData?.categoryIds ?? []
      }),
    enabled: !!restaurant?.id && !mockCategories
  })

  const categories = mockCategories || apiCategories

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

  useEffect(() => {
    if (error) {
      toast.error(t('Erro ao carregar categorias'))
    }
  }, [error, t])

  const getIconComponent = (iconKey?: string) => {
    if (!iconKey || !(iconKey in ICONS_KEYS)) return <FolderIcon size={24} />
    const iconName = ICONS_KEYS[iconKey]
    const IconComponent = ICONS[iconName as keyof typeof ICONS]
    return IconComponent ? <IconComponent size={24} /> : <FolderIcon size={24} />
  }

  const handleCategoryClick = (category: CategoryData) => {
    navigate(`/${restaurant?.slug}/category/${category.id}`, {
      state: { category }
    })
  }

  if (isLoading) {
    return (
      <S.ViewContainer className={`view-container categories-section layout-${layout}`}>
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      </S.ViewContainer>
    )
  }

  if (!categories.length) {
    return (
      <S.ViewContainer className={`view-container categories-section layout-${layout}`}>
        <S.EmptyStateContainer>
          <S.EmptyStateDescription>
            {t('Não há categorias disponíveis para exibir nesta seção.')}
          </S.EmptyStateDescription>
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
        <S.ViewContainer className={`view-container categories-section layout-${layout}`}>
          <S.CategoriesGrid
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            className={`categories-grid layout-${layout}`}
          >
            {categories.map((category) => (
              <S.CategoryCard
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`category-card layout-${layout}`}
              >
                <S.CategoryIcon className="category-icon">{getIconComponent(category.icon)}</S.CategoryIcon>
                <S.CategoryName className="category-name">{category.name}</S.CategoryName>
                {category.description && (
                  <S.CategoryDescription className="category-description">{category.description}</S.CategoryDescription>
                )}
              </S.CategoryCard>
            ))}
          </S.CategoriesGrid>
        </S.ViewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
