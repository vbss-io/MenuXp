import { menuItemCardLayoutGlobalStyles } from '@/components/menu-item/menu-item-card/layout.styles'
import { bannerSectionLayoutGlobalStyles } from '@/components/menu-layout-sections/banner-section/layout.styles'
import { carouselSectionLayoutGlobalStyles } from '@/components/menu-layout-sections/carousel-section/layout.styles'
import { categoriesSectionLayoutGlobalStyles } from '@/components/menu-layout-sections/categories-section/layout.styles'
import { combosSectionLayoutGlobalStyles } from '@/components/menu-layout-sections/combos-section/layout.styles'
import { menuItemsSectionLayoutGlobalStyles } from '@/components/menu-layout-sections/menu-items-section/layout.styles'
import { restaurantClientWarningBannerLayoutGlobalStyles } from '@/components/restaurant/restaurant-client-warning-banner/layout.styles'
import { restaurantHeaderLayoutGlobalStyles } from '@/components/restaurant/restaurant-header/layout.styles'
import { restaurantOperationWarningBannerLayoutGlobalStyles } from '@/components/restaurant/restaurant-operation-warning-banner/layout.styles'
import { accordionLayoutGlobalStyles } from '@/components/ui/accordion/layout.styles'
import { buttonLayoutGlobalStyles } from '@/components/ui/button/layout.styles'
import { chipLayoutGlobalStyles } from '@/components/ui/chip/layout.styles'
import { dialogLayoutGlobalStyles } from '@/components/ui/dialog/layout.styles'
import { comboboxLayoutGlobalStyles } from '@/components/ui/forms/combobox/layout.styles'
import { formCheckboxLayoutGlobalStyles } from '@/components/ui/forms/form-checkbox/layout.styles'
import { formInputLayoutGlobalStyles } from '@/components/ui/forms/form-input/layout.styles'
import { formTextareaLayoutGlobalStyles } from '@/components/ui/forms/form-textarea/layout.styles'
import { languageSelectorLayoutGlobalStyles } from '@/components/ui/language-selector/layout.styles'
import { loadingLayoutGlobalStyles } from '@/components/ui/loading/layout.styles'
import { menuNavbarLayoutGlobalStyles } from '@/components/ui/menu-navbar/layout.styles'
import { popoverLayoutGlobalStyles } from '@/components/ui/popover/layout.styles'
import { sliderLayoutGlobalStyles } from '@/components/ui/slider/layout.styles'
import { tooltipLayoutGlobalStyles } from '@/components/ui/tooltip/layout.styles'

export type LayoutType = 'menuxp' | 'default' | 'dark' | 'clean' | 'square'

export const layoutStyles = `
  ${buttonLayoutGlobalStyles}
  ${accordionLayoutGlobalStyles}
  ${chipLayoutGlobalStyles}
  ${dialogLayoutGlobalStyles}
  ${comboboxLayoutGlobalStyles}
  ${formCheckboxLayoutGlobalStyles}
  ${formInputLayoutGlobalStyles}
  ${formTextareaLayoutGlobalStyles}
  ${languageSelectorLayoutGlobalStyles}
  ${loadingLayoutGlobalStyles}
  ${menuNavbarLayoutGlobalStyles}
  ${popoverLayoutGlobalStyles}
  ${sliderLayoutGlobalStyles}
  ${tooltipLayoutGlobalStyles}
  ${restaurantHeaderLayoutGlobalStyles}
  ${restaurantClientWarningBannerLayoutGlobalStyles}
  ${restaurantOperationWarningBannerLayoutGlobalStyles}
  ${bannerSectionLayoutGlobalStyles}
  ${carouselSectionLayoutGlobalStyles}
  ${categoriesSectionLayoutGlobalStyles}
  ${combosSectionLayoutGlobalStyles}
  ${menuItemsSectionLayoutGlobalStyles}
  ${menuItemCardLayoutGlobalStyles}

  body.layout-dark {
    background-color: #2a2a2a !important;
    color: #fff;
  }

  body.layout-menuxp,
  body.layout-default,
  body.layout-clean,
  body.layout-square {
    background-color: hsl(0, 0%, 100%) !important;
    color: #000;
  }
`
