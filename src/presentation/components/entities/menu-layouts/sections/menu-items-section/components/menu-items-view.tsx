import { CaretRightIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { GetRestaurantMenuItemsUsecase } from '@/application/clients-menu/get-restaurant-menu-items.usecase'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { Loading } from '@/presentation/components/ui/loading'
import { getMenuItemsConfig } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from '../styles'
import type { MenuItemData } from '../types'
import { MenuItemCard } from './menu-item-card'
import { MenuItemsSlideView } from './menu-items-slide-view'

interface MenuItemsViewProps {
  section: MenuSection
  menuLayout?: string
  isClientView?: boolean
}

export const MenuItemsView: React.FC<MenuItemsViewProps> = ({ section, menuLayout, isClientView }) => {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { restaurant } = useRestaurant()
  const navigate = useNavigate()

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Estados para funcionalidade mobile
  const [isMobile, setIsMobile] = useState(false)
  const [isSlideOpen, setIsSlideOpen] = useState(false)

  const menuItemsData = getMenuItemsConfig(section)
  const sectionType = (menuItemsData?.type as 'custom' | 'best_sellers' | 'discounts') || 'custom'
  const sectionTitle = menuItemsData?.title || getDefaultTitle(sectionType)
  const isAllMenuItems = menuItemsData?.menuItemIds === null || menuItemsData?.menuItemIds === undefined
  const layoutType = menuLayout || 'default'

  const primaryColor = restaurant?.style?.primaryColor
  const secondaryColor = restaurant?.style?.secondaryColor

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const loadMenuItemsForDisplay = useCallback(async () => {
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
  }, [restaurant?.id, sectionType, isAllMenuItems, menuItemsData?.menuItemIds])

  useEffect(() => {
    loadMenuItemsForDisplay()
  }, [loadMenuItemsForDisplay])

  const handleMenuItemClick = (item: MenuItemData) => {
    if (isClientView) {
      navigate(`/${restaurant?.slug}/product/${item.id}`, {
        state: { product: item }
      })
    }
  }

  const handleExpandClick = () => {
    if (isClientView && isMobile) {
      setIsSlideOpen(true)
    }
  }

  // Determinar quais itens mostrar
  const itemsToShow = isClientView && isMobile ? menuItems.slice(0, 1) : menuItems

  if (isLoading) {
    return (
      <S.ViewContainer>
        <S.LoadingContainer>
          <Loading />
          <span>Carregando itens do menu...</span>
        </S.LoadingContainer>
      </S.ViewContainer>
    )
  }

  if (!menuItems.length) {
    return (
      <S.ViewContainer>
        <S.EmptyStateContainer>
          <S.EmptyStateDescription>Não há itens disponíveis para exibir nesta seção.</S.EmptyStateDescription>
        </S.EmptyStateContainer>
      </S.ViewContainer>
    )
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <S.ViewContainer>
            {sectionTitle && (
              <S.SectionTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingCartIcon size={20} style={{ color: primaryColor }} />
                  <span>{sectionTitle}</span>
                </div>
                {isClientView && isMobile && (
                  <CaretRightIcon
                    size={20}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      color: primaryColor
                    }}
                    onClick={handleExpandClick}
                  />
                )}
              </S.SectionTitle>
            )}
            <S.MenuItemsGrid
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              // layout={layoutType}
            >
              {itemsToShow.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <MenuItemCard
                    item={item}
                    layout={layoutType}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    onClick={handleMenuItemClick}
                    isClientView={isClientView}
                  />
                </motion.div>
              ))}
            </S.MenuItemsGrid>
          </S.ViewContainer>
        </motion.div>
      </AnimatePresence>

      {/* Slide View para Mobile */}
      <MenuItemsSlideView
        section={section}
        menuLayout={menuLayout}
        isOpen={isSlideOpen}
        onClose={() => setIsSlideOpen(false)}
      />
    </>
  )
}
