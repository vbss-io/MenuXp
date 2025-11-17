import { Loading } from '@menuxp/ui'
import { ArrowLeftIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslator } from 'vbss-translator'

import { useCart } from '@/hooks/use-cart'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import { getRestaurantMenuItem } from '@/services/menu/get-menu-item'

import { ChildBackButton as BackButton, ChildContainer as Container } from '../styles'
import * as S from './styles'

export const RestaurantProductPage = () => {
  const { t } = useTranslator()
  const { slug, productId } = useParams<{ slug: string; productId: string }>()
  const navigate = useNavigate()
  const { restaurant } = useRestaurant({ slug: slug ?? '' })
  const { client } = useClient()

  const { addItem } = useCart({
    clientId: client?.id || '',
    restaurantId: restaurant?.id?.toString() ?? '',
    enabled: !!restaurant?.id
  })

  const [quantity, setQuantity] = useState(1)
  const [selectedOptionals, setSelectedOptionals] = useState<Record<string, number>>({})
  const [note, setNote] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const {
    data: menuItem,
    isLoading,
    error
  } = useQuery({
    queryKey: ['menu-item', restaurant?.id, productId],
    queryFn: () => getRestaurantMenuItem({ restaurantId: restaurant?.id?.toString() ?? '', menuItemId: productId! }),
    enabled: !!restaurant?.id && !!productId
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

  const handleOptionalQuantityChange = (optionalName: string, increment: boolean) => {
    setSelectedOptionals((prev) => {
      const currentQuantity = prev[optionalName] || 0
      const maxQuantity = menuItem?.optionals.find((opt) => opt.name === optionalName)?.maxQuantity
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
    if (!menuItem) return 0
    const basePrice = menuItem.price - (menuItem.price * menuItem.discount) / 100
    const optionalsPrice = Object.entries(selectedOptionals).reduce((total, [optionalName, qty]) => {
      const optional = menuItem.optionals.find((opt) => opt.name === optionalName)
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
    if (!menuItem) return
    setIsAddingToCart(true)
    try {
      const optionals = Object.entries(selectedOptionals)
        .filter(([_, qty]) => qty > 0)
        .map(([optionalName, qty]) => {
          const optional = menuItem.optionals.find((opt) => opt.name === optionalName)
          return {
            name: optionalName,
            price: optional?.price || 0,
            quantity: qty
          }
        })
      await addItem({
        itemId: menuItem.id,
        itemType: 'menu-item',
        quantity,
        optionals: optionals.length > 0 ? optionals : undefined,
        note: note.trim()
      })
      resetForm()
      toast.success(t('Item adicionado ao carrinho com sucesso!'))
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      toast.error(t('Erro ao adicionar item ao carrinho. Tente novamente.'))
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
            <span>{t('Carregando produto...')}</span>
          </S.ProductContainer>
        </Container>
      </>
    )
  }

  if (error || !menuItem) {
    return (
      <>
        <Container>
          <BackButton onClick={handleBackClick}>
            <ArrowLeftIcon size={20} />
            {t('Voltar ao menu')}
          </BackButton>
          <S.ErrorMessage>{error?.message || t('Produto não encontrado')}</S.ErrorMessage>
        </Container>
      </>
    )
  }

  const hasDiscount = menuItem.discount > 0
  const finalPrice = menuItem.price - (menuItem.price * menuItem.discount) / 100

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <ArrowLeftIcon size={20} />
        {t('Voltar ao menu')}
      </BackButton>
      <S.ProductContainer>
        {menuItem.medias.length > 0 && (
          <S.ProductImage
            src={menuItem.medias[0]}
            alt={t(menuItem.name, { preferExternal: true, sourceLanguage: 'pt' })}
          />
        )}
        <S.ProductInfo>
          <S.ProductTitle>{t(menuItem.name, { preferExternal: true, sourceLanguage: 'pt' })}</S.ProductTitle>
          {menuItem.description && (
            <S.ProductDescription>
              {t(menuItem.description, { preferExternal: true, sourceLanguage: 'pt' })}
            </S.ProductDescription>
          )}
          <S.PriceContainer>
            <S.Price $primaryColor={restaurant?.style?.primaryColor || '#E53036'}>R$ {finalPrice.toFixed(2)}</S.Price>
            {hasDiscount && (
              <>
                <S.OriginalPrice>R$ {menuItem.price.toFixed(2)}</S.OriginalPrice>
                <S.DiscountBadge $secondaryColor={restaurant?.style?.secondaryColor || '#FEBA0C'}>
                  -{menuItem.discount}%
                </S.DiscountBadge>
              </>
            )}
          </S.PriceContainer>
        </S.ProductInfo>
        {menuItem.optionals.length > 0 && (
          <S.OptionalsSection>
            <S.OptionalsTitle>{t('Opcionais')}</S.OptionalsTitle>
            {menuItem.optionals.map((optional) => (
              <S.OptionalItem key={optional.name}>
                <S.OptionalInfo>
                  <S.OptionalName>{t(optional.name, { preferExternal: true, sourceLanguage: 'pt' })}</S.OptionalName>
                  <S.OptionalPrice>R$ {optional.price.toFixed(2)}</S.OptionalPrice>
                </S.OptionalInfo>
                <S.OptionalControls>
                  <S.QuantityButton
                    onClick={() => handleOptionalQuantityChange(optional.name, false)}
                    disabled={!selectedOptionals[optional.name]}
                  >
                    <MinusIcon size={16} />
                  </S.QuantityButton>
                  <S.QuantityDisplay>{selectedOptionals[optional.name] || 0}</S.QuantityDisplay>
                  <S.QuantityButton
                    onClick={() => handleOptionalQuantityChange(optional.name, true)}
                    disabled={optional.maxQuantity ? selectedOptionals[optional.name] >= optional.maxQuantity : false}
                  >
                    <PlusIcon size={16} />
                  </S.QuantityButton>
                </S.OptionalControls>
              </S.OptionalItem>
            ))}
          </S.OptionalsSection>
        )}
        <S.NotesSection>
          <S.NotesLabel>{t('Observações')}</S.NotesLabel>
          <S.NotesInput
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t('Ex: sem cebola, bem assado...')}
            maxLength={200}
          />
        </S.NotesSection>
        <S.AddToCartSection>
          <S.QuantitySection>
            <S.QuantityLabel>{t('Quantidade')}</S.QuantityLabel>
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
            <span>{t('Total')}</span>
            <span>R$ {calculateTotalPrice().toFixed(2)}</span>
          </S.TotalPrice>
          <S.AddToCartButton
            $primaryColor={restaurant?.style?.primaryColor || '#E53036'}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCartIcon size={20} />
            {isAddingToCart ? t('Adicionando...') : t('Adicionar ao Carrinho')}
          </S.AddToCartButton>
        </S.AddToCartSection>
      </S.ProductContainer>
    </Container>
  )
}
