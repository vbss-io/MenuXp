import { randomUUID } from 'crypto'

import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import { MenuLayoutStatus } from '@restaurants/domain/menu-layouts/enums/menu-layout-status.enum'
import type { MenuLayout } from '@restaurants/domain/menu-layouts/menu-layout.entity'
import type {
  BannerConfig,
  CategoriesConfig,
  CombosConfig,
  MenuItemsConfig
} from '@restaurants/domain/menu-layouts/types/section-configs.type'

export const createMenuLayoutTemplate = (): Partial<MenuLayout> => ({
  name: 'Layout Padrão',
  description: 'Layout básico com banner, categorias e itens do menu',
  status: MenuLayoutStatus.ACTIVE,
  layout: 'default',
  sections: [
    {
      id: randomUUID(),
      type: MenuSectionType.BANNER,
      config: {
        imagePath: '/menu-xp/menuxp/default-banner.jpg',
        tag: 'Destaque',
        title: 'Bem-vindo!'
      } as BannerConfig
    },
    {
      id: randomUUID(),
      type: MenuSectionType.CATEGORIES,
      config: {
        categoryIds: null
      } as CategoriesConfig
    },
    {
      id: randomUUID(),
      type: MenuSectionType.MENU_ITEMS,
      config: {
        type: 'best_sellers',
        menuItemIds: null
      } as MenuItemsConfig
    },
    {
      id: randomUUID(),
      type: MenuSectionType.COMBOS,
      config: {
        type: 'best_sellers',
        comboIds: null
      } as CombosConfig
    }
  ]
})

export const MENU_LAYOUT_TEMPLATE = createMenuLayoutTemplate()
