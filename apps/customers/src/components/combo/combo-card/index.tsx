import { PlusIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useRestaurant } from '@/hooks/use-restaurant'
import type { Combo } from '@/types/combo'

import * as S from './styles'

interface ComboCardProps {
  item: Combo
  onClick?: (item: Combo) => void
  onAddToCart?: (item: Combo) => void
  disabled?: boolean
}

export const ComboCard: React.FC<ComboCardProps> = ({ item, onClick, onAddToCart, disabled = false }) => {
  const { primaryColor, secondaryColor, layout } = useRestaurant()
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
    navigate(`combo/${item.id}`)
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
    <S.ComboCard
      $layout={layout}
      $primaryColor={primaryColor}
      $secondaryColor={secondaryColor}
      onClick={handleCardClick}
      className="combo-card"
      style={
        {
          cursor: 'pointer',
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor
        } as React.CSSProperties
      }
    >
      <S.ComboBadge
        $layout={layout}
        $primaryColor={primaryColor}
        $secondaryColor={secondaryColor}
        className="combo-badge"
      >
        COMBO
      </S.ComboBadge>
      {item.discount > 0 && (
        <S.DiscountChip
          $layout={layout}
          $primaryColor={primaryColor}
          $secondaryColor={secondaryColor}
          className="discount-chip"
        >
          <span>-{item.discount}%</span>
        </S.DiscountChip>
      )}
      {item.medias && item.medias.length > 0 && (
        <S.ComboImage
          src={item.medias[0]}
          alt={item.name}
          $layout={layout}
          className="combo-image"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
      <S.ComboContent $layout={layout} className="combo-content">
        <S.ComboName
          $layout={layout}
          $primaryColor={primaryColor}
          $secondaryColor={secondaryColor}
          className="combo-name"
        >
          {item.name}
        </S.ComboName>
        {item.description && (
          <S.ComboDescription $layout={layout} className="combo-description">
            {item.description}
          </S.ComboDescription>
        )}
        <S.ComboItemsCount $layout={layout} className="combo-items-count">
          {item.items.length} {item.items.length === 1 ? 'item' : 'itens'}
        </S.ComboItemsCount>
        <S.ComboFooter $layout={layout} className="combo-footer">
          <S.ComboPrice
            $layout={layout}
            $primaryColor={primaryColor}
            $secondaryColor={secondaryColor}
            className="combo-price"
          >
            {item.discount > 0 ? (
              <>
                <S.DiscountPrice
                  $layout={layout}
                  $primaryColor={primaryColor}
                  $secondaryColor={secondaryColor}
                  className="discount-price"
                >
                  {formatDiscountPrice(item.price, item.discount)}
                </S.DiscountPrice>
                <S.OriginalPrice $layout={layout} className="original-price">
                  {formatPrice(item.price)}
                </S.OriginalPrice>
              </>
            ) : (
              <S.CurrentPrice
                $layout={layout}
                $primaryColor={primaryColor}
                $secondaryColor={secondaryColor}
                className="current-price"
              >
                {formatPrice(item.price)}
              </S.CurrentPrice>
            )}
          </S.ComboPrice>
          <Button variant="primary" size="sm" onClick={handleAddToCart} className="add-to-cart-button">
            <PlusIcon size={20} />
          </Button>
        </S.ComboFooter>
      </S.ComboContent>
    </S.ComboCard>
  )
}
