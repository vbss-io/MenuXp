import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { RestaurantContext } from '@/hooks/contexts/restaurant-context'
import { storageUtils } from '@/lib/local-storage'
import { MENU_XP_DEFAULTS } from '@/lib/utils/restaurant-theme-defaults.const'
import { validateRestaurantConfig } from '@/lib/utils/restaurant-validation'
import { getRestaurantInfo } from '@/services/restaurant/get-restaurant-info'
import type { Restaurant, RestaurantConfigValidation, RestaurantTheme } from '@/types/restaurant'

interface RestaurantProviderProps {
  children: ReactNode
  slug?: string
}

export const RestaurantProvider = ({ children, slug }: RestaurantProviderProps) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [operationId, setOperationId] = useState<string | null>(null)
  const [configValidation, setConfigValidation] = useState<RestaurantConfigValidation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [theme, setThemeState] = useState<RestaurantTheme>(MENU_XP_DEFAULTS)

  const {
    data: restaurantData,
    isLoading: isQueryLoading,
    error: queryError
  } = useQuery({
    queryKey: ['restaurant', slug],
    queryFn: () => getRestaurantInfo({ slug: slug! }),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1
  })

  useEffect(() => {
    const savedRestaurant = storageUtils.restaurant.get() as Restaurant | null
    const savedOperationId = storageUtils.operation.get() as string | null
    const savedConfigValidation = storageUtils.configValidation.get() as RestaurantConfigValidation | null

    if (savedRestaurant) {
      setRestaurant(savedRestaurant)
    }
    if (savedOperationId) {
      setOperationId(savedOperationId)
    }
    if (savedConfigValidation) {
      setConfigValidation(savedConfigValidation)
    }
  }, [])

  const memoizedRestaurantData = useMemo(() => restaurantData, [restaurantData])

  useEffect(() => {
    if (memoizedRestaurantData) {
      const newTheme: RestaurantTheme = {
        logo: memoizedRestaurantData.logo ?? MENU_XP_DEFAULTS.logo,
        primaryColor: memoizedRestaurantData.style.primaryColor ?? MENU_XP_DEFAULTS.primaryColor,
        secondaryColor: memoizedRestaurantData.style.secondaryColor ?? MENU_XP_DEFAULTS.secondaryColor,
        layout: memoizedRestaurantData.menuLayout?.layout ?? MENU_XP_DEFAULTS.layout,
        name: memoizedRestaurantData.name ?? MENU_XP_DEFAULTS.name
      }
      setThemeState(newTheme)
    }
  }, [memoizedRestaurantData])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    root.style.setProperty('--restaurant-primary-color', theme.primaryColor)
    root.style.setProperty('--restaurant-secondary-color', theme.secondaryColor)
    root.style.setProperty('--primary', theme.primaryColor)
    root.style.setProperty('--secondary', theme.secondaryColor)
    body.classList.remove('layout-menuxp', 'layout-default', 'layout-dark', 'layout-clean', 'layout-square')
    if (theme.layout) {
      body.classList.add(`layout-${theme.layout}`)
    }
  }, [theme])

  const setClientRestaurant = useCallback((clientRestaurant: Restaurant) => {
    setRestaurant(clientRestaurant)
    storageUtils.restaurant.set(clientRestaurant)

    const validation = validateRestaurantConfig(clientRestaurant, true)
    setConfigValidation(validation)
    storageUtils.configValidation.set(validation)

    setError(null)
  }, [])

  const handleSetOperationId = useCallback((newOperationId: string) => {
    setOperationId(newOperationId)
    storageUtils.operation.set(newOperationId)
  }, [])

  const updateTheme = useCallback((newTheme: RestaurantTheme) => {
    setThemeState(newTheme)
  }, [])

  const resetTheme = useCallback(() => {
    setThemeState(MENU_XP_DEFAULTS)
  }, [])

  const clearTheme = useCallback(() => {
    setThemeState(MENU_XP_DEFAULTS)
  }, [])

  const hasTheme = useMemo(() => Boolean(theme), [theme])
  const logo = useMemo(() => theme?.logo ?? '', [theme?.logo])
  const name = useMemo(() => theme?.name ?? '', [theme?.name])
  const primaryColor = useMemo(() => theme?.primaryColor ?? '#E53E3E', [theme?.primaryColor])
  const secondaryColor = useMemo(() => theme?.secondaryColor ?? '#F6D55C', [theme?.secondaryColor])
  const layout = useMemo(() => theme?.layout ?? 'menuxp', [theme?.layout])

  const staticValues = useMemo(
    () => ({
      setClientRestaurant,
      setOperationId: handleSetOperationId,
      updateTheme,
      resetTheme,
      clearTheme
    }),
    [setClientRestaurant, handleSetOperationId, updateTheme, resetTheme, clearTheme]
  )

  const dynamicValues = useMemo(
    () => ({
      restaurant: memoizedRestaurantData ?? restaurant,
      configValidation,
      operationId: memoizedRestaurantData?.operationId ?? operationId,
      isLoading: isQueryLoading,
      error: error ?? queryError?.message ?? null,
      theme,
      hasTheme,
      logo,
      name,
      primaryColor,
      secondaryColor,
      layout
    }),
    [
      memoizedRestaurantData,
      restaurant,
      configValidation,
      operationId,
      isQueryLoading,
      error,
      queryError?.message,
      theme,
      hasTheme,
      logo,
      name,
      primaryColor,
      secondaryColor,
      layout
    ]
  )

  const contextValue = useMemo(
    () => ({
      ...staticValues,
      ...dynamicValues
    }),
    [staticValues, dynamicValues]
  )

  return <RestaurantContext.Provider value={contextValue}>{children}</RestaurantContext.Provider>
}
