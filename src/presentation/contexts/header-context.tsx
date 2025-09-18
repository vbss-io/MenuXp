import React, { createContext, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { PAGES_WITH_HEADER, PAGES_WITHOUT_HEADER } from '@/domain/consts/header-consts'

interface HeaderContextType {
  shouldShowHeader: boolean
  isDashboard: boolean
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

interface HeaderProviderProps {
  children: ReactNode
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const location = useLocation()
  const pathname = location.pathname
  const isDashboard = pathname.includes('/dashboard')
  const shouldShowHeader = PAGES_WITH_HEADER.includes(pathname) && !PAGES_WITHOUT_HEADER.includes(pathname)

  const value = {
    shouldShowHeader,
    isDashboard
  }

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
}

export { HeaderContext }
