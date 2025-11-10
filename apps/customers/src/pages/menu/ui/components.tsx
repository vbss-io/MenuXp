import { useRestaurant } from '@/hooks/use-restaurant'
import React, { useState } from 'react'

import { EditCartItemDialogShowcase } from '@/pages/menu/ui/components/cart/edit-cart-item-dialog-showcase'
import { ClientAddressFormShowcase } from '@/pages/menu/ui/components/client/client-address-form-showcase'
import { ClientAddressSlideShowcase } from '@/pages/menu/ui/components/client/client-address-slide-showcase'
import { ClientFormShowcase } from '@/pages/menu/ui/components/client/client-form-showcase'
import { ClientLoginFormShowcase } from '@/pages/menu/ui/components/client/client-login-form-showcase'
import { ClientNameSlideShowcase } from '@/pages/menu/ui/components/client/client-name-slide-showcase'
import { ClientProfileShowcase } from '@/pages/menu/ui/components/client/client-profile-showcase'
import { ClientRegisterFormShowcase } from '@/pages/menu/ui/components/client/client-register-form-showcase'
import { ComboDialogShowcase } from '@/pages/menu/ui/components/combo/combo-dialog-showcase'
import { ComboItemsListShowcase } from '@/pages/menu/ui/components/combo/combo-items-list-showcase'
import { FormCheckboxShowcase } from '@/pages/menu/ui/components/forms/form-checkbox-showcase'
import { FormInputShowcase } from '@/pages/menu/ui/components/forms/form-input-showcase'
import { FormTextareaShowcase } from '@/pages/menu/ui/components/forms/form-textarea-showcase'
import { BannerSectionShowcase } from '@/pages/menu/ui/components/menu/banner-section-showcase'
import { CarouselSectionShowcase } from '@/pages/menu/ui/components/menu/carousel-section-showcase'
import { CategoriesSectionShowcase } from '@/pages/menu/ui/components/menu/categories-section-showcase'
import { ComboCardShowcase } from '@/pages/menu/ui/components/menu/combo-card-showcase'
import { CombosSectionShowcase } from '@/pages/menu/ui/components/menu/combos-section-showcase'
import { MenuItemCardShowcase } from '@/pages/menu/ui/components/menu/menu-item-card-showcase'
import { MenuItemDialogShowcase } from '@/pages/menu/ui/components/menu/menu-item-dialog-showcase'
import { MenuItemOptionalsShowcase } from '@/pages/menu/ui/components/menu/menu-item-optionals-showcase'
import { MenuItemsSectionShowcase } from '@/pages/menu/ui/components/menu/menu-items-section-showcase'
import { NotificationBellShowcase } from '@/pages/menu/ui/components/notification/notification-bell-showcase'
import { AddressStepShowcase } from '@/pages/menu/ui/components/order/address-step-showcase'
import { CheckoutSlideViewShowcase } from '@/pages/menu/ui/components/order/checkout-slide-view-showcase'
import { PaymentStepShowcase } from '@/pages/menu/ui/components/order/payment-step-showcase'
import { ReviewItemsStepShowcase } from '@/pages/menu/ui/components/order/review-items-step-showcase'
import { SummaryStepShowcase } from '@/pages/menu/ui/components/order/summary-step-showcase'
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
import type { LayoutType } from '@menuxp/styles'

import * as S from './components.styles'

type ComponentType =
  | 'accordion'
  | 'order-address-step'
  | 'banner-section'
  | 'button'
  | 'carousel-section'
  | 'categories-section'
  | 'checkout-slide-view'
  | 'chip'
  | 'client-address-form'
  | 'client-address-slide'
  | 'client-form'
  | 'client-login-form'
  | 'client-register-form'
  | 'client-name-slide'
  | 'client-profile'
  | 'combo-card'
  | 'combo-dialog'
  | 'combo-items-list'
  | 'combobox'
  | 'combos-section'
  | 'confirmation-dialog'
  | 'dialog'
  | 'edit-cart-item-dialog'
  | 'form-checkbox'
  | 'form-input'
  | 'form-textarea'
  | 'language-selector'
  | 'loading'
  | 'menu-item-card'
  | 'menu-item-dialog'
  | 'menu-item-optionals'
  | 'menu-items-section'
  | 'notification-bell'
  | 'order-payment-step'
  | 'popover'
  | 'restaurant-client-warning-banner'
  | 'restaurant-operation-warning-banner'
  | 'order-review-items-step'
  | 'slider'
  | 'order-summary-step'
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
    { value: 'checkout-slide-view', label: 'Checkout Slide View', component: CheckoutSlideViewShowcase },
    { value: 'chip', label: 'Chip', component: ChipShowcase },
    { value: 'client-address-form', label: 'Client Address Form', component: ClientAddressFormShowcase },
    { value: 'client-address-slide', label: 'Client Address Slide', component: ClientAddressSlideShowcase },
    { value: 'client-form', label: 'Client Form (Login/Register)', component: ClientFormShowcase },
    { value: 'client-login-form', label: 'Client Login Form', component: ClientLoginFormShowcase },
    { value: 'client-register-form', label: 'Client Register Form', component: ClientRegisterFormShowcase },
    { value: 'client-name-slide', label: 'Client Name Slide', component: ClientNameSlideShowcase },
    { value: 'client-profile', label: 'Client Profile', component: ClientProfileShowcase },
    { value: 'combo-card', label: 'Combo Card', component: ComboCardShowcase },
    { value: 'combo-dialog', label: 'Combo Dialog', component: ComboDialogShowcase },
    { value: 'combo-items-list', label: 'Combo Items List', component: ComboItemsListShowcase },
    { value: 'combobox', label: 'Combobox', component: ComboboxShowcase },
    { value: 'combos-section', label: 'Combos Section', component: CombosSectionShowcase },
    { value: 'confirmation-dialog', label: 'Confirmation Dialog', component: ConfirmationDialogShowcase },
    { value: 'dialog', label: 'Dialog', component: DialogShowcase },
    { value: 'edit-cart-item-dialog', label: 'Edit Cart Item Dialog', component: EditCartItemDialogShowcase },
    { value: 'form-checkbox', label: 'Form Checkbox', component: FormCheckboxShowcase },
    { value: 'form-input', label: 'Form Input', component: FormInputShowcase },
    { value: 'form-textarea', label: 'Form Textarea', component: FormTextareaShowcase },
    { value: 'language-selector', label: 'Language Selector', component: LanguageSelectorShowcase },
    { value: 'loading', label: 'Loading', component: LoadingShowcase },
    { value: 'menu-item-card', label: 'Menu Item Card', component: MenuItemCardShowcase },
    { value: 'menu-item-dialog', label: 'Menu Item Dialog', component: MenuItemDialogShowcase },
    { value: 'menu-item-optionals', label: 'Menu Item Optionals', component: MenuItemOptionalsShowcase },
    { value: 'menu-items-section', label: 'Menu Items Section', component: MenuItemsSectionShowcase },
    { value: 'notification-bell', label: 'Notification Bell', component: NotificationBellShowcase },
    { value: 'order-review-items-step', label: 'Order Review Items Step', component: ReviewItemsStepShowcase },
    { value: 'order-address-step', label: 'Order Address Step', component: AddressStepShowcase },
    { value: 'order-payment-step', label: 'Order Payment Step', component: PaymentStepShowcase },
    { value: 'order-summary-step', label: 'Order Summary Step', component: SummaryStepShowcase },
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
