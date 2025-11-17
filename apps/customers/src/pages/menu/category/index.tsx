import { ICONS, ICONS_KEYS, Loading } from '@menuxp/ui'
import { ArrowLeftIcon, FolderIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslator } from 'vbss-translator'

import { ComboCard } from '@/components/combo/combo-card'
import { ComboDialog } from '@/components/combo/combo-dialog'
import { MenuItemCard } from '@/components/menu-item/menu-item-card'
import { MenuItemDialog } from '@/components/menu-item/menu-item-dialog'
import { useRestaurant } from '@/hooks/use-restaurant'
import { getRestaurantMenuItemsByCategory } from '@/services/menu/get-menu-items-by-category'
import type { Combo } from '@/types/combo'
import type { MenuItem } from '@/types/menu-item'

import { ChildBackButton as BackButton, ChildContainer as Container } from '../styles'
import * as S from './styles'

interface CategoryData {
  id: string
  name: string
  description?: string
  icon?: string
}

export const RestaurantCategoryPage = () => {
  const { t } = useTranslator()
  const { slug, categoryId } = useParams<{ slug: string; categoryId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { restaurant } = useRestaurant({ slug: slug || '' })

  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)
  const [selectedCombo, setSelectedCombo] = useState<Combo | null>(null)
  const [isMenuItemDialogOpen, setIsMenuItemDialogOpen] = useState(false)
  const [isComboDialogOpen, setIsComboDialogOpen] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['items-by-category', restaurant?.id, categoryId],
    queryFn: () =>
      getRestaurantMenuItemsByCategory({
        restaurantId: restaurant?.id?.toString() ?? '',
        categoryId: categoryId!
      }),
    enabled: !!restaurant?.id && !!categoryId
  })

  const menuItems = data?.menuItems || []
  const combos = data?.combos || []
  const allItems = [...menuItems, ...combos]

  useEffect(() => {
    if (location.state?.category) {
      setCategoryData(location.state.category)
    }
  }, [location.state])

  const getIconComponent = (iconKey?: string) => {
    if (!iconKey || !(iconKey in ICONS_KEYS)) return <FolderIcon size={32} />
    const iconName = ICONS_KEYS[iconKey]
    const IconComponent = ICONS[iconName as keyof typeof ICONS]
    return IconComponent ? <IconComponent size={32} /> : <FolderIcon size={32} />
  }

  useEffect(() => {
    if (error) {
      toast.error(t('Erro ao carregar produtos da categoria'))
      navigate('/404')
    }
  }, [error, navigate, t])

  const handleBackClick = () => {
    navigate(`/${slug}`)
  }

  const handleMenuItemClick = (item: MenuItem) => {
    setSelectedMenuItem(item)
    setIsMenuItemDialogOpen(true)
  }

  const handleComboClick = (combo: Combo) => {
    setSelectedCombo(combo)
    setIsComboDialogOpen(true)
  }

  const handleMenuItemDialogClose = () => {
    setIsMenuItemDialogOpen(false)
    setSelectedMenuItem(null)
  }

  const handleComboDialogClose = () => {
    setIsComboDialogOpen(false)
    setSelectedCombo(null)
  }

  if (isLoading) {
    return (
      <>
        <Container>
          <S.LoadingContainer>
            <Loading />
            <span>{t('Carregando produtos...')}</span>
          </S.LoadingContainer>
        </Container>
      </>
    )
  }

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <ArrowLeftIcon size={20} />
        {t('Voltar ao menu')}
      </BackButton>
      {categoryData && (
        <S.CategoryHeader $secondaryColor={restaurant?.style?.secondaryColor || '#FEBA0C'}>
          <S.CategoryIcon $primaryColor={restaurant?.style?.primaryColor || '#E53036'}>
            {getIconComponent(categoryData.icon)}
          </S.CategoryIcon>
          <S.CategoryInfo>
            <S.CategoryName>{t(categoryData.name, { preferExternal: true, sourceLanguage: 'pt' })}</S.CategoryName>
            {categoryData.description && (
              <S.CategoryDescription>
                {t(categoryData.description, { preferExternal: true, sourceLanguage: 'pt' })}
              </S.CategoryDescription>
            )}
          </S.CategoryInfo>
        </S.CategoryHeader>
      )}
      {allItems.length === 0 ? (
        <S.EmptyStateContainer>
          <S.EmptyStateDescription>{t('Não há produtos disponíveis nesta categoria.')}</S.EmptyStateDescription>
        </S.EmptyStateContainer>
      ) : (
        <S.MenuItemsGrid>
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onClick={handleMenuItemClick} />
          ))}
          {combos.map((combo) => (
            <ComboCard key={combo.id} item={combo} onClick={handleComboClick} />
          ))}
        </S.MenuItemsGrid>
      )}
      {selectedMenuItem && (
        <MenuItemDialog isOpen={isMenuItemDialogOpen} onClose={handleMenuItemDialogClose} item={selectedMenuItem} />
      )}
      {selectedCombo && (
        <ComboDialog isOpen={isComboDialogOpen} onClose={handleComboDialogClose} item={selectedCombo} />
      )}
    </Container>
  )
}
