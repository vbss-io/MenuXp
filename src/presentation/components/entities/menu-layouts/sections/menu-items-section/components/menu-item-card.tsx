import { PlusIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { useCart } from '@/presentation/hooks/use-cart'
import { useClient } from '@/presentation/hooks/use-client'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import * as S from '../styles'
import type { MenuItemData } from '../types'

interface MenuItemCardProps {
  item: MenuItemData
  layout?: string
  primaryColor?: string
  secondaryColor?: string
  onClick?: (item: MenuItemData) => void
  isClientView?: boolean
  onAuthRequired?: () => void
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  // layout = 'default',
  // primaryColor,
  // secondaryColor,
  onClick,
  isClientView = false,
  onAuthRequired
}) => {
  const { client } = useClient()
  const { restaurant } = useRestaurant()
  const { addItem } = useCart({
    clientId: client?.id || '',
    restaurantId: restaurant?.id || '',
    enabled: !!client?.id && !!restaurant?.id && isClientView
  })

  const [isAddingToCart, setIsAddingToCart] = useState(false)
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

  const handleCardClick = () => {
    if (onClick && isClientView) {
      onClick(item)
    }
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isClientView) {
      return
    }
    if (!client) {
      if (onAuthRequired) {
        onAuthRequired()
      }
      return
    }

    if (client) {
      setIsAddingToCart(true)
      try {
        await addItem({
          menuItemId: item.id,
          quantity: 1
        })
        alert('Item adicionado ao carrinho com sucesso!')
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error)
        alert('Erro ao adicionar item ao carrinho. Tente novamente.')
      } finally {
        setIsAddingToCart(false)
      }
    }
  }

  return (
    <S.MenuItemCard
      // layout={layout}
      // primaryColor={primaryColor}
      // secondaryColor={secondaryColor}
      onClick={handleCardClick}
      style={{ cursor: isClientView ? 'pointer' : 'default' }}
    >
      {item.discount > 0 && (
        <S.DiscountChip
        // layout={layout}
        // primaryColor={primaryColor}
        // secondaryColor={secondaryColor}
        >
          <span>-{item.discount}%</span>
        </S.DiscountChip>
      )}
      {item.medias && item.medias.length > 0 && (
        <S.MenuItemImage
        // src={item.medias[0]}
        // alt={item.name}
        // layout={layout}
        />
      )}
      <S.MenuItemContent
      // layout={layout}
      >
        <S.MenuItemName
        // layout={layout}
        // primaryColor={primaryColor}
        // secondaryColor={secondaryColor}
        >
          {item.name}
        </S.MenuItemName>
        {item.description && (
          <S.MenuItemDescription
          // layout={layout}
          >
            {item.description}
          </S.MenuItemDescription>
        )}
        <S.MenuItemFooter
        // layout={layout}
        >
          <S.MenuItemPrice
          // layout={layout}
          // primaryColor={primaryColor}
          // secondaryColor={secondaryColor}
          >
            {item.discount > 0 ? (
              <>
                <S.DiscountPrice
                // layout={layout}
                // primaryColor={primaryColor}
                // secondaryColor={secondaryColor}
                >
                  {formatDiscountPrice(item.price, item.discount)}
                </S.DiscountPrice>
                <S.OriginalPrice
                // layout={layout}
                >
                  {formatPrice(item.price)}
                </S.OriginalPrice>
              </>
            ) : (
              <S.CurrentPrice
              // layout={layout} primaryColor={primaryColor} secondaryColor={secondaryColor}
              >
                {formatPrice(item.price)}
              </S.CurrentPrice>
            )}
          </S.MenuItemPrice>
          <S.AddToCartButton
            // layout={layout}
            // primaryColor={primaryColor}
            // secondaryColor={secondaryColor}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <PlusIcon size={20} />
            {isAddingToCart ? '...' : ''}
          </S.AddToCartButton>
        </S.MenuItemFooter>
      </S.MenuItemContent>
    </S.MenuItemCard>
  )
}
