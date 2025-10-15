import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  CookingPotIcon,
  MinusIcon,
  PackageIcon,
  PencilIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
  TruckIcon
} from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { EditCartItemDialog } from '@/components/cart/edit-cart-item-dialog'
import { CheckoutSlideView } from '@/components/order/checkout-slide-view'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { Loading } from '@/components/ui/loading'
import { useCart } from '@/hooks/use-cart'
import { useClient } from '@/hooks/use-client'
import { useRestaurant } from '@/hooks/use-restaurant'
import { getOrdersByClient } from '@/services/order/get-orders-by-client'
import type { CartItem } from '@/types/cart'
import { OrderStatus } from '@/types/order'
import { useQuery } from '@tanstack/react-query'

import { ChildBackButton as BackButton, ChildContainer as Container } from '../styles'
import * as S from './styles'

const isSameCartItem = (
  item1: {
    itemId: string
    optionals?: { name: string; price: number; quantity: number }[]
    note?: string
  },
  item2: {
    itemId: string
    optionals?: { name: string; price: number; quantity: number }[]
    note?: string
  }
): boolean => {
  return (
    item1.itemId === item2.itemId &&
    JSON.stringify(item1.optionals || []) === JSON.stringify(item2.optionals || []) &&
    (item1.note || '') === (item2.note || '')
  )
}

export const RestaurantCartPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { restaurant } = useRestaurant({ slug: slug || '' })
  const { client } = useClient()

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CartItem | null>(null)
  const [isClearCartDialogOpen, setIsClearCartDialogOpen] = useState(false)

  const { cart, isLoading, error, removeItem, updateQuantity, clearCart, addItem } = useCart({
    clientId: client?.id,
    restaurantId: restaurant?.id?.toString() ?? '',
    enabled: !!restaurant?.id
  })

  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    refetch: refetchOrders
  } = useQuery({
    queryKey: ['orders', client?.id, restaurant?.id],
    queryFn: () =>
      getOrdersByClient({
        clientId: client!.id,
        restaurantId: restaurant!.id.toString()
      }),
    enabled: !!client?.id && !!restaurant?.id,
    staleTime: 30000,
    refetchInterval: 30000
  })

  const currentOrders = orders
    .filter((order) => order.status !== OrderStatus.DELIVERED && order.status !== OrderStatus.CANCELLED)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const latestOrder = currentOrders[0]

  const handleBackClick = () => {
    navigate(`/${slug}`)
  }

  const handleQuantityChange = async (
    itemId: string,
    increment: boolean,
    optionals?: { name: string; price: number; quantity: number }[],
    note?: string
  ) => {
    const currentItem = cart?.items.find((item) => isSameCartItem(item, { itemId, optionals, note }))
    if (!currentItem) return

    let newQuantity = currentItem.quantity
    if (increment) {
      newQuantity = currentItem.quantity + 1
    } else {
      newQuantity = currentItem.quantity - 1
    }

    if (newQuantity <= 0) {
      await removeItem(itemId, currentItem.optionals, currentItem.note)
    } else {
      await updateQuantity(itemId, newQuantity, currentItem.optionals, currentItem.note)
    }
  }

  const handleRemoveItem = async (
    itemId: string,
    optionals?: { name: string; price: number; quantity: number }[],
    note?: string
  ) => {
    await removeItem(itemId, optionals, note)
  }

  const handleClearCart = () => {
    setIsClearCartDialogOpen(true)
  }

  const confirmClearCart = async () => {
    await clearCart()
    setIsClearCartDialogOpen(false)
  }

  const handleEditItem = (item: CartItem) => {
    setEditingItem(item)
    setIsEditDialogOpen(true)
  }

  const handleSaveEditedItems = async (editedItems: CartItem[]) => {
    if (!editingItem) return
    try {
      await removeItem(editingItem.itemId, editingItem.optionals, editingItem.note)
      for (const editedItem of editedItems) {
        await addItem({
          itemId: editedItem.itemId,
          itemType: editedItem.itemType,
          quantity: editedItem.quantity,
          optionals: editedItem.optionals,
          note: editedItem.note || ''
        })
      }
      toast.success('Item editado com sucesso!')
    } catch (error) {
      console.error('Erro ao editar item:', error)
      toast.error('Erro ao editar item. Tente novamente.')
    }
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
      const itemTotal = item.price * item.quantity
      const optionalsTotal = (item.optionals ?? []).reduce((optTotal, opt) => optTotal + opt.price * opt.quantity, 0)
      return total + itemTotal + optionalsTotal
    }, 0)
  }

  const handleCheckoutSuccess = () => {
    toast.success('Pedido finalizado com sucesso!')
    refetchOrders()
  }

  const getOrderStatusLabel = (status: OrderStatus) => {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.RECEIVED]: 'Recebido',
      [OrderStatus.CONFIRMED]: 'Confirmado',
      [OrderStatus.IN_PRODUCTION]: 'Em Produção',
      [OrderStatus.READY]: 'Pronto',
      [OrderStatus.SENT_FOR_DELIVERY]: 'Saiu para Entrega',
      [OrderStatus.DELIVERED]: 'Entregue',
      [OrderStatus.CANCELLED]: 'Cancelado'
    }
    return labels[status] || status
  }

  const getOrderStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      [OrderStatus.RECEIVED]: '#3b82f6',
      [OrderStatus.CONFIRMED]: '#8b5cf6',
      [OrderStatus.IN_PRODUCTION]: '#f59e0b',
      [OrderStatus.READY]: '#10b981',
      [OrderStatus.SENT_FOR_DELIVERY]: '#06b6d4',
      [OrderStatus.DELIVERED]: '#22c55e',
      [OrderStatus.CANCELLED]: '#ef4444'
    }
    return colors[status] || '#6b7280'
  }

  const getOrderTimeline = (status: OrderStatus) => {
    const timelineSteps = [
      {
        status: OrderStatus.RECEIVED,
        label: 'Recebido',
        icon: <ClockIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.CONFIRMED,
        label: 'Confirmado',
        icon: <CheckCircleIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.IN_PRODUCTION,
        label: 'Preparando',
        icon: <CookingPotIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.READY,
        label: 'Pronto',
        icon: <PackageIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.SENT_FOR_DELIVERY,
        label: 'Saiu p/ Entrega',
        icon: <TruckIcon size={20} weight="fill" />
      },
      {
        status: OrderStatus.DELIVERED,
        label: 'Entregue',
        icon: <CheckCircleIcon size={20} weight="fill" />
      }
    ]

    const currentIndex = timelineSteps.findIndex((step) => step.status === status)

    return timelineSteps.map((step, index) => ({
      ...step,
      isCompleted: index <= currentIndex,
      isActive: index === currentIndex
    }))
  }

  const renderCartContent = () => {
    if (isLoading) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <Loading />
          <span>Carregando carrinho...</span>
        </div>
      )
    }

    if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>

    if (cart?.items && cart.items.length > 0) {
      return (
        <>
          <S.CartItemsContainer>
            {cart.items.map((item, index) => (
              <S.CartItem key={`${item.itemId}-${index}`}>
                <S.CartItemInfo>
                  <S.CartItemHeader>
                    <S.CartItemName>
                      {item.itemType === 'combo' ? (
                        <S.ComboIcon>
                          <PackageIcon size={16} weight="fill" />
                        </S.ComboIcon>
                      ) : null}
                      {item.name}
                    </S.CartItemName>
                    {item.itemType === 'combo' ? <S.ComboBadge>COMBO</S.ComboBadge> : null}
                  </S.CartItemHeader>
                  <S.CartItemPrice>{formatPrice(item.price)}</S.CartItemPrice>
                  {item.optionals && item.optionals.length > 0 ? (
                    <S.CartItemOptionals>
                      <S.OptionalsLabel>Opcionais:</S.OptionalsLabel>
                      {item.optionals.map((optional, optIndex) => {
                        let quantityText = ''
                        if (optional.quantity > 1) {
                          quantityText = `(x${optional.quantity})`
                        }

                        let priceText = ''
                        if (optional.price > 0) {
                          priceText = ` (+${formatPrice(optional.price)})`
                        }

                        return (
                          <S.OptionalTag key={optIndex}>
                            {optional.name} {quantityText}
                            {priceText}
                          </S.OptionalTag>
                        )
                      })}
                    </S.CartItemOptionals>
                  ) : null}
                  {item.note ? (
                    <S.CartItemNote>
                      <S.NoteLabel>Observação:</S.NoteLabel>
                      <S.NoteText>"{item.note}"</S.NoteText>
                    </S.CartItemNote>
                  ) : null}
                </S.CartItemInfo>
                <S.CartItemControls>
                  <S.QuantityControls>
                    <S.QuantityButton
                      onClick={() => handleQuantityChange(item.itemId, false, item.optionals, item.note)}
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon size={16} />
                    </S.QuantityButton>
                    <S.QuantityDisplay>{item.quantity}</S.QuantityDisplay>
                    <S.QuantityButton
                      onClick={() => handleQuantityChange(item.itemId, true, item.optionals, item.note)}
                    >
                      <PlusIcon size={16} />
                    </S.QuantityButton>
                  </S.QuantityControls>
                  <S.ActionButtons>
                    <S.EditButton onClick={() => handleEditItem(item)}>
                      <PencilIcon size={16} />
                    </S.EditButton>
                    <S.RemoveButton onClick={() => handleRemoveItem(item.itemId, item.optionals, item.note)}>
                      <TrashIcon size={16} />
                    </S.RemoveButton>
                  </S.ActionButtons>
                </S.CartItemControls>
              </S.CartItem>
            ))}
          </S.CartItemsContainer>
          <S.CartSummary>
            <S.SummaryRow>
              <span>Subtotal</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </S.SummaryRow>
            <S.SummaryRow>
              <span>Total</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </S.SummaryRow>
            <S.ActionButton variant="primary" onClick={() => setIsCheckoutOpen(true)}>
              <ShoppingCartIcon size={16} />
              Finalizar Pedido
            </S.ActionButton>
            <S.ActionButton variant="danger" onClick={handleClearCart}>
              <TrashIcon size={16} />
              Limpar Carrinho
            </S.ActionButton>
          </S.CartSummary>
        </>
      )
    }

    return (
      <S.EmptyCartMessage>
        <h3>Seu carrinho está vazio</h3>
        <p>Adicione alguns itens do menu para começar!</p>
      </S.EmptyCartMessage>
    )
  }

  const renderLatestOrder = () => {
    if (isLoadingOrders) {
      return (
        <S.OrderSection>
          <S.SectionTitle>Seu Pedido</S.SectionTitle>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Loading />
          </div>
        </S.OrderSection>
      )
    }

    if (!latestOrder) {
      return null
    }

    const timeline = getOrderTimeline(latestOrder.status)
    const otherOrders = currentOrders.slice(1)

    return (
      <S.OrderSection>
        <S.SectionTitle>Acompanhe seu Pedido</S.SectionTitle>
        <S.CurrentOrderCard>
          <S.OrderHeader>
            <S.OrderCode>Pedido #{latestOrder.code}</S.OrderCode>
            <S.OrderStatus color={getOrderStatusColor(latestOrder.status)}>
              {getOrderStatusLabel(latestOrder.status)}
            </S.OrderStatus>
          </S.OrderHeader>
          <S.OrderTimeline>
            {timeline.map((step, index) => (
              <S.TimelineStep key={step.status}>
                <S.TimelineIcon isCompleted={step.isCompleted} isActive={step.isActive}>
                  {step.icon}
                </S.TimelineIcon>
                <S.TimelineContent>
                  <S.TimelineLabel isCompleted={step.isCompleted} isActive={step.isActive}>
                    {step.label}
                  </S.TimelineLabel>
                </S.TimelineContent>
                {index < timeline.length - 1 ? <S.TimelineLine isCompleted={step.isCompleted} /> : null}
              </S.TimelineStep>
            ))}
          </S.OrderTimeline>
          <S.OrderInfo>
            <S.OrderDate>
              {new Date(latestOrder.createdAt).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </S.OrderDate>
            <S.OrderTotal>{formatPrice(latestOrder.total)}</S.OrderTotal>
          </S.OrderInfo>
        </S.CurrentOrderCard>
        {otherOrders.length > 0 ? (
          <S.OtherOrdersSection>
            <S.OtherOrdersTitle>Outros pedidos em andamento ({otherOrders.length})</S.OtherOrdersTitle>
            <S.OtherOrdersList>
              {otherOrders.map((order) => (
                <S.CompactOrderCard key={order.id}>
                  <S.CompactOrderHeader>
                    <S.CompactOrderCode>#{order.code}</S.CompactOrderCode>
                    <S.CompactOrderStatus color={getOrderStatusColor(order.status)}>
                      {getOrderStatusLabel(order.status)}
                    </S.CompactOrderStatus>
                  </S.CompactOrderHeader>
                  <S.CompactOrderInfo>
                    <S.CompactOrderDate>
                      {new Date(order.createdAt).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </S.CompactOrderDate>
                    <S.CompactOrderTotal>{formatPrice(order.total)}</S.CompactOrderTotal>
                  </S.CompactOrderInfo>
                </S.CompactOrderCard>
              ))}
            </S.OtherOrdersList>
          </S.OtherOrdersSection>
        ) : null}
      </S.OrderSection>
    )
  }

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <ArrowLeftIcon size={20} />
        Voltar ao menu
      </BackButton>
      {latestOrder ? renderLatestOrder() : null}
      <S.CartContainer>
        <S.CartTitle>
          <ShoppingCartIcon size={24} />
          Carrinho de Compras
        </S.CartTitle>
        {renderCartContent()}
      </S.CartContainer>
      <CheckoutSlideView
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
      {editingItem ? (
        <EditCartItemDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            setEditingItem(null)
          }}
          onSave={handleSaveEditedItems}
          item={editingItem}
          restaurantId={restaurant?.id?.toString() || ''}
        />
      ) : null}
      <ConfirmationDialog
        isOpen={isClearCartDialogOpen}
        onClose={() => setIsClearCartDialogOpen(false)}
        onConfirm={confirmClearCart}
        title="Limpar Carrinho"
        description="Tem certeza que deseja remover todos os itens do carrinho? Esta ação não pode ser desfeita."
        confirmText="Limpar Carrinho"
        cancelText="Cancelar"
        variant="danger"
      />
    </Container>
  )
}
