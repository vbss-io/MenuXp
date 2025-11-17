import { Button } from '@menuxp/ui'
import { PencilIcon, ShoppingCartIcon, TrashIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

import { GetMenuItemsUsecase } from '@/application/menu-items/get-menu-items.usecase'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { getMenuItemsConfig } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from '../styles'

interface MenuItemData {
  id: string
  name: string
  description?: string
  price: number
  discount: number
  categoryName?: string
  medias?: string[]
}

interface MenuItemsPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
  menuLayout?: string
}

export const MenuItemsPreviewEdit: React.FC<MenuItemsPreviewEditProps> = ({ section, onEdit, onRemove }) => {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([])
  const { restaurant } = useRestaurant()

  const menuItemsData = getMenuItemsConfig(section)
  const sectionType = (menuItemsData?.type as 'custom' | 'best_sellers' | 'discounts') || 'custom'
  const sectionTitle = menuItemsData?.title || getDefaultTitle(sectionType)
  const isCustomType = sectionType === 'custom'

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

  function getTypeDisplayName(type: string): string {
    switch (type) {
      case 'custom':
        return 'Itens Personalizados'
      case 'best_sellers':
        return 'Mais Vendidos'
      case 'discounts':
        return 'Com Descontos'
      default:
        return 'Itens Personalizados'
    }
  }

  const loadMenuItems = useCallback(async () => {
    if (!restaurant?.id) return
    const getMenuItemsUsecase = new GetMenuItemsUsecase()
    const result = await getMenuItemsUsecase.execute({
      restaurantId: restaurant.id,
      includeInactive: false
    })
    const allMenuItems = result.menuItems.map((item) => ({
      ...item,
      medias: typeof item.medias === 'string' ? [item.medias] : item.medias
    }))
    setMenuItems(allMenuItems)
  }, [restaurant?.id])

  useEffect(() => {
    loadMenuItems()
  }, [loadMenuItems])

  const selectedMenuItems =
    isCustomType && menuItemsData?.menuItemIds
      ? menuItems.filter((item) => menuItemsData.menuItemIds?.includes(item.id))
      : []

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>
              <ShoppingCartIcon size={20} />
              <span>Itens do Menu</span>
            </S.PreviewTitle>
            <S.ActionButtons>
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <PencilIcon size={16} />
                </Button>
              )}
              {onRemove && (
                <Button variant="outline" size="sm" onClick={onRemove}>
                  <TrashIcon size={16} />
                </Button>
              )}
            </S.ActionButtons>
          </S.PreviewHeader>
          <S.PreviewContent>
            {isCustomType && selectedMenuItems.length > 0 && (
              <S.MenuItemsPreviewList>
                {selectedMenuItems.slice(0, 4).map((item) => (
                  <S.MenuItemPreviewItem key={item.id}>
                    <S.MenuItemPreviewImage>
                      {item.medias && item.medias.length > 0 ? (
                        <img src={item.medias[0]} alt={item.name} />
                      ) : (
                        <div>Sem imagem</div>
                      )}
                    </S.MenuItemPreviewImage>
                    <S.MenuItemPreviewName>{item.name}</S.MenuItemPreviewName>
                  </S.MenuItemPreviewItem>
                ))}
                {selectedMenuItems.length > 4 && (
                  <S.MoreItemsIndicator>+{selectedMenuItems.length - 4}</S.MoreItemsIndicator>
                )}
              </S.MenuItemsPreviewList>
            )}
            <S.ConfigurationPreview>
              <S.ConfigurationItem>
                <S.ConfigurationLabel>Tipo:</S.ConfigurationLabel>
                <S.ConfigurationValue>{getTypeDisplayName(sectionType)}</S.ConfigurationValue>
              </S.ConfigurationItem>
              {sectionTitle && (
                <S.ConfigurationItem>
                  <S.ConfigurationLabel>Título:</S.ConfigurationLabel>
                  <S.ConfigurationValue>{sectionTitle}</S.ConfigurationValue>
                </S.ConfigurationItem>
              )}
              {isCustomType && (
                <S.ConfigurationItem>
                  <S.ConfigurationLabel>Quantidade:</S.ConfigurationLabel>
                  <S.ConfigurationValue>
                    {selectedMenuItems.length} {selectedMenuItems.length === 1 ? 'item' : 'itens'}
                  </S.ConfigurationValue>
                </S.ConfigurationItem>
              )}
            </S.ConfigurationPreview>
          </S.PreviewContent>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
