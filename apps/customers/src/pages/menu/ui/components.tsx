import { useRestaurant } from '@/hooks/use-restaurant'
import React, { useState } from 'react'

import { ClientFormShowcase } from '@/pages/menu/ui/components/client/client-form-showcase'
import { ClientNameSlideShowcase } from '@/pages/menu/ui/components/client/client-name-slide-showcase'
import { FormCheckboxShowcase } from '@/pages/menu/ui/components/forms/form-checkbox-showcase'
import { FormInputShowcase } from '@/pages/menu/ui/components/forms/form-input-showcase'
import { FormTextareaShowcase } from '@/pages/menu/ui/components/forms/form-textarea-showcase'
import { BannerSectionShowcase } from '@/pages/menu/ui/components/menu/banner-section-showcase'
import { CarouselSectionShowcase } from '@/pages/menu/ui/components/menu/carousel-section-showcase'
import { CategoriesSectionShowcase } from '@/pages/menu/ui/components/menu/categories-section-showcase'
import { CombosSectionShowcase } from '@/pages/menu/ui/components/menu/combos-section-showcase'
import { MenuItemCardShowcase } from '@/pages/menu/ui/components/menu/menu-item-card-showcase'
import { MenuItemDialogShowcase } from '@/pages/menu/ui/components/menu/menu-item-dialog-showcase'
import { MenuItemOptionalsShowcase } from '@/pages/menu/ui/components/menu/menu-item-optionals-showcase'
import { MenuItemsSectionShowcase } from '@/pages/menu/ui/components/menu/menu-items-section-showcase'
import { RestaurantClientWarningBannerShowcase } from '@/pages/menu/ui/components/restaurant/restaurant-client-warning-banner-showcase'
import { RestaurantOperationWarningBannerShowcase } from '@/pages/menu/ui/components/restaurant/restaurant-operation-warning-banner-showcase'
import { AccordionShowcase } from '@/pages/menu/ui/components/ui/accordion-showcase'
import { ButtonShowcase } from '@/pages/menu/ui/components/ui/button-showcase'
import { ChipShowcase } from '@/pages/menu/ui/components/ui/chip-showcase'
import { ComboboxShowcase } from '@/pages/menu/ui/components/ui/combobox-showcase'
import { ConfirmationDialogShowcase } from '@/pages/menu/ui/components/ui/confirmation-dialog-showcase'
import { DialogShowcase } from '@/pages/menu/ui/components/ui/dialog-showcase'
import { LanguageSelectorShowcase } from '@/pages/menu/ui/components/ui/language-selector-showcase'
import { LoadingShowcase } from '@/pages/menu/ui/components/ui/loading-showcase'
import { PopoverShowcase } from '@/pages/menu/ui/components/ui/popover-showcase'
import { SliderShowcase } from '@/pages/menu/ui/components/ui/slider-showcase'
import { TooltipShowcase } from '@/pages/menu/ui/components/ui/tooltip-showcase'
import type { LayoutType } from '@/styles/layout'

import * as S from './components.styles'

type ComponentType =
  | 'accordion'
  | 'banner-section'
  | 'button'
  | 'carousel-section'
  | 'categories-section'
  | 'chip'
  | 'client-form'
  | 'client-name-slide'
  | 'combobox'
  | 'combos-section'
  | 'confirmation-dialog'
  | 'dialog'
  | 'form-checkbox'
  | 'form-input'
  | 'form-textarea'
  | 'language-selector'
  | 'loading'
  | 'menu-item-card'
  | 'menu-item-dialog'
  | 'menu-item-optionals'
  | 'menu-items-section'
  | 'popover'
  | 'restaurant-client-warning-banner'
  | 'restaurant-operation-warning-banner'
  | 'slider'
  | 'tooltip'

interface ComponentOption {
  value: ComponentType
  label: string
  component: React.ComponentType
}

const UIDebugPage: React.FC = () => {
  const { layout, updateTheme, theme } = useRestaurant({ autoUpdateTheme: false })
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('button')

  const handleLayoutChange = (newLayout: LayoutType) => {
    if (theme) {
      updateTheme({
        ...theme,
        layout: newLayout
      })
    }
  }

  const layouts: LayoutType[] = ['menuxp', 'default', 'dark', 'clean', 'square']

  const components: ComponentOption[] = [
    { value: 'accordion', label: 'Accordion', component: AccordionShowcase },
    { value: 'banner-section', label: 'Banner Section', component: BannerSectionShowcase },
    { value: 'button', label: 'Button', component: ButtonShowcase },
    { value: 'carousel-section', label: 'Carousel Section', component: CarouselSectionShowcase },
    { value: 'categories-section', label: 'Categories Section', component: CategoriesSectionShowcase },
    { value: 'chip', label: 'Chip', component: ChipShowcase },
    { value: 'client-form', label: 'Client Form (Login/Register)', component: ClientFormShowcase },
    { value: 'client-name-slide', label: 'Client Name Slide', component: ClientNameSlideShowcase },
    { value: 'combobox', label: 'Combobox', component: ComboboxShowcase },
    { value: 'combos-section', label: 'Combos Section', component: CombosSectionShowcase },
    { value: 'confirmation-dialog', label: 'Confirmation Dialog', component: ConfirmationDialogShowcase },
    { value: 'dialog', label: 'Dialog', component: DialogShowcase },
    { value: 'form-checkbox', label: 'Form Checkbox', component: FormCheckboxShowcase },
    { value: 'form-input', label: 'Form Input', component: FormInputShowcase },
    { value: 'form-textarea', label: 'Form Textarea', component: FormTextareaShowcase },
    { value: 'language-selector', label: 'Language Selector', component: LanguageSelectorShowcase },
    { value: 'loading', label: 'Loading', component: LoadingShowcase },
    { value: 'menu-item-card', label: 'Menu Item Card', component: MenuItemCardShowcase },
    { value: 'menu-item-dialog', label: 'Menu Item Dialog', component: MenuItemDialogShowcase },
    { value: 'menu-item-optionals', label: 'Menu Item Optionals', component: MenuItemOptionalsShowcase },
    { value: 'menu-items-section', label: 'Menu Items Section', component: MenuItemsSectionShowcase },
    { value: 'popover', label: 'Popover', component: PopoverShowcase },
    {
      value: 'restaurant-client-warning-banner',
      label: 'Restaurant Client Warning Banner',
      component: RestaurantClientWarningBannerShowcase
    },
    {
      value: 'restaurant-operation-warning-banner',
      label: 'Restaurant Operation Warning Banner',
      component: RestaurantOperationWarningBannerShowcase
    },
    { value: 'slider', label: 'Slider', component: SliderShowcase },
    { value: 'tooltip', label: 'Tooltip', component: TooltipShowcase }
  ]

  const SelectedComponentShowcase = components.find((c) => c.value === selectedComponent)?.component ?? ButtonShowcase

  return (
    <S.Container>
      <S.ControlsBar>
        <S.LayoutSelector>
          {layouts.map((layoutOption) => (
            <S.LayoutButton
              key={layoutOption}
              $active={layout === layoutOption}
              onClick={() => handleLayoutChange(layoutOption)}
            >
              {layoutOption}
            </S.LayoutButton>
          ))}
        </S.LayoutSelector>
        <S.ComponentSelector>
          <S.Select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value as ComponentType)}>
            {components.map((component) => (
              <option key={component.value} value={component.value}>
                {component.label}
              </option>
            ))}
          </S.Select>
        </S.ComponentSelector>
      </S.ControlsBar>
      <S.ContentContainer>
        <SelectedComponentShowcase />
      </S.ContentContainer>
    </S.Container>
  )
}

export default UIDebugPage
