import { useState, useEffect } from 'react'
import { GetCartUsecase } from '@/application/cart/get-cart.usecase'
import { AddItemToCartUsecase } from '@/application/cart/add-item-to-cart.usecase'
import { RemoveItemFromCartUsecase } from '@/application/cart/remove-item-from-cart.usecase'
import { UpdateCartItemQuantityUsecase } from '@/application/cart/update-cart-item-quantity.usecase'
import { ClearCartUsecase } from '@/application/cart/clear-cart.usecase'
import type { Cart, CartItemOptional } from '@/domain/models/cart.model'

interface UseCartOptions {
  clientId: string
  restaurantId: string
  enabled?: boolean
}

interface UseCartReturn {
  cart: Cart | null
  isLoading: boolean
  error: string | null
  addItem: (params: { menuItemId: string; quantity: number; optionals?: CartItemOptional[] }) => Promise<void>
  removeItem: (menuItemId: string, optionals?: CartItemOptional[]) => Promise<void>
  updateQuantity: (menuItemId: string, quantity: number, optionals?: CartItemOptional[]) => Promise<void>
  clearCart: () => Promise<void>
  refetch: () => Promise<void>
}

export const useCart = ({ clientId, restaurantId, enabled = true }: UseCartOptions): UseCartReturn => {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCart = async () => {
    if (!enabled || !clientId || !restaurantId) {
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const usecase = new GetCartUsecase()
      const result = await usecase.execute({ clientId, restaurantId })
      setCart(result)
    } catch (err) {
      console.error('Error fetching cart:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar carrinho')
      setCart(null)
    } finally {
      setIsLoading(false)
    }
  }

  const addItem = async (params: { menuItemId: string; quantity: number; optionals?: CartItemOptional[] }) => {
    if (!clientId || !restaurantId) return

    try {
      const usecase = new AddItemToCartUsecase()
      await usecase.execute({
        clientId,
        restaurantId,
        menuItemId: params.menuItemId,
        quantity: params.quantity,
        type: 'menu-item',
        optionals: params.optionals
      })
      await fetchCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar item ao carrinho')
      throw err
    }
  }

  const removeItem = async (menuItemId: string, optionals?: CartItemOptional[]) => {
    if (!clientId || !restaurantId) return

    try {
      const usecase = new RemoveItemFromCartUsecase()
      await usecase.execute({
        clientId,
        restaurantId,
        menuItemId,
        optionals
      })
      await fetchCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao remover item do carrinho')
      throw err
    }
  }

  const updateQuantity = async (menuItemId: string, quantity: number, optionals?: CartItemOptional[]) => {
    if (!clientId || !restaurantId) return

    try {
      const usecase = new UpdateCartItemQuantityUsecase()
      await usecase.execute({
        clientId,
        restaurantId,
        menuItemId,
        quantity,
        optionals
      })
      await fetchCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar quantidade')
      throw err
    }
  }

  const clearCart = async () => {
    if (!clientId || !restaurantId) return
    try {
      const usecase = new ClearCartUsecase()
      await usecase.execute({
        clientId,
        restaurantId
      })
      setCart(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao limpar carrinho')
      throw err
    }
  }

  useEffect(() => {
    fetchCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, restaurantId, enabled])

  return {
    cart,
    isLoading,
    error,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refetch: fetchCart
  }
}
