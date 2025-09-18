import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { GetRestaurantInfoUsecase } from '@/application/clients-menu/get-restaurant-info.usecase'
import { RestaurantHeader } from '@/presentation/components/entities/menu/restaurant-header'
import { RestaurantClientWarningBanner } from '@/presentation/components/entities/restaurants/restaurant-client-warning-banner'
import { RestaurantOperationWarningBanner } from '@/presentation/components/entities/restaurants/restaurant-operation-warning-banner'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import { BannerSection } from '@/presentation/components/entities/menu-layouts/sections/banner-section'
import { CarouselSection } from '@/presentation/components/entities/menu-layouts/sections/carousel-section'
import { CategoriesSection } from '@/presentation/components/entities/menu-layouts/sections/categories-section'
import { MenuItemsSection } from '@/presentation/components/entities/menu-layouts/sections/menu-items-section'
import { MobileNavigation } from '@/presentation/components/entities/menu/mobile-navigation'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`

const Content = styled.div`
  padding: 60px 20px 80px 20px;
  margin: 0 auto;
`

const SectionsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const RestaurantPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { setClientRestaurant, setOperationId } = useRestaurant()
  const [restaurantInfo, setRestaurantInfo] = useState<{
    name: string
    logo?: string
    operationId: string | null
    businessHours?: Record<string, string>
    menuLayout?: {
      id: string
      layout: string
      sections: Array<{
        id?: string
        type: string
        config: Record<string, unknown>
      }>
    } | null
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      if (!slug) {
        navigate('/404')
        return
      }

      try {
        const usecase = new GetRestaurantInfoUsecase()
        const result = await usecase.execute({ slug })
        setRestaurantInfo({
          name: result.restaurant.name,
          logo: result.restaurant.logo,
          operationId: result.operationId,
          businessHours: result.restaurant.settings?.businessHours,
          menuLayout: result.menuLayout
        })

        // Set restaurant info in context for components to access
        const restaurantData = {
          id: result.restaurant.id,
          name: result.restaurant.name,
          description: result.restaurant.description,
          logo: result.restaurant.logo,
          address: result.restaurant.address,
          contactInfo: result.restaurant.contactInfo,
          style: result.restaurant.style,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          settings: result.restaurant.settings as any,
          isActive: true,
          slug: slug || '',
          ownerId: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        setClientRestaurant(restaurantData)
        setOperationId(restaurantInfo?.operationId || '')
      } catch {
        navigate('/404')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRestaurantInfo()
  }, [slug, navigate, setClientRestaurant, setOperationId, restaurantInfo?.operationId])

  if (isLoading) {
    return (
      <>
        <RestaurantHeader logo={undefined} restaurantName="" />
        <Container>Carregando...</Container>
      </>
    )
  }

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case MenuSectionType.BANNER:
        return (
          <BannerSection
            key={`${section.type}-${index}`}
            section={section}
            mode="view"
            onRemove={() => {}}
            onEdit={undefined}
            onSectionUpdated={() => {}}
            sectionDefinitions={[]}
            layoutId=""
          />
        )
      case MenuSectionType.CAROUSEL:
        return (
          <CarouselSection
            key={`${section.type}-${index}`}
            section={section}
            mode="view"
            onRemove={() => {}}
            onEdit={undefined}
            onSectionUpdated={() => {}}
            sectionDefinitions={[]}
            layoutId=""
          />
        )
      case MenuSectionType.CATEGORIES:
        return (
          <CategoriesSection
            key={`${section.type}-${index}`}
            section={section}
            mode="view"
            onRemove={() => {}}
            onEdit={undefined}
            onSectionUpdated={() => {}}
            sectionDefinitions={[]}
            layoutId=""
            menuLayout={restaurantInfo?.menuLayout?.layout || 'default'}
            isClientView={true}
          />
        )
      case MenuSectionType.MENU_ITEMS:
        return (
          <MenuItemsSection
            key={`${section.type}-${index}`}
            section={section}
            mode="view"
            onRemove={() => {}}
            onEdit={undefined}
            onSectionUpdated={() => {}}
            sectionDefinitions={[]}
            layoutId=""
            menuLayout={restaurantInfo?.menuLayout?.layout || 'default'}
            isClientView={true}
          />
        )
      default:
        return null
    }
  }

  return (
    <Container>
      <RestaurantHeader logo={restaurantInfo?.logo} restaurantName={restaurantInfo?.name || ''} />
      <Content>
        <RestaurantClientWarningBanner />
        <RestaurantOperationWarningBanner
          operationId={restaurantInfo?.operationId || null}
          businessHours={restaurantInfo?.businessHours}
        />
        {restaurantInfo?.menuLayout ? (
          <SectionsContainer>
            {restaurantInfo.menuLayout.sections.map((section, index) => renderSection(section, index))}
          </SectionsContainer>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
            Menu não disponível
          </div>
        )}
      </Content>
      <MobileNavigation />
    </Container>
  )
}
