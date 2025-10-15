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
