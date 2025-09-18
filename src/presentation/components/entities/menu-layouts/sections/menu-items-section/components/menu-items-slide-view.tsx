import { XIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { GetRestaurantMenuItemsUsecase } from '@/application/clients-menu/get-restaurant-menu-items.usecase'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { Loading } from '@/presentation/components/ui/loading'
import { getMenuItemsConfig } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import type { MenuItemData } from '../types'
import { MenuItemCard } from './menu-item-card'
import * as S from '../styles'

interface MenuItemsSlideViewProps {
  section: MenuSection
  menuLayout?: string
  isOpen: boolean
  onClose: () => void
}

export const MenuItemsSlideView: React.FC<MenuItemsSlideViewProps> = ({ section, menuLayout, isOpen, onClose }) => {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { restaurant } = useRestaurant()
  const navigate = useNavigate()

  const menuItemsData = getMenuItemsConfig(section)
  const sectionType = (menuItemsData?.type as 'custom' | 'best_sellers' | 'discounts') || 'custom'
  const sectionTitle = menuItemsData?.title || getDefaultTitle(sectionType)
  const isAllMenuItems = menuItemsData?.menuItemIds === null || menuItemsData?.menuItemIds === undefined
  const layoutType = menuLayout || 'default'

  const primaryColor = restaurant?.style?.primaryColor
  const secondaryColor = restaurant?.style?.secondaryColor

  function getDefaultTitle(type: string): string {
    switch (type) {
      case 'best_sellers':
        return 'Mais Vendidos'
      case 'discounts':
        return 'Com Descontos'
      case 'custom':
      default:
        return ''
    }
  }

  useEffect(() => {
    if (isOpen && restaurant?.id) {
      loadMenuItemsForDisplay()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, restaurant?.id])

  const loadMenuItemsForDisplay = async () => {
    if (!restaurant?.id) return
    setIsLoading(true)
    try {
      const getRestaurantMenuItemsUsecase = new GetRestaurantMenuItemsUsecase()
      const result = await getRestaurantMenuItemsUsecase.execute({
        restaurantId: restaurant.id,
        type: sectionType,
        menuItemIds:
          sectionType === 'custom' && !isAllMenuItems && menuItemsData?.menuItemIds
            ? menuItemsData.menuItemIds
            : undefined
      })
      setMenuItems(result.menuItems)
    } catch {
      toast.error('Erro ao carregar itens do menu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMenuItemClick = (item: MenuItemData) => {
    navigate(`/${restaurant?.slug}/product/${item.id}`, {
      state: { product: item }
    })
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <S.SlideOverlay onClick={handleBackdropClick}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <S.SlideContainer>
              <S.SlideHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShoppingCartIcon size={24} style={{ color: primaryColor }} />
                  <span>{sectionTitle}</span>
                </div>
                <S.CloseButton onClick={onClose}>
                  <XIcon size={24} />
                </S.CloseButton>
              </S.SlideHeader>
              <S.SlideContent>
                {isLoading && (
                  <S.LoadingContainer>
                    <Loading />
                    <span>Carregando itens do menu...</span>
                  </S.LoadingContainer>
                )}
                {!isLoading && !menuItems.length && (
                  <S.EmptyStateContainer>
                    <S.EmptyStateDescription>Não há itens disponíveis para exibir nesta seção.</S.EmptyStateDescription>
                  </S.EmptyStateContainer>
                )}
                {!isLoading && menuItems.length > 0 && (
                  <S.SlideGrid>
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <MenuItemCard
                          item={item}
                          layout={layoutType}
                          primaryColor={primaryColor}
                          secondaryColor={secondaryColor}
                          onClick={handleMenuItemClick}
                          isClientView={true}
                        />
                      </motion.div>
                    ))}
                  </S.SlideGrid>
                )}
              </S.SlideContent>
            </S.SlideContainer>
          </motion.div>
        </S.SlideOverlay>
      )}
    </AnimatePresence>
  )
}
