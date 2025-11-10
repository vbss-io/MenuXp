import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslator } from 'vbss-translator'

import { addItemToCart } from '@/services/cart/add-cart-item'
import { clearCart as clearCartService } from '@/services/cart/clear-cart'
import { getCart } from '@/services/cart/get-cart'
import { removeItemFromCart } from '@/services/cart/remove-cart-item'
import { updateCartItemQuantity } from '@/services/cart/update-cart-quantity'
import type { Cart, CartItemOptional } from '@/types/cart'

type CartCache = Cart | undefined

const isSameCartItem = (
  item1: { itemId: string; optionals?: CartItemOptional[]; note?: string },
  item2: { itemId: string; optionals?: CartItemOptional[]; note?: string }
): boolean => {
  return (
    item1.itemId === item2.itemId &&
    JSON.stringify(item1.optionals || []) === JSON.stringify(item2.optionals || []) &&
    (item1.note || '') === (item2.note || '')
  )
}

interface UseCartOptions {
  clientId?: string
  restaurantId: string
  enabled?: boolean
}

interface UseCartReturn {
  cart: Cart | null
  isLoading: boolean
  error: string | null
  isAddingItem: boolean
  isRemovingItem: boolean
  isUpdatingQuantity: boolean
  isClearingCart: boolean
  addItem: (params: {
    itemId: string
    itemType: 'menu-item' | 'combo'
    quantity: number
    optionals?: CartItemOptional[]
    note: string
  }) => Promise<void>
  removeItem: (itemId: string, optionals?: CartItemOptional[], note?: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number, optionals?: CartItemOptional[], note?: string) => Promise<void>
  clearCart: () => Promise<void>
  refetch: () => Promise<void>
}

export const useCart = ({ clientId, restaurantId, enabled = true }: UseCartOptions): UseCartReturn => {
  const { t } = useTranslator()
  const queryClient = useQueryClient()

  const {
    data: cart,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['cart', clientId, restaurantId],
    queryFn: () => getCart({ clientId, restaurantId }),
    enabled: enabled && !!restaurantId,
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })

  const addItemMutation = useMutation({
    mutationFn: (params: {
      itemId: string
      itemType: 'menu-item' | 'combo'
      quantity: number
      optionals?: CartItemOptional[]
      note: string
    }) =>
      addItemToCart({
        clientId: clientId || undefined,
        restaurantId,
        itemId: params.itemId,
        quantity: params.quantity,
        itemType: params.itemType,
        optionals: params.optionals,
        note: params.note || ''
      }),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart', clientId, restaurantId] })
      const previousCart = queryClient.getQueryData(['cart', clientId, restaurantId])
      queryClient.setQueryData(['cart', clientId, restaurantId], (old: CartCache) => {
        if (!old) return old
        const existingItemIndex = old.items?.findIndex((item) => isSameCartItem(item, newItem))
        if (existingItemIndex >= 0) {
          const updatedItems = [...old.items]
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
          }
          return { ...old, items: updatedItems }
        } else {
          const newCartItem = {
            itemId: newItem.itemId,
            itemType: newItem.itemType,
            quantity: newItem.quantity,
            optionals: newItem.optionals || [],
            note: newItem.note || '',
            name: t('Carregando...'),
            price: 0
          }
          return { ...old, items: [...(old.items || []), newCartItem] }
        }
      })

      return { previousCart }
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['cart', clientId, restaurantId] })
      toast.success(t('Item adicionado ao carrinho!'))
    },
    onError: (_, __, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart', clientId, restaurantId], context.previousCart)
      }
      toast.error(t('Erro ao adicionar item ao carrinho'))
    }
  })

  const removeItemMutation = useMutation({
    mutationFn: ({ itemId, optionals, note }: { itemId: string; optionals?: CartItemOptional[]; note?: string }) =>
      removeItemFromCart({
        clientId: clientId || undefined,
        restaurantId,
        itemId,
        optionals,
        note: note || ''
      }),
    onMutate: async ({ itemId, optionals, note }) => {
      await queryClient.cancelQueries({ queryKey: ['cart', clientId, restaurantId] })
      const previousCart = queryClient.getQueryData(['cart', clientId, restaurantId])
      queryClient.setQueryData(['cart', clientId, restaurantId], (old: CartCache) => {
        if (!old) return old
        const updatedItems =
          old.items?.filter((item) => {
            return !isSameCartItem(item, { itemId, optionals, note: note || '' })
          }) || []
        return { ...old, items: updatedItems }
      })
      return { previousCart }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', clientId, restaurantId] })
      toast.success(t('Item removido do carrinho!'))
    },
    onError: (_, __, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart', clientId, restaurantId], context.previousCart)
      }
      toast.error(t('Erro ao remover item do carrinho'))
    }
  })

  const updateQuantityMutation = useMutation({
    mutationFn: ({
      itemId,
      quantity,
      optionals,
      note
    }: {
      itemId: string
      quantity: number
      optionals?: CartItemOptional[]
      note?: string
    }) =>
      updateCartItemQuantity({
        clientId: clientId || undefined,
        restaurantId,
        itemId,
        quantity,
        optionals,
        note: note || ''
      }),
    onMutate: async ({ itemId, quantity, optionals, note }) => {
      await queryClient.cancelQueries({ queryKey: ['cart', clientId, restaurantId] })
      const previousCart = queryClient.getQueryData(['cart', clientId, restaurantId])
      queryClient.setQueryData(['cart', clientId, restaurantId], (old: CartCache) => {
        if (!old) return old
        const updatedItems =
          old.items?.map((item) => {
            if (isSameCartItem(item, { itemId, optionals, note: note || '' })) {
              return { ...item, quantity }
            }
            return item
          }) || []
        return { ...old, items: updatedItems }
      })

      return { previousCart }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', clientId, restaurantId] })
      toast.success(t('Quantidade atualizada!'))
    },
    onError: (_, __, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart', clientId, restaurantId], context.previousCart)
      }
      toast.error(t('Erro ao atualizar quantidade'))
    }
  })

  const clearCartMutation = useMutation({
    mutationFn: () => clearCartService({ clientId: clientId || undefined, restaurantId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['cart', clientId, restaurantId] })
      const previousCart = queryClient.getQueryData(['cart', clientId, restaurantId])
      queryClient.setQueryData(['cart', clientId, restaurantId], (old: CartCache) => {
        if (!old) return old
        return { ...old, items: [] }
      })

      return { previousCart }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', clientId, restaurantId] })
      toast.success(t('Carrinho limpo!'))
    },
    onError: (_, __, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart', clientId, restaurantId], context.previousCart)
      }
      toast.error(t('Erro ao limpar carrinho'))
    }
  })

  const addItem = async (params: {
    itemId: string
    itemType: 'menu-item' | 'combo'
    quantity: number
    optionals?: CartItemOptional[]
    note: string
  }) => {
    await addItemMutation.mutateAsync({
      ...params,
      note: params.note || ''
    })
  }

  const removeItem = async (itemId: string, optionals?: CartItemOptional[], note?: string) => {
    await removeItemMutation.mutateAsync({ itemId, optionals, note })
  }

  const updateQuantity = async (itemId: string, quantity: number, optionals?: CartItemOptional[], note?: string) => {
    await updateQuantityMutation.mutateAsync({ itemId, quantity, optionals, note })
  }

  const clearCart = async () => {
    await clearCartMutation.mutateAsync()
  }

  return {
    cart: cart || null,
    isLoading: isLoading,
    error: error?.message || null,
    isAddingItem: addItemMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refetch: async () => {
      await refetch()
    }
  }
}
