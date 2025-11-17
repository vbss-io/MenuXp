import { Button } from '@menuxp/ui'
import { PlusIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { useTranslator } from 'vbss-translator'

import { useRestaurant } from '@/hooks/use-restaurant'
import type { MenuItem } from '@/types/menu-item'

import * as S from './styles'

interface MenuItemCardProps {
  item: MenuItem
  onClick?: (item: MenuItem) => void
  onAddToCart?: (item: MenuItem) => void
  disabled?: boolean
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onClick, onAddToCart, disabled = false }) => {
  const { t } = useTranslator()
  const { layout } = useRestaurant()
  const navigate = useNavigate()
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
    if (disabled) return
    navigate(`product/${item.id}`)
    if (onClick) {
      onClick(item)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart(item)
    }
  }

  return (
    <S.MenuItemCard
      onClick={handleCardClick}
      className={`menu-item-card layout-${layout}`}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {item.discount > 0 && (
        <S.DiscountChip className="discount-chip">
          <span>-{item.discount}%</span>
        </S.DiscountChip>
      )}
      {item.medias && item.medias.length > 0 && (
        <S.MenuItemImage
          src={item.medias[0]}
          alt={t(item.name, { preferExternal: true, sourceLanguage: 'pt' })}
          className="menu-item-image"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
      <S.MenuItemContent className="menu-item-content">
        <S.MenuItemName className="menu-item-name">
          {t(item.name, { preferExternal: true, sourceLanguage: 'pt' })}
        </S.MenuItemName>
        {item.description && (
          <S.MenuItemDescription className="menu-item-description">
            {t(item.description, { preferExternal: true, sourceLanguage: 'pt' })}
          </S.MenuItemDescription>
        )}
        <S.MenuItemFooter className="menu-item-footer">
          <S.MenuItemPrice className="menu-item-price">
            {item.discount > 0 ? (
              <>
                <S.DiscountPrice className="discount-price">
                  {formatDiscountPrice(item.price, item.discount)}
                </S.DiscountPrice>
                <S.OriginalPrice className="original-price">{formatPrice(item.price)}</S.OriginalPrice>
              </>
            ) : (
              <S.CurrentPrice className="current-price">{formatPrice(item.price)}</S.CurrentPrice>
            )}
          </S.MenuItemPrice>
          <Button variant="primary" size="sm" onClick={handleAddToCart} className="add-to-cart-button">
            <PlusIcon size={20} />
          </Button>
        </S.MenuItemFooter>
      </S.MenuItemContent>
    </S.MenuItemCard>
  )
}
