import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowLeftIcon, MinusIcon, PlusIcon, TrashIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { RestaurantHeader } from '@/presentation/components/entities/menu/restaurant-header'
import { MobileNavigation } from '@/presentation/components/entities/menu/mobile-navigation'
import { Loading } from '@/presentation/components/ui/loading'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { useClient } from '@/presentation/hooks/use-client'
import { useCart } from '@/presentation/hooks/use-cart'
import { ClientAuthDialog } from '@/presentation/components/entities/clients/client-auth-dialog'
import { CheckoutSlide } from '@/presentation/components/entities/orders/checkout-slide'
import { GetRestaurantInfoUsecase } from '@/application/clients-menu/get-restaurant-info.usecase'
import { toast } from 'react-hot-toast'
import type { Restaurant } from '@/domain/models/restaurant.model'

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

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 400px;
  width: 100%;
`

const CartTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 16px 0;
  text-align: center;
`

const CartDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  text-align: center;
  max-width: 600px;
`

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  width: 100%;
  max-width: 600px;
`

const CartItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`

const CartItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CartItemName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const CartItemPrice = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const CartItemOptionals = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

const OptionalTag = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.mx.gray[100]};
  padding: 2px 6px;
  border-radius: 4px;
`

const CartItemControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: 4px;
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
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 16px;
  text-align: center;
`

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`

const CartSummary = styled.div`
  margin-top: 24px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 600px;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 12px;
    border-top: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
    font-weight: 600;
    font-size: 18px;
  }
`

const ActionButton = styled.button<{ variant: 'danger' | 'primary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background-color: ${({ variant }) => (variant === 'danger' ? '#ef4444' : '#3B82F6')};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;

  &:hover {
    opacity: 0.9;
  }
`

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: 20px;
`

export const RestaurantCartPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { restaurant, setClientRestaurant } = useRestaurant()
  const { client } = useClient()

  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false)

  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  useEffect(() => {
    const loadRestaurantData = async () => {
      if (!slug || restaurant) return

      setIsLoadingRestaurant(true)
      try {
        const usecase = new GetRestaurantInfoUsecase()
        const result = await usecase.execute({ slug })

        const restaurantData = {
          id: result.restaurant.id,
          name: result.restaurant.name,
          description: result.restaurant.description,
          logo: result.restaurant.logo,
          address: result.restaurant.address,
          contactInfo: result.restaurant.contactInfo,
          style: result.restaurant.style,
          settings: result.restaurant.settings,
          isActive: true,
          slug: slug,
          ownerId: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        setClientRestaurant(restaurantData as Restaurant)
      } catch (error) {
        console.error('Erro ao carregar dados do restaurante:', error)
        navigate('/404')
      } finally {
        setIsLoadingRestaurant(false)
      }
    }

    loadRestaurantData()
  }, [slug, restaurant, setClientRestaurant, navigate])

  const { cart, isLoading, error, removeItem, updateQuantity, clearCart } = useCart({
    clientId: client?.id || '',
    restaurantId: restaurant?.id || '',
    enabled: !!client?.id && !!restaurant?.id
  })

  useEffect(() => {
    if (!client) {
      setIsAuthDialogOpen(true)
    }
  }, [client])

  const handleBackClick = () => {
    navigate(`/${slug}`)
  }

  const handleAuthSuccess = () => {
    setIsAuthDialogOpen(false)
  }

  const handleQuantityChange = async (menuItemId: string, increment: boolean, optionals?: any[]) => {
    const currentItem = cart?.items.find((item) => {
      if (item.menuItemId !== menuItemId) return false
      if (!item.optionals && !optionals) return true
      if (!item.optionals || !optionals) return false
      if (item.optionals.length !== optionals.length) return false
      return item.optionals.every((itemOpt, index) => {
        const opt = optionals[index]
        return itemOpt.name === opt.name && itemOpt.price === opt.price && itemOpt.quantity === opt.quantity
      })
    })

    if (!currentItem) return

    const newQuantity = increment ? currentItem.quantity + 1 : currentItem.quantity - 1

    if (newQuantity <= 0) {
      await removeItem(menuItemId, currentItem.optionals)
    } else {
      await updateQuantity(menuItemId, newQuantity, currentItem.optionals)
    }
  }

  const handleRemoveItem = async (menuItemId: string, optionals?: any[]) => {
    await removeItem(menuItemId, optionals)
  }

  const handleClearCart = async () => {
    if (window.confirm('Tem certeza que deseja limpar o carrinho?')) {
      await clearCart()
    }
  }

  const handleCheckoutSuccess = () => {
    toast.success('Pedido finalizado com sucesso!')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const calculateSubtotal = () => {
    if (!cart?.items) return 0
    return cart.items.reduce((total, item) => {
      const itemPrice = item.price
      const optionalsPrice = item.optionals?.reduce((optTotal, opt) => optTotal + opt.price, 0) || 0
      return total + (itemPrice + optionalsPrice) * item.quantity
    }, 0)
  }

  const renderCartContent = () => {
    if (isLoading) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Loading />
          <span>Carregando carrinho...</span>
        </div>
      )
    }

    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>
    }

    if (cart?.items && cart.items.length > 0) {
      return (
        <>
          <CartItemsContainer>
            {cart.items.map((item) => (
              <CartItem key={item.menuItemId}>
                <CartItemInfo>
                  <CartItemName>{item.name}</CartItemName>
                  <CartItemPrice>{formatPrice(item.price)}</CartItemPrice>
                  {item.optionals && item.optionals.length > 0 && (
                    <CartItemOptionals>
                      {item.optionals.map((optional, index) => (
                        <OptionalTag key={index}>
                          {optional.name} (+{formatPrice(optional.price)})
                        </OptionalTag>
                      ))}
                    </CartItemOptionals>
                  )}
                </CartItemInfo>
                <CartItemControls>
                  <QuantityControls>
                    <QuantityButton
                      onClick={() => handleQuantityChange(item.menuItemId, false, item.optionals)}
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon size={16} />
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton onClick={() => handleQuantityChange(item.menuItemId, true, item.optionals)}>
                      <PlusIcon size={16} />
                    </QuantityButton>
                  </QuantityControls>
                  <RemoveButton onClick={() => handleRemoveItem(item.menuItemId, item.optionals)}>
                    <TrashIcon size={16} />
                  </RemoveButton>
                </CartItemControls>
              </CartItem>
            ))}
          </CartItemsContainer>
          <CartSummary>
            <SummaryRow>
              <span>Subtotal</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </SummaryRow>

            <ActionButton variant="primary" onClick={() => setIsCheckoutOpen(true)}>
              <ShoppingCartIcon size={16} />
              Finalizar Pedido
            </ActionButton>
            <ActionButton variant="danger" onClick={handleClearCart}>
              <TrashIcon size={16} />
              Limpar Carrinho
            </ActionButton>
          </CartSummary>
        </>
      )
    }

    return (
      <EmptyCartMessage>
        <h3>Seu carrinho está vazio</h3>
        <p>Adicione alguns itens do menu para começar!</p>
      </EmptyCartMessage>
    )
  }

  if (isLoadingRestaurant) {
    return (
      <>
        <RestaurantHeader logo={restaurant?.logo} restaurantName={restaurant?.name || ''} />
        <Container>
          <Content>
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px' }}
            >
              <Loading />
              <span>Carregando dados do restaurante...</span>
            </div>
          </Content>
        </Container>
      </>
    )
  }

  return (
    <Container>
      <RestaurantHeader logo={restaurant?.logo} restaurantName={restaurant?.name || ''} />
      <Content>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon size={20} />
          Voltar ao menu
        </BackButton>

        <CartContainer>
          {client ? (
            <>
              <CartTitle>Carrinho de Compras</CartTitle>
              {renderCartContent()}
            </>
          ) : (
            <>
              <CartTitle>Acesso Restrito</CartTitle>
              <CartDescription>Você precisa estar logado para acessar o carrinho de compras.</CartDescription>
            </>
          )}
        </CartContainer>
      </Content>
      <MobileNavigation />

      <ClientAuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <CheckoutSlide
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </Container>
  )
}
