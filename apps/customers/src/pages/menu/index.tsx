import { useEffect, useMemo, useRef } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

import { BannerSection } from '@/components/menu-layout-sections/banner-section'
import { CarouselSection } from '@/components/menu-layout-sections/carousel-section'
import { CategoriesSection } from '@/components/menu-layout-sections/categories-section'
import { CombosSection } from '@/components/menu-layout-sections/combos-section'
import { MenuItemsSection } from '@/components/menu-layout-sections/menu-items-section'
import { RestaurantClientWarningBanner } from '@/components/restaurant/restaurant-client-warning-banner'
import { RestaurantHeader } from '@/components/restaurant/restaurant-header'
import { RestaurantOperationWarningBanner } from '@/components/restaurant/restaurant-operation-warning-banner'
import { MenuNavbar } from '@/components/ui/menu-navbar'
import { useRestaurant } from '@/hooks/use-restaurant'
import { MenuSectionType, type MenuSection } from '@/types/menu-layout'

import * as S from './styles'

export const MenuPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { restaurant, operationId, menuLayout, isLoading, error, setClientRestaurant, setOperationId } = useRestaurant({
    slug
  })
  const lastRestaurantDataRef = useRef<string | null>(null)

  const isChildRoute = location.pathname !== `/${slug}`

  useEffect(() => {
    if (error) {
      navigate('/404')
    }
  }, [error, navigate])

  const restaurantData = useMemo(() => {
    if (!restaurant || !slug) return null
    return {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      logo: restaurant.logo,
      address: restaurant.address,
      contactInfo: restaurant.contactInfo,
      style: restaurant.style,
      settings: restaurant.settings,
      isActive: restaurant.isActive,
      slug: restaurant.slug,
      ownerId: restaurant.ownerId,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt
    }
  }, [restaurant, slug])

  useEffect(() => {
    if (restaurantData) {
      const dataKey = `${restaurantData.id}-${restaurantData.name}-${restaurantData.slug}`
      if (lastRestaurantDataRef.current !== dataKey) {
        lastRestaurantDataRef.current = dataKey
        setClientRestaurant(restaurantData)
      }
    }
  }, [restaurantData, setClientRestaurant])

  useEffect(() => {
    if (operationId) {
      setOperationId(operationId)
    }
  }, [operationId, setOperationId])

  if (isLoading) {
    return (
      <>
        <RestaurantHeader />
        <S.Container>Carregando...</S.Container>
      </>
    )
  }

  if (!restaurant) {
    return (
      <>
        <RestaurantHeader />
        <S.Container>
          <S.RestaurantNotFound>Restaurante não encontrado</S.RestaurantNotFound>
        </S.Container>
      </>
    )
  }

  const renderSection = (section: MenuSection, index: number) => {
    switch (section.type) {
      case MenuSectionType.BANNER:
        return <BannerSection key={`${section.type}-${index}`} section={section} />
      case MenuSectionType.CAROUSEL:
        return <CarouselSection key={`${section.type}-${index}`} section={section} />
      case MenuSectionType.CATEGORIES:
        return <CategoriesSection key={`${section.type}-${index}`} section={section} />
      case MenuSectionType.MENU_ITEMS:
        return <MenuItemsSection key={`${section.type}-${index}`} section={section} />
      case MenuSectionType.COMBOS:
        return <CombosSection key={`${section.type}-${index}`} section={section} />
      default:
        return null
    }
  }

  return (
    <S.Container>
      <RestaurantHeader />
      <S.Content>
        <RestaurantClientWarningBanner />
        <RestaurantOperationWarningBanner
          operationId={operationId}
          businessHours={restaurant.settings?.businessHours}
          acceptsScheduling={restaurant.settings?.acceptsScheduling || false}
        />
        {isChildRoute && <Outlet />}
        {!isChildRoute && menuLayout && (
          <S.ChildContainer>
            {menuLayout.sections.map((section, index) => renderSection(section, index))}
          </S.ChildContainer>
        )}
        {!isChildRoute && !menuLayout && <S.MenuNotFound>Menu não disponível</S.MenuNotFound>}
      </S.Content>
      <MenuNavbar />
    </S.Container>
  )
}
