import { CheckCircleIcon } from '@phosphor-icons/react'
import { useTranslator } from 'vbss-translator'

import type { ComboItem } from '@/types/combo'
import { useLayout } from '@menuxp/ui'

import * as S from './styles'

interface ComboItemsListProps {
  items: ComboItem[]
}

export const ComboItemsList: React.FC<ComboItemsListProps> = ({ items }) => {
  const { t } = useTranslator()
  const { layout } = useLayout()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <S.Container className={`combo-items-list layout-${layout}`}>
      <S.Title className="combo-items-title">{t('Itens incluídos neste combo:')}</S.Title>
      <S.ItemsList className="combo-items">
        {items.map((item, index) => (
          <S.Item key={`${item.menuItemId}-${index}`} className="combo-item">
            <S.ItemIcon className="combo-item-icon">
              <CheckCircleIcon size={20} weight="fill" />
            </S.ItemIcon>
            <S.ItemInfo className="combo-item-info">
              <S.ItemName className="combo-item-name">
                {item.quantity > 1 && <S.ItemQuantity>{item.quantity}x</S.ItemQuantity>}
                {item.name}
              </S.ItemName>
              <S.ItemPrice className="combo-item-price">{formatPrice(item.price * item.quantity)}</S.ItemPrice>
            </S.ItemInfo>
          </S.Item>
        ))}
      </S.ItemsList>
    </S.Container>
  )
}
