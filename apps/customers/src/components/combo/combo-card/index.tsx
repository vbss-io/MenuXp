import { PlusIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { useTranslator } from 'vbss-translator'

import type { Combo } from '@/types/combo'
import { Button, useLayout } from '@menuxp/ui'

import * as S from './styles'

interface ComboCardProps {
  item: Combo
  onClick?: (item: Combo) => void
  onAddToCart?: (item: Combo) => void
  disabled?: boolean
}

export const ComboCard: React.FC<ComboCardProps> = ({ item, onClick, onAddToCart, disabled = false }) => {
  const { t } = useTranslator()
  const { layout } = useLayout()
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
      onClick={handleCardClick}
      className={`combo-card layout-${layout}`}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <S.ComboBadge className="combo-badge">{t('COMBO')}</S.ComboBadge>
      {item.discount > 0 && (
        <S.DiscountChip className="discount-chip">
          <span>-{item.discount}%</span>
        </S.DiscountChip>
      )}
      {item.medias && item.medias.length > 0 && (
        <S.ComboImage
          src={item.medias[0]}
          alt={item.name}
          className="combo-image"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
      <S.ComboContent className="combo-content">
        <S.ComboName className="combo-name">{item.name}</S.ComboName>
        {item.description && <S.ComboDescription className="combo-description">{item.description}</S.ComboDescription>}
        <S.ComboItemsCount className="combo-items-count">
          {item.items.length} {item.items.length === 1 ? t('item') : t('itens')}
        </S.ComboItemsCount>
        <S.ComboFooter className="combo-footer">
          <S.ComboPrice className="combo-price">
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
          </S.ComboPrice>
          <Button variant="primary" size="sm" onClick={handleAddToCart} className="add-to-cart-button">
            <PlusIcon size={20} />
          </Button>
        </S.ComboFooter>
      </S.ComboContent>
    </S.ComboCard>
  )
}
