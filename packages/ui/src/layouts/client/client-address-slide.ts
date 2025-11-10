export const clientAddressSlideLayoutGlobalStyles = `
  .client-address-slide.layout-default .slide-container {
    background: white !important;
    border-left: 1px solid hsl(0, 0%, 90%) !important;
  }

  .client-address-slide.layout-default .slide-header {
    border-bottom: 1px solid hsl(0, 0%, 90%) !important;
    padding-bottom: 16px !important;
  }

  .client-address-slide.layout-default .header-title {
    color: hsl(0, 0%, 12%) !important;
    font-weight: 600 !important;
  }

  .client-address-slide.layout-default .header-title svg {
    color: var(--restaurant-primary-color) !important;
  }

  .client-address-slide.layout-default .close-button {
    border-radius: 6px !important;
    transition: background-color 0.2s ease !important;
  }

  .client-address-slide.layout-default .close-button:hover {
    background: hsl(0, 0%, 96%) !important;
  }

  .client-address-slide.layout-default .submit-button {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
  }

  .client-address-slide.layout-default .submit-button:hover:not(:disabled) {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
  }

  .client-address-slide.layout-dark .slide-container {
    background: hsl(0, 0%, 15%) !important;
    border-left: 2px solid var(--restaurant-primary-color) !important;
  }

  .client-address-slide.layout-dark .slide-header {
    border-bottom: 1px solid hsl(0, 0%, 25%) !important;
    padding-bottom: 16px !important;
    background: hsl(0, 0%, 15%) !important;
  }

  .client-address-slide.layout-dark .header-title {
    color: white !important;
    font-weight: 600 !important;
  }

  .client-address-slide.layout-dark .header-title svg {
    color: var(--restaurant-primary-color) !important;
  }

  .client-address-slide.layout-dark .close-button {
    border-radius: 6px !important;
    color: white !important;
    transition: background-color 0.2s ease !important;
  }

  .client-address-slide.layout-dark .close-button:hover {
    background: hsl(0, 0%, 25%) !important;
  }

  .client-address-slide.layout-dark .submit-button {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
  }

  .client-address-slide.layout-dark .submit-button:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
  }

  .client-address-slide.layout-clean .slide-container {
    background: white !important;
    border-left: 2px solid var(--restaurant-primary-color) !important;
  }

  .client-address-slide.layout-clean .slide-header {
    border-bottom: 2px solid var(--restaurant-primary-color) !important;
    padding-bottom: 20px !important;
  }

  .client-address-slide.layout-clean .header-title {
    color: hsl(0, 0%, 12%) !important;
    font-weight: 600 !important;
    border-bottom: 1px solid var(--restaurant-primary-color) !important;
    padding-bottom: 4px !important;
  }

  .client-address-slide.layout-clean .header-title svg {
    color: var(--restaurant-primary-color) !important;
  }

  .client-address-slide.layout-clean .close-button {
    border-radius: 4px !important;
    transition: background-color 0.2s ease !important;
  }

  .client-address-slide.layout-clean .close-button:hover {
    background: hsl(0, 0%, 96%) !important;
  }

  .client-address-slide.layout-clean .submit-button {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 4px !important;
    font-weight: 500 !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  }

  .client-address-slide.layout-clean .submit-button:hover:not(:disabled) {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }

  .client-address-slide.layout-square .slide-container {
    background: white !important;
    border-left: 3px solid var(--restaurant-primary-color) !important;
  }

  .client-address-slide.layout-square .slide-header {
    border-bottom: 3px solid var(--restaurant-primary-color) !important;
    padding-bottom: 20px !important;
  }

  .client-address-slide.layout-square .header-title {
    color: var(--restaurant-primary-color) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }

  .client-address-slide.layout-square .header-title svg {
    color: var(--restaurant-primary-color) !important;
  }

  .client-address-slide.layout-square .close-button {
    border-radius: 0 !important;
    transition: background-color 0.2s ease !important;
  }

  .client-address-slide.layout-square .close-button:hover {
    background: hsl(0, 0%, 90%) !important;
  }

  .client-address-slide.layout-square .submit-button {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 0 !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2) !important;
  }

  .client-address-slide.layout-square .submit-button:hover:not(:disabled) {
    transform: translate(-2px, -2px) !important;
    box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2) !important;
  }
`
