import { MinusIcon, PlusIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { MenuItemOptionals } from '@/components/menu-item/menu-item-optionals'
import { Button } from '@menuxp/ui'
import { Dialog } from '@menuxp/ui'
import { FormTextarea } from '@menuxp/ui'
import { useCart } from '@/hooks/use-cart'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import type { MenuItem } from '@/types/menu-item'

import * as S from './styles'

interface MenuItemDialogProps {
  isOpen: boolean
  onClose: () => void
  item: MenuItem
}

export const MenuItemDialog = ({ isOpen, onClose, item }: MenuItemDialogProps) => {
  const { client } = useClient()
  const { restaurant, primaryColor, secondaryColor, layout } = useRestaurant()
  const { addItem } = useCart({
    clientId: client?.id,
    restaurantId: restaurant?.id?.toString() ?? '',
    enabled: !!restaurant?.id
  })

  const [quantity, setQuantity] = useState(1)
  const [selectedOptionals, setSelectedOptionals] = useState<Record<string, number>>({})
  const [note, setNote] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity((prev) => prev + 1)
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleOptionalQuantityChange = (optionalName: string, increment: boolean) => {
    setSelectedOptionals((prev) => {
      const currentQuantity = prev[optionalName] || 0
      const maxQuantity = item.optionals.find((opt) => opt.name === optionalName)?.maxQuantity
      if (increment) {
        if (!maxQuantity || currentQuantity < maxQuantity) {
          return { ...prev, [optionalName]: currentQuantity + 1 }
        }
      } else if (currentQuantity > 0) {
        return { ...prev, [optionalName]: currentQuantity - 1 }
      }
      return prev
    })
  }

  const calculateTotalPrice = () => {
    const basePrice = item.price - (item.price * item.discount) / 100
    const optionalsPrice = Object.entries(selectedOptionals).reduce((total, [optionalName, qty]) => {
      const optional = item.optionals.find((opt) => opt.name === optionalName)
      return total + (optional?.price || 0) * qty
    }, 0)
    return (basePrice + optionalsPrice) * quantity
  }

  const resetForm = () => {
    setQuantity(1)
    setSelectedOptionals({})
    setNote('')
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const optionals = Object.entries(selectedOptionals)
        .filter(([_, qty]) => qty > 0)
        .map(([optionalName, qty]) => {
          const optional = item.optionals.find((opt) => opt.name === optionalName)
          return {
            name: optionalName,
            price: optional?.price || 0,
            quantity: qty
          }
        })
      await addItem({
        itemId: item.id,
        itemType: 'menu-item',
        quantity,
        optionals: optionals.length > 0 ? optionals : undefined,
        note: note.trim()
      })
      resetForm()
      onClose()
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
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
      <S.DialogContent
        $layout={layout}
        $primaryColor={primaryColor}
        $secondaryColor={secondaryColor}
        className="menu-item-dialog"
        style={
          {
            '--primary-color': primaryColor,
            '--secondary-color': secondaryColor
          } as React.CSSProperties
        }
      >
        <S.DialogHeader
          $layout={layout}
          $primaryColor={primaryColor}
          $secondaryColor={secondaryColor}
          className="dialog-header"
        >
          <S.ProductImage src={item.medias[0]} alt={item.name} $layout={layout} className="product-image" />
          <S.ProductInfo
            $layout={layout}
            $primaryColor={primaryColor}
            $secondaryColor={secondaryColor}
            className="product-info"
          >
            <S.ProductTitle
              $layout={layout}
              $primaryColor={primaryColor}
              $secondaryColor={secondaryColor}
              className="product-title"
            >
              {item.name}
            </S.ProductTitle>
            {item.description && (
              <S.ProductDescription
                $layout={layout}
                $primaryColor={primaryColor}
                $secondaryColor={secondaryColor}
                className="product-description"
              >
                {item.description}
              </S.ProductDescription>
            )}
            <S.PriceContainer
              $layout={layout}
              $primaryColor={primaryColor}
              $secondaryColor={secondaryColor}
              className="price-container"
            >
              <S.Price $layout={layout} $primaryColor={primaryColor} $secondaryColor={secondaryColor} className="price">
                R$ {finalPrice.toFixed(2)}
              </S.Price>
              {hasDiscount && (
                <>
                  <S.OriginalPrice
                    $layout={layout}
                    $primaryColor={primaryColor}
                    $secondaryColor={secondaryColor}
                    className="original-price"
                  >
                    R$ {item.price.toFixed(2)}
                  </S.OriginalPrice>
                  <S.DiscountBadge
                    $layout={layout}
                    $primaryColor={primaryColor}
                    $secondaryColor={secondaryColor}
                    className="discount-badge"
                  >
                    -{item.discount}%
                  </S.DiscountBadge>
                </>
              )}
            </S.PriceContainer>
          </S.ProductInfo>
        </S.DialogHeader>
        <S.DialogBody>
          <MenuItemOptionals
            optionals={item.optionals}
            selectedOptionals={selectedOptionals}
            onOptionalChange={handleOptionalQuantityChange}
          />
          <S.NotesSection>
            <FormTextarea
              id="notes"
              label="Observações"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: sem cebola, bem assado..."
              rows={3}
            />
          </S.NotesSection>
          <S.QuantitySection>
            <S.QuantityLabel>Quantidade</S.QuantityLabel>
            <S.OptionalControls>
              <Button variant="outline" size="sm" onClick={() => handleQuantityChange(false)} disabled={quantity <= 1}>
                <MinusIcon size={16} />
              </Button>
              <S.QuantityDisplay>{quantity}</S.QuantityDisplay>
              <Button variant="outline" size="sm" onClick={() => handleQuantityChange(true)}>
                <PlusIcon size={16} />
              </Button>
            </S.OptionalControls>
          </S.QuantitySection>
          <S.TotalPrice $layout={layout} $primaryColor={primaryColor} $secondaryColor={secondaryColor}>
            <span>Total</span>
            <span>R$ {calculateTotalPrice().toFixed(2)}</span>
          </S.TotalPrice>
        </S.DialogBody>
        <S.DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            leftIcon={<ShoppingCartIcon size={20} />}
          >
            {isAddingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho'}
          </Button>
        </S.DialogFooter>
      </S.DialogContent>
    </Dialog>
  )
}
