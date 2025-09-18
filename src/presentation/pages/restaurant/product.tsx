import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowLeftIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { RestaurantHeader } from '@/presentation/components/entities/menu/restaurant-header'
import { Loading } from '@/presentation/components/ui/loading'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { useRestaurantMenuItem } from '@/presentation/hooks/use-restaurant-menu-item'
import { useClient } from '@/presentation/hooks/use-client'
import { useCart } from '@/presentation/hooks/use-cart'
import { MobileNavigation } from '@/presentation/components/entities/menu/mobile-navigation'
import { ClientAuthDialog } from '@/presentation/components/entities/clients/client-auth-dialog'

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`

const Content = styled.div`
  padding: 60px 20px 100px 20px;
  margin: 0 auto;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 8px 0;

  &:hover {
    opacity: 0.8;
  }
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
`

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.mx.gray[100]};
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ProductTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const ProductDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`

const Price = styled.span<{ primaryColor: string }>`
  font-size: 24px;
  font-weight: 600;
  color: ${({ primaryColor }) => primaryColor};
`

const OriginalPrice = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: line-through;
`

const DiscountBadge = styled.span<{ secondaryColor: string }>`
  background-color: ${({ secondaryColor }) => secondaryColor};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`

const OptionalsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const OptionalsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const OptionalItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`

const OptionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const OptionalName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`

const OptionalPrice = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const OptionalControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const QuantityDisplay = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 20px;
  text-align: center;
`

const AddToCartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

const QuantityLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`

const AddToCartButton = styled.button<{ primaryColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  background-color: ${({ primaryColor }) => primaryColor};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ primaryColor }) => primaryColor};
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: 20px;
`

export const RestaurantProductPage = () => {
  const { slug, productId } = useParams<{ slug: string; productId: string }>()
  const navigate = useNavigate()
  const { restaurant } = useRestaurant()
  const { client } = useClient()

  const { addItem } = useCart({
    clientId: client?.id || '',
    restaurantId: restaurant?.id || '',
    enabled: !!client?.id && !!restaurant?.id
  })

  const [quantity, setQuantity] = useState(1)
  const [selectedOptionals, setSelectedOptionals] = useState<Record<string, number>>({})
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const { menuItem, isLoading, error } = useRestaurantMenuItem({
    restaurantId: restaurant?.id || '',
    menuItemId: productId || '',
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

  const handleAddToCart = async () => {
    if (!client) {
      setIsAuthDialogOpen(true)
      return
    }

    if (!menuItem) return

    setIsAddingToCart(true)
    try {
      // Converter selectedOptionals para o formato esperado pelo backend
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
        menuItemId: menuItem.id,
        quantity,
        optionals: optionals.length > 0 ? optionals : undefined
      })

      // Resetar estados após adicionar ao carrinho
      setQuantity(1)
      setSelectedOptionals({})

      // Mostrar feedback de sucesso
      alert('Item adicionado ao carrinho com sucesso!')
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      alert('Erro ao adicionar item ao carrinho. Tente novamente.')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleAuthSuccess = () => {
    // Cliente logado, agora pode adicionar ao carrinho
    handleAddToCart()
  }

  if (isLoading) {
    return (
      <>
        <RestaurantHeader logo={restaurant?.logo} restaurantName={restaurant?.name || ''} />
        <Container>
          <Content>
            <ProductContainer>
              <Loading />
              <span>Carregando produto...</span>
            </ProductContainer>
          </Content>
        </Container>
      </>
    )
  }

  if (error || !menuItem) {
    return (
      <>
        <RestaurantHeader logo={restaurant?.logo} restaurantName={restaurant?.name || ''} />
        <Container>
          <Content>
            <BackButton onClick={handleBackClick}>
              <ArrowLeftIcon size={20} />
              Voltar ao menu
            </BackButton>
            <ErrorMessage>{error || 'Produto não encontrado'}</ErrorMessage>
          </Content>
        </Container>
      </>
    )
  }

  const hasDiscount = menuItem.discount > 0
  const finalPrice = menuItem.price - (menuItem.price * menuItem.discount) / 100

  return (
    <Container>
      <RestaurantHeader logo={restaurant?.logo} restaurantName={restaurant?.name || ''} />
      <Content>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon size={20} />
          Voltar ao menu
        </BackButton>

        <ProductContainer>
          {menuItem.medias.length > 0 && <ProductImage src={menuItem.medias[0]} alt={menuItem.name} />}

          <ProductInfo>
            <ProductTitle>{menuItem.name}</ProductTitle>
            {menuItem.description && <ProductDescription>{menuItem.description}</ProductDescription>}

            <PriceContainer>
              <Price primaryColor={restaurant?.style?.primaryColor || '#E53036'}>R$ {finalPrice.toFixed(2)}</Price>
              {hasDiscount && (
                <>
                  <OriginalPrice>R$ {menuItem.price.toFixed(2)}</OriginalPrice>
                  <DiscountBadge secondaryColor={restaurant?.style?.secondaryColor || '#FEBA0C'}>
                    -{menuItem.discount}%
                  </DiscountBadge>
                </>
              )}
            </PriceContainer>
          </ProductInfo>

          {menuItem.optionals.length > 0 && (
            <OptionalsSection>
              <OptionalsTitle>Opcionais</OptionalsTitle>
              {menuItem.optionals.map((optional) => (
                <OptionalItem key={optional.name}>
                  <OptionalInfo>
                    <OptionalName>{optional.name}</OptionalName>
                    <OptionalPrice>R$ {optional.price.toFixed(2)}</OptionalPrice>
                  </OptionalInfo>
                  <OptionalControls>
                    <QuantityButton
                      onClick={() => handleOptionalQuantityChange(optional.name, false)}
                      disabled={!selectedOptionals[optional.name]}
                    >
                      <MinusIcon size={16} />
                    </QuantityButton>
                    <QuantityDisplay>{selectedOptionals[optional.name] || 0}</QuantityDisplay>
                    <QuantityButton
                      onClick={() => handleOptionalQuantityChange(optional.name, true)}
                      disabled={optional.maxQuantity ? selectedOptionals[optional.name] >= optional.maxQuantity : false}
                    >
                      <PlusIcon size={16} />
                    </QuantityButton>
                  </OptionalControls>
                </OptionalItem>
              ))}
            </OptionalsSection>
          )}

          <AddToCartSection>
            <QuantitySection>
              <QuantityLabel>Quantidade</QuantityLabel>
              <OptionalControls>
                <QuantityButton onClick={() => handleQuantityChange(false)} disabled={quantity <= 1}>
                  <MinusIcon size={16} />
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(true)}>
                  <PlusIcon size={16} />
                </QuantityButton>
              </OptionalControls>
            </QuantitySection>

            <TotalPrice>
              <span>Total</span>
              <span>R$ {calculateTotalPrice().toFixed(2)}</span>
            </TotalPrice>

            <AddToCartButton
              primaryColor={restaurant?.style?.primaryColor || '#E53036'}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <ShoppingCartIcon size={20} />
              {isAddingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho'}
            </AddToCartButton>
          </AddToCartSection>
        </ProductContainer>
      </Content>
      <MobileNavigation />

      <ClientAuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </Container>
  )
}
