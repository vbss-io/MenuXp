import { Loading } from '@menuxp/ui'
import { ShoppingCartIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslator } from 'vbss-translator'

import { MenuItemCard } from '@/components/menu-item/menu-item-card'
import { MenuItemDialog } from '@/components/menu-item/menu-item-dialog'
import { useRestaurant } from '@/hooks/use-restaurant'
import { getRestaurantMenuItems } from '@/services/menu/get-menu-items'
import type { MenuItem } from '@/types/menu-item'
import { MenuSectionType, type MenuItemsConfig, type MenuSection } from '@/types/menu-layout'

import * as S from './styles'

interface MenuItemsSectionProps {
  section: MenuSection
  mockItems?: MenuItem[]
}

export const MenuItemsSection: React.FC<MenuItemsSectionProps> = ({ section, mockItems }) => {
  const { t } = useTranslator()
  const { layout } = useRestaurant()
  const { restaurant } = useRestaurant()

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dragStartTime, setDragStartTime] = useState(0)
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const getMenuItemsConfig = (section: MenuSection): MenuItemsConfig | null => {
    if (section.type === MenuSectionType.MENU_ITEMS) {
      return section.config as MenuItemsConfig
    }
    return null
  }

  const menuItemsData = getMenuItemsConfig(section)
  const sectionType = (menuItemsData?.type as 'custom' | 'best_sellers' | 'discounts') || 'custom'
  const sectionTitle = menuItemsData?.title || getDefaultTitle(sectionType)
  const isAllMenuItems = menuItemsData?.menuItemIds === null || menuItemsData?.menuItemIds === undefined

  const { data: apiMenuItems = [], isLoading } = useQuery({
    queryKey: ['menu-items', restaurant?.id, sectionType, menuItemsData?.menuItemIds],
    queryFn: () =>
      getRestaurantMenuItems({
        restaurantId: restaurant?.id?.toString() as string,
        type: sectionType,
        menuItemIds:
          sectionType === 'custom' && !isAllMenuItems && menuItemsData?.menuItemIds
            ? menuItemsData.menuItemIds
            : undefined
      }),
    enabled: !!restaurant?.id && !mockItems
  })

  const menuItems = mockItems || apiMenuItems

  function getDefaultTitle(type: string): string {
    switch (type) {
      case 'best_sellers':
        return t('Mais Vendidos')
      case 'discounts':
        return t('Com Descontos')
      case 'custom':
      default:
        return ''
    }
  }

  const handleAddToCart = (item: MenuItem) => {
    if (isDragActive) {
      return
    }
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedItem(null)
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('.add-to-cart-button')) {
      return
    }
    if (!containerRef.current) return
    setIsDragging(true)
    setIsDragActive(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
    setDragStartTime(Date.now())
    setDragStartPosition({ x: e.pageX, y: e.pageY })
    setHasMoved(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      const deltaX = Math.abs(e.pageX - dragStartPosition.x)
      const deltaY = Math.abs(e.pageY - dragStartPosition.y)
      if (deltaX > 5 || deltaY > 5) {
        setHasMoved(true)
        e.preventDefault()
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 2
        containerRef.current.scrollLeft = scrollLeft - walk
      }
    },
    [isDragging, startX, scrollLeft, dragStartPosition]
  )

  const handleMouseUp = useCallback(() => {
    const dragDuration = Date.now() - dragStartTime
    if (dragDuration < 150 && !hasMoved) {
      setIsDragging(false)
      setTimeout(() => setIsDragActive(false), 100)
      return
    }
    setIsDragging(false)
    setTimeout(() => setIsDragActive(false), 100)
  }, [dragStartTime, hasMoved])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
    setTimeout(() => setIsDragActive(false), 100)
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

  if (isLoading) {
    return (
      <S.ViewContainer className={`view-container menu-items-section layout-${layout}`}>
        <S.LoadingContainer className="loading-container">
          <Loading />
          <span>{t('Carregando itens do menu...')}</span>
        </S.LoadingContainer>
      </S.ViewContainer>
    )
  }

  if (!menuItems.length) {
    return (
      <S.ViewContainer className={`view-container menu-items-section layout-${layout}`}>
        <S.EmptyStateContainer className="empty-state-container">
          <S.EmptyStateDescription className="empty-state-description">
            {t('Não há itens disponíveis para exibir nesta seção.')}
          </S.EmptyStateDescription>
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
          <S.ViewContainer className={`view-container menu-items-section layout-${layout}`}>
            {sectionTitle && (
              <S.SectionTitle className="section-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingCartIcon size={20} />
                  <span>{t(sectionTitle, { preferExternal: true, sourceLanguage: 'pt' })}</span>
                </div>
              </S.SectionTitle>
            )}
            <S.MenuItemsGrid
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              className="menu-items-grid"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <MenuItemCard item={item} onAddToCart={handleAddToCart} disabled={isDragActive} />
                </motion.div>
              ))}
            </S.MenuItemsGrid>
          </S.ViewContainer>
        </motion.div>
      </AnimatePresence>
      {selectedItem && <MenuItemDialog isOpen={isDialogOpen} onClose={handleCloseDialog} item={selectedItem} />}
    </>
  )
}
