import { CheckCircleIcon } from '@phosphor-icons/react'

import { useRestaurant } from '@/hooks/use-restaurant'
import type { ComboItem } from '@/types/combo'

import * as S from './styles'

interface ComboItemsListProps {
  items: ComboItem[]
}

export const ComboItemsList: React.FC<ComboItemsListProps> = ({ items }) => {
  const { primaryColor, layout } = useRestaurant()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <S.Container $layout={layout} className="combo-items-list">
      <S.Title $layout={layout} className="combo-items-title">
        Itens incluídos neste combo:
      </S.Title>
      <S.ItemsList $layout={layout} className="combo-items">
        {items.map((item, index) => (
          <S.Item
            key={`${item.menuItemId}-${index}`}
            $layout={layout}
            $primaryColor={primaryColor}
            className="combo-item"
          >
            <S.ItemIcon $primaryColor={primaryColor} className="combo-item-icon">
              <CheckCircleIcon size={20} weight="fill" />
            </S.ItemIcon>
            <S.ItemInfo $layout={layout} className="combo-item-info">
              <S.ItemName $layout={layout} className="combo-item-name">
                {item.quantity > 1 && <S.ItemQuantity>{item.quantity}x</S.ItemQuantity>}
                {item.name}
              </S.ItemName>
              <S.ItemPrice $layout={layout} className="combo-item-price">
                {formatPrice(item.price * item.quantity)}
              </S.ItemPrice>
            </S.ItemInfo>
          </S.Item>
        ))}
      </S.ItemsList>
    </S.Container>
  )
}
