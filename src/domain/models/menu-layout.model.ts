import type { MenuLayoutStatus } from '@/domain/enums/menu-layouts/menu-layout-status.enum'
import type { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'

// To-Do: Padronize with backend ?
export interface MenuSectionConfig {
  imagePath?: string
  tag?: string
  title?: string
  subtitle?: string
  imagePaths?: string[]
  categoryIds?: string[] | null
  layout?: string
  menuItemIds?: string[] | null
}

export interface MenuSection {
  id?: string
  type: MenuSectionType
  config: MenuSectionConfig
}

export interface MenuLayout {
  id: string
  name: string
  description?: string
  restaurantId: string
  status: MenuLayoutStatus
  layout: string
  sections: MenuSection[]
  createdAt: string
  updatedAt: string
}
