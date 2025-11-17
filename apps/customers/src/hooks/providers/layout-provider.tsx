import type { LayoutType } from '@menuxp/styles'
import { LayoutContext } from '@menuxp/ui'

import { useRestaurant } from '@/hooks/use-restaurant'

interface LayoutProviderProps {
  children: React.ReactNode
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const { layout } = useRestaurant()

  return <LayoutContext.Provider value={{ layout: layout as LayoutType }}>{children}</LayoutContext.Provider>
}
