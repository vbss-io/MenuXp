import { MinusIcon, PlusIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTranslator } from 'vbss-translator'

import { ComboItemsList } from '@/components/combo/combo-items-list'
import { useCart } from '@/hooks/use-cart'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import type { Combo } from '@/types/combo'
import { Button, Dialog, FormTextarea, useLayout } from '@menuxp/ui'

import * as S from './styles'

interface ComboDialogProps {
  isOpen: boolean
  onClose: () => void
  item: Combo
}

export const ComboDialog = ({ isOpen, onClose, item }: ComboDialogProps) => {
  const { t } = useTranslator()
  const { client } = useClient()
  const { restaurant } = useRestaurant()
  const { layout } = useLayout()
  const { addItem } = useCart({
    clientId: client?.id,
    restaurantId: restaurant?.id?.toString() ?? '',
    enabled: !!restaurant?.id
  })

  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity((prev) => prev + 1)
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const calculateTotalPrice = () => {
    const basePrice = item.price - (item.price * item.discount) / 100
    return basePrice * quantity
  }

  const resetForm = () => {
    setQuantity(1)
    setNote('')
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      await addItem({
        itemId: item.id,
        itemType: 'combo',
        quantity,
        note: note.trim()
      })
      resetForm()
      onClose()
    } catch (error) {
      console.error('Erro ao adicionar combo ao carrinho:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const hasDiscount = item.discount > 0
  const finalPrice = item.price - (item.price * item.discount) / 100

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <S.DialogContent className={`combo-dialog layout-${layout}`}>
        <S.DialogHeader className="dialog-header">
          <S.ProductImage src={item.medias[0]} alt={item.name} className="product-image" />
          <S.ProductInfo className="product-info">
            <S.ComboBadge className="combo-badge">{t('COMBO')}</S.ComboBadge>
            <S.ProductTitle className="product-title">{item.name}</S.ProductTitle>
            {item.description && (
              <S.ProductDescription className="product-description">{item.description}</S.ProductDescription>
            )}
            <S.PriceContainer className="price-container">
              <S.Price className="price">R$ {finalPrice.toFixed(2)}</S.Price>
              {hasDiscount && (
                <>
                  <S.OriginalPrice className="original-price">R$ {item.price.toFixed(2)}</S.OriginalPrice>
                  <S.DiscountBadge className="discount-badge">-{item.discount}%</S.DiscountBadge>
                </>
              )}
            </S.PriceContainer>
          </S.ProductInfo>
        </S.DialogHeader>
        <S.DialogBody>
          <ComboItemsList items={item.items} />
          <S.NotesSection>
            <FormTextarea
              id="notes"
              label={t('Observações')}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('Ex: sem cebola, bem assado...')}
              rows={3}
            />
          </S.NotesSection>
          <S.QuantitySection>
            <S.QuantityLabel className="quantity-label">{t('Quantidade')}</S.QuantityLabel>
            <S.OptionalControls>
              <Button variant="outline" size="sm" onClick={() => handleQuantityChange(false)} disabled={quantity <= 1}>
                <MinusIcon size={16} />
              </Button>
              <S.QuantityDisplay className="quantity-display">{quantity}</S.QuantityDisplay>
              <Button variant="outline" size="sm" onClick={() => handleQuantityChange(true)}>
                <PlusIcon size={16} />
              </Button>
            </S.OptionalControls>
          </S.QuantitySection>
          <S.TotalPrice className="total-price">
            <span>{t('Total')}</span>
            <span>R$ {calculateTotalPrice().toFixed(2)}</span>
          </S.TotalPrice>
        </S.DialogBody>
        <S.DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {t('Cancelar')}
          </Button>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            leftIcon={<ShoppingCartIcon size={20} />}
          >
            {isAddingToCart ? t('Adicionando...') : t('Adicionar ao Carrinho')}
          </Button>
        </S.DialogFooter>
      </S.DialogContent>
    </Dialog>
  )
}
