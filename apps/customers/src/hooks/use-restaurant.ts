import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useRef } from 'react'

import { RestaurantContext } from '@/hooks/contexts/restaurant-context'
import { getRestaurantInfo } from '@/services/restaurant/get-restaurant-info'
import type { MenuSection } from '@/types/menu-layout'
import type { Restaurant, RestaurantConfigValidation, RestaurantTheme, RestaurantWithInfo } from '@/types/restaurant'

interface UseRestaurantOptions {
  slug?: string
  enabled?: boolean
  autoUpdateTheme?: boolean
}

export interface UseRestaurantReturn {
  restaurant: RestaurantWithInfo | null
  operationId: string | null
  menuLayout: {
    sections: MenuSection[]
  } | null
  isLoading: boolean
  error: string | null
  theme: RestaurantTheme
  hasTheme: boolean
  configValidation: RestaurantConfigValidation
  setClientRestaurant: (restaurant: Restaurant) => void
  setOperationId: (operationId: string) => void
  updateTheme: (theme: RestaurantTheme) => void
  resetTheme: () => void
  clearTheme: () => void
  logo: string
  name: string
  primaryColor: string
  secondaryColor: string
  layout: string
  refetch: () => Promise<void>
}

export const useRestaurant = ({
  slug,
  enabled = true,
  autoUpdateTheme = true
}: UseRestaurantOptions = {}): UseRestaurantReturn => {
  const context = useContext(RestaurantContext)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['restaurant', slug],
    queryFn: () => getRestaurantInfo({ slug: slug! }),
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1
  })

  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider')
  }

  const hasAutoUpdatedRef = useRef(false)

  useEffect(() => {
    if (slug && data && autoUpdateTheme && !hasAutoUpdatedRef.current) {
      const restaurantTheme: RestaurantTheme = {
        logo: data.logo ?? context.theme.logo,
        primaryColor: data.style?.primaryColor ?? context.theme.primaryColor,
        secondaryColor: data.style?.secondaryColor ?? context.theme.secondaryColor,
        layout: data.menuLayout?.layout ?? context.theme.layout,
        name: data.name ?? context.theme.name
      }
      context.updateTheme(restaurantTheme)
      hasAutoUpdatedRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, data, autoUpdateTheme])

  if (slug) {
    return {
      restaurant: data || null,
      operationId: data?.operationId || null,
      menuLayout: data?.menuLayout || null,
      isLoading,
      error: error?.message || null,
      theme: context.theme,
      hasTheme: context.hasTheme,
      configValidation: context.configValidation as RestaurantConfigValidation,
      setClientRestaurant: context.setClientRestaurant,
      setOperationId: context.setOperationId,
      updateTheme: context.updateTheme,
      resetTheme: context.resetTheme,
      clearTheme: context.clearTheme,
      logo: context.logo,
      name: context.name,
      primaryColor: context.primaryColor,
      secondaryColor: context.secondaryColor,
      layout: context.layout,
      refetch: async () => {
        await refetch()
      }
    }
  }

  return {
    ...context,
    configValidation: context.configValidation as RestaurantConfigValidation,
    menuLayout: (context.restaurant as RestaurantWithInfo)?.menuLayout || null,
    refetch: async () => {
      await refetch()
    }
  }
}
