import type { LayoutType } from '@menuxp/styles'
import { LayoutContext } from '@menuxp/ui'
import { useState } from 'react'

interface LayoutProviderProps {
  children: React.ReactNode
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [layout, setLayout] = useState<LayoutType>('menuxp')

  return <LayoutContext.Provider value={{ layout, setLayout }}>{children}</LayoutContext.Provider>
}
