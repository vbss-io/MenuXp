import type { MenuLayoutStatus } from '@/domain/enums/menu-layouts/menu-layout-status.enum'
import type { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'

export interface MenuSectionConfig {
  // BANNER
  imagePath?: string
  // CAROUSEL
  imagePaths?: string[] // Array de caminhos das imagens (min: 2, max: 5)
  // CATEGORIES
  categoryIds?: string[] | null // null = todas as categorias ativas
  // MENU_ITEMS
  menuItemIds?: string[] | null // null = todos os itens ativos
}

export interface MenuSection {
  id?: string // Gerado pelo backend/MongoDB
  type: MenuSectionType
  config: MenuSectionConfig
}

export interface MenuLayout {
  id: string
  name: string
  description?: string
  restaurantId: string
  status: MenuLayoutStatus
  sections: MenuSection[]
  createdAt: string
  updatedAt: string
}
