import { ShoppingCartIcon, TagIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { GetMenuItemsUsecase } from '@/application/menu-items/get-menu-items.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { getMenuItemsConfig } from '@/presentation/hooks/use-menu-layouts'

import * as S from '../styles'

interface MenuItemData {
  id: string
  name: string
  description?: string
  price: number
  discount: number
  categoryName?: string
  medias?: string
}

interface MenuItemsViewProps {
  section: MenuSection
}

export const MenuItemsView: React.FC<MenuItemsViewProps> = ({ section }) => {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { restaurant } = useRestaurant()

  // Estados para drag horizontal
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const menuItemsData = getMenuItemsConfig(section)
  const sectionType = (menuItemsData?.type as 'custom' | 'best_sellers' | 'discounts') || 'custom'
  const sectionTitle = menuItemsData?.title || getDefaultTitle(sectionType)
  const isAllMenuItems =
    menuItemsData?.menuItemIds === null || menuItemsData?.menuItemIds === undefined

  // Função para obter título padrão baseado no tipo
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

  // Carrega menu items para exibição
  const loadMenuItemsForDisplay = useCallback(async () => {
    if (!restaurant?.id) return

    console.log('MenuItemsView - loadMenuItemsForDisplay called:', {
      restaurantId: restaurant.id,
      sectionType,
      isAllMenuItems,
      sectionMenuItemIds: menuItemsData?.menuItemIds
    })

    setIsLoading(true)
    try {
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const result = await getMenuItemsUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })

      let filteredItems = result.menuItems

      // Filtrar baseado no tipo da seção
      if (sectionType === 'best_sellers') {
        // TODO: Implementar lógica de mais vendidos
        filteredItems = result.menuItems.slice(0, 10) // Temporário: primeiros 10
      } else if (sectionType === 'discounts') {
        filteredItems = result.menuItems.filter((item) => item.discount > 0)
      } else if (sectionType === 'custom' && !isAllMenuItems && menuItemsData?.menuItemIds) {
        filteredItems = result.menuItems.filter((item) => menuItemsData?.menuItemIds?.includes(item.id))
      }

      console.log('MenuItemsView - loadMenuItemsForDisplay result:', {
        totalItems: result.menuItems.length,
        filteredItemsCount: filteredItems.length,
        items: filteredItems.map((item) => ({ id: item.id, name: item.name }))
      })

      setMenuItems(filteredItems)
    } catch {
      toast.error('Erro ao carregar itens do menu')
    } finally {
      setIsLoading(false)
    }
  }, [restaurant?.id, sectionType, isAllMenuItems, menuItemsData?.menuItemIds])

  useEffect(() => {
    loadMenuItemsForDisplay()
  }, [loadMenuItemsForDisplay])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatDiscountPrice = (price: number, discount: number) => {
    const discountedPrice = price - (price * discount) / 100
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(discountedPrice)
  }

  if (isLoading) {
    return (
      <S.ViewContainer>
        <S.LoadingContainer>
          <S.LoadingSpinner />
          <span>Carregando itens do menu...</span>
        </S.LoadingContainer>
      </S.ViewContainer>
    )
  }

  if (!menuItems.length) {
    return null
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
          {sectionTitle && (
            <S.SectionTitle>
              <ShoppingCartIcon size={20} />
              <span>{sectionTitle}</span>
            </S.SectionTitle>
          )}
          <S.MenuItemsGrid
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <S.MenuItemCard>
                  {item.medias && (
                    <S.MenuItemImage src={item.medias} alt={item.name} />
                  )}
                  <S.MenuItemContent>
                    <S.MenuItemName>{item.name}</S.MenuItemName>
                    {item.description && (
                      <S.MenuItemDescription>{item.description}</S.MenuItemDescription>
                    )}
                    {item.categoryName && (
                      <S.MenuItemCategory>
                        <TagIcon size={12} />
                        <span>{item.categoryName}</span>
                      </S.MenuItemCategory>
                    )}
                    <S.MenuItemPrice>
                      {item.discount > 0 ? (
                        <>
                          <S.OriginalPrice>{formatPrice(item.price)}</S.OriginalPrice>
                          <S.DiscountPrice>{formatDiscountPrice(item.price, item.discount)}</S.DiscountPrice>
                          <S.DiscountBadge>-{item.discount}%</S.DiscountBadge>
                        </>
                      ) : (
                        <span>{formatPrice(item.price)}</span>
                      )}
                    </S.MenuItemPrice>
                  </S.MenuItemContent>
                </S.MenuItemCard>
              </motion.div>
            ))}
          </S.MenuItemsGrid>
        </S.ViewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
