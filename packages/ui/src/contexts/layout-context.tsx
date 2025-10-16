import type { LayoutType } from '@menuxp/styles'
import { createContext, useContext } from 'react'

interface LayoutContextValue {
  layout: LayoutType
  setLayout?: (layout: LayoutType) => void
}

export const LayoutContext = createContext<LayoutContextValue>({
  layout: 'menuxp'
})

export const useLayout = () => {
  const context = useContext(LayoutContext)
  return context
}

