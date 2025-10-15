import type { MenuLayoutStatus } from '@/domain/enums/menu-layouts/menu-layout-status.enum'
import type { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'

export interface BannerConfig {
  imagePath?: string
  tag?: string
  title?: string
  subtitle?: string
}

export interface CarouselConfig {
  imagePaths?: string[]
}

export interface CategoriesConfig {
  categoryIds?: string[] | null
}

export interface MenuItemsConfig {
  type?: 'custom' | 'best_sellers' | 'discounts'
  title?: string
  menuItemIds?: string[] | null
}

export interface CombosConfig {
  type?: 'custom' | 'best_sellers' | 'discounts'
  title?: string
  comboIds?: string[] | null
}

export type MenuSectionConfig = BannerConfig | CarouselConfig | CategoriesConfig | MenuItemsConfig | CombosConfig

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
