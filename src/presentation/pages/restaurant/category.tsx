import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowLeftIcon, FolderIcon } from '@phosphor-icons/react'
import { GetRestaurantMenuItemsByCategoryUsecase } from '@/application/clients-menu/get-restaurant-menu-items-by-category.usecase'
import { RestaurantHeader } from '@/presentation/components/entities/menu/restaurant-header'
import { MenuItemCard } from '@/presentation/components/entities/menu-layouts/sections/menu-items-section/components/menu-item-card'
import { Loading } from '@/presentation/components/ui/loading'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { useClient } from '@/presentation/hooks/use-client'
import { ICONS_KEYS, ICONS } from '@/domain/consts/icons.const.tsx'
import { MobileNavigation } from '@/presentation/components/entities/menu/mobile-navigation'
import { ClientAuthDialog } from '@/presentation/components/entities/clients/client-auth-dialog'
import toast from 'react-hot-toast'

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`

const Content = styled.div`
  padding: 60px 20px 100px 20px;
  margin: 0 auto;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 8px 0;

  &:hover {
    opacity: 0.8;
  }
`

const CategoryHeader = styled.div<{ secondaryColor: string }>`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: ${({ secondaryColor }) => `${secondaryColor}15`};
  border: 1px solid ${({ secondaryColor }) => `${secondaryColor}30`};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const CategoryIcon = styled.div<{ primaryColor: string }>`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ primaryColor }) => primaryColor};
  border-radius: 12px;
  color: white;
`

const CategoryInfo = styled.div`
  flex: 1;
`

const CategoryName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 8px 0;
`

const CategoryDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`

const MenuItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
`

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`

const EmptyStateDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`

interface CategoryData {
  id: string
  name: string
  description?: string
  icon?: string
}

export const RestaurantCategoryPage = () => {
  const { slug, categoryId } = useParams<{ slug: string; categoryId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { restaurant } = useRestaurant()
  const { client } = useClient()

  const [menuItems, setMenuItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)

  // Pegar dados da categoria do estado de navegação
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
    const loadMenuItems = async () => {
      if (!restaurant?.id || !categoryId) {
        navigate('/404')
        return
      }

      setIsLoading(true)
      try {
        const usecase = new GetRestaurantMenuItemsByCategoryUsecase()
        const result = await usecase.execute({
          restaurantId: restaurant.id,
          categoryId
        })
        setMenuItems(result.menuItems)
      } catch {
        toast.error('Erro ao carregar produtos da categoria')
        navigate('/404')
      } finally {
        setIsLoading(false)
      }
    }

    loadMenuItems()
  }, [restaurant?.id, categoryId, navigate])

  const handleBackClick = () => {
    navigate(`/${slug}`)
  }

  const handleMenuItemClick = (item: any) => {
    navigate(`/${slug}/product/${item.id}`, { state: { product: item } })
  }

  const handleAuthRequired = () => {
    console.log('handleAuthRequired called from category page, setting dialog to open')
    setIsAuthDialogOpen(true)
  }

  console.log('Category page render', { isAuthDialogOpen, client })

  if (isLoading) {
    return (
      <>
        <RestaurantHeader logo={restaurant?.logo} restaurantName={restaurant?.name || ''} />
        <Container>
          <Content>
            <LoadingContainer>
              <Loading />
              <span>Carregando produtos...</span>
            </LoadingContainer>
          </Content>
        </Container>
      </>
    )
  }

  return (
    <Container>
      <RestaurantHeader logo={restaurant?.logo} restaurantName={restaurant?.name || ''} />
      <Content>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon size={20} />
          Voltar ao menu
        </BackButton>

        {categoryData && (
          <CategoryHeader secondaryColor={restaurant?.style?.secondaryColor || '#FEBA0C'}>
            <CategoryIcon primaryColor={restaurant?.style?.primaryColor || '#E53036'}>
              {getIconComponent(categoryData.icon)}
            </CategoryIcon>
            <CategoryInfo>
              <CategoryName>{categoryData.name}</CategoryName>
              {categoryData.description && <CategoryDescription>{categoryData.description}</CategoryDescription>}
            </CategoryInfo>
          </CategoryHeader>
        )}

        {!menuItems.length ? (
          <EmptyStateContainer>
            <EmptyStateDescription>Não há produtos disponíveis nesta categoria.</EmptyStateDescription>
          </EmptyStateContainer>
        ) : (
          <MenuItemsGrid>
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                layout="default"
                primaryColor={restaurant?.style?.primaryColor}
                secondaryColor={restaurant?.style?.secondaryColor}
                onClick={handleMenuItemClick}
                isClientView={true}
                onAuthRequired={handleAuthRequired}
              />
            ))}
          </MenuItemsGrid>
        )}
      </Content>
      <MobileNavigation />

      <ClientAuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        onSuccess={() => setIsAuthDialogOpen(false)}
      />
    </Container>
  )
}
