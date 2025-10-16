import { ArrowLeftIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { ComboItemsList } from '@/components/combo/combo-items-list'
import { Loading } from '@menuxp/ui'
import { useCart } from '@/hooks/use-cart'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import { getRestaurantMenuCombo } from '@/services/menu/get-combo'

import { ChildBackButton as BackButton, ChildContainer as Container } from '../styles'
import * as S from './styles'

export const RestaurantComboPage = () => {
  const { slug, comboId } = useParams<{ slug: string; comboId: string }>()
  const navigate = useNavigate()
  const { restaurant } = useRestaurant({ slug: slug || '' })
  const { client } = useClient()

  const { addItem } = useCart({
    clientId: client?.id || '',
    restaurantId: restaurant?.id?.toString() ?? '',
    enabled: !!restaurant?.id
  })

  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const {
    data: combo,
    isLoading,
    error
  } = useQuery({
    queryKey: ['combo', restaurant?.id, comboId],
    queryFn: () => getRestaurantMenuCombo({ restaurantId: restaurant?.id?.toString() ?? '', comboId: comboId! }),
    enabled: !!restaurant?.id && !!comboId
  })

  const handleBackClick = () => {
    navigate(`/${slug}`)
  }

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity((prev) => prev + 1)
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const calculateTotalPrice = () => {
    if (!combo) return 0
    const basePrice = combo.price - (combo.price * combo.discount) / 100
    return basePrice * quantity
  }

  const resetForm = () => {
    setQuantity(1)
    setNote('')
  }

  const handleAddToCart = async () => {
    if (!combo) return
    setIsAddingToCart(true)
    try {
      await addItem({
        itemId: combo.id,
        itemType: 'combo',
        quantity,
        note: note.trim()
      })
      resetForm()
      toast.success('Combo adicionado ao carrinho com sucesso!')
    } catch (error) {
      console.error('Erro ao adicionar combo ao carrinho:', error)
      toast.error('Erro ao adicionar combo ao carrinho. Tente novamente.')
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <Container>
          <S.ProductContainer>
            <Loading />
            <span>Carregando combo...</span>
          </S.ProductContainer>
        </Container>
      </>
    )
  }

  if (error || !combo) {
    return (
      <>
        <Container>
          <BackButton onClick={handleBackClick}>
            <ArrowLeftIcon size={20} />
            Voltar ao menu
          </BackButton>
          <S.ErrorMessage>{error?.message || 'Combo não encontrado'}</S.ErrorMessage>
        </Container>
      </>
    )
  }

  const hasDiscount = combo.discount > 0
  const finalPrice = combo.price - (combo.price * combo.discount) / 100

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <ArrowLeftIcon size={20} />
        Voltar ao menu
      </BackButton>
      <S.ProductContainer>
        <S.ComboBadge $secondaryColor={restaurant?.style?.secondaryColor || '#FEBA0C'}>COMBO</S.ComboBadge>
        {combo.medias.length > 0 && <S.ProductImage src={combo.medias[0]} alt={combo.name} />}
        <S.ProductInfo>
          <S.ProductTitle>{combo.name}</S.ProductTitle>
          {combo.description && <S.ProductDescription>{combo.description}</S.ProductDescription>}
          <S.PriceContainer>
            <S.Price $primaryColor={restaurant?.style?.primaryColor || '#E53036'}>R$ {finalPrice.toFixed(2)}</S.Price>
            {hasDiscount && (
              <>
                <S.OriginalPrice>R$ {combo.price.toFixed(2)}</S.OriginalPrice>
                <S.DiscountBadge $secondaryColor={restaurant?.style?.secondaryColor || '#FEBA0C'}>
                  -{combo.discount}%
                </S.DiscountBadge>
              </>
            )}
          </S.PriceContainer>
        </S.ProductInfo>
        <S.ComboItemsSection>
          <ComboItemsList items={combo.items} />
        </S.ComboItemsSection>
        <S.NotesSection>
          <S.NotesLabel>Observações</S.NotesLabel>
          <S.NotesInput
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ex: sem cebola, bem assado..."
            maxLength={200}
          />
        </S.NotesSection>
        <S.AddToCartSection>
          <S.QuantitySection>
            <S.QuantityLabel>Quantidade</S.QuantityLabel>
            <S.OptionalControls>
              <S.QuantityButton onClick={() => handleQuantityChange(false)} disabled={quantity <= 1}>
                <MinusIcon size={16} />
              </S.QuantityButton>
              <S.QuantityDisplay>{quantity}</S.QuantityDisplay>
              <S.QuantityButton onClick={() => handleQuantityChange(true)}>
                <PlusIcon size={16} />
              </S.QuantityButton>
            </S.OptionalControls>
          </S.QuantitySection>
          <S.TotalPrice>
            <span>Total</span>
            <span>R$ {calculateTotalPrice().toFixed(2)}</span>
          </S.TotalPrice>
          <S.AddToCartButton
            $primaryColor={restaurant?.style?.primaryColor || '#E53036'}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCartIcon size={20} />
            {isAddingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho'}
          </S.AddToCartButton>
        </S.AddToCartSection>
      </S.ProductContainer>
    </Container>
  )
}
