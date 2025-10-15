import { createContext } from 'react'

interface SidebarContextData {
  isOpen: boolean
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextData>({} as SidebarContextData)
