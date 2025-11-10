export const clientProfileLayoutGlobalStyles = `
  .client-profile.layout-default .client-summary-card {
    background: white !important;
    border-radius: 12px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
  }

  .client-profile.layout-default .client-avatar {
    background: var(--restaurant-primary-color) !important;
    border-radius: 50% !important;
  }

  .client-profile.layout-default .client-name {
    color: hsl(0, 0%, 0%) !important;
    font-weight: 600 !important;
  }

  .client-profile.layout-default .client-phone {
    color: hsl(0, 0%, 50%) !important;
  }

  .client-profile.layout-default .logout-button {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 6px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
  }

  .client-profile.layout-default .logout-button:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
  }

  .client-profile.layout-default .action-card {
    background: white !important;
    border-radius: 12px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
  }

  .client-profile.layout-default .action-card:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
  }

  .client-profile.layout-default .card-icon {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 6px !important;
  }

  .client-profile.layout-default .card-title {
    color: hsl(0, 0%, 0%) !important;
    font-weight: 600 !important;
  }

  .client-profile.layout-default .card-description {
    color: hsl(0, 0%, 50%) !important;
  }

  .client-profile.layout-default .orders-title {
    color: hsl(0, 0%, 0%) !important;
    font-weight: 600 !important;
  }

  .client-profile.layout-default .empty-orders-card {
    background: white !important;
    border-radius: 12px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
  }

  .client-profile.layout-default .empty-orders-text {
    color: hsl(0, 0%, 50%) !important;
  }

  .client-profile.layout-dark .client-summary-card {
    background: hsl(0, 0%, 15%) !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  }

  .client-profile.layout-dark .client-avatar {
    background: var(--restaurant-primary-color) !important;
    border-radius: 50% !important;
  }

  .client-profile.layout-dark .client-name {
    color: white !important;
    font-weight: 600 !important;
  }

  .client-profile.layout-dark .client-phone {
    color: hsl(0, 0%, 70%) !important;
  }

  .client-profile.layout-dark .logout-button {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 6px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
  }

  .client-profile.layout-dark .logout-button:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
  }

  .client-profile.layout-dark .action-card {
    background: hsl(0, 0%, 15%) !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  }

  .client-profile.layout-dark .action-card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4) !important;
  }

  .client-profile.layout-dark .card-icon {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 6px !important;
  }

  .client-profile.layout-dark .card-title {
    color: white !important;
    font-weight: 600 !important;
  }

  .client-profile.layout-dark .card-description {
    color: hsl(0, 0%, 70%) !important;
  }

  .client-profile.layout-dark .orders-title {
    color: white !important;
    font-weight: 600 !important;
  }

  .client-profile.layout-dark .empty-orders-card {
    background: hsl(0, 0%, 15%) !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  }

  .client-profile.layout-dark .empty-orders-text {
    color: hsl(0, 0%, 70%) !important;
  }

  .client-profile.layout-clean .client-summary-card {
    background: white !important;
    border-radius: 8px !important;
    border: 1px solid var(--restaurant-primary-color) !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  }

  .client-profile.layout-clean .client-avatar {
    background: var(--restaurant-primary-color) !important;
    border-radius: 50% !important;
  }

  .client-profile.layout-clean .client-name {
    color: hsl(0, 0%, 0%) !important;
    font-weight: 600 !important;
  }

  .client-profile.layout-clean .client-phone {
    color: hsl(0, 0%, 50%) !important;
  }

  .client-profile.layout-clean .logout-button {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 4px !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  }

  .client-profile.layout-clean .logout-button:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }

  .client-profile.layout-clean .action-card {
    background: white !important;
    border-radius: 8px !important;
    border: 1px solid var(--restaurant-primary-color) !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  }

  .client-profile.layout-clean .action-card:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }

  .client-profile.layout-clean .card-icon {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 4px !important;
  }

  .client-profile.layout-clean .card-title {
    color: hsl(0, 0%, 0%) !important;
    font-weight: 500 !important;
  }

  .client-profile.layout-clean .card-description {
    color: hsl(0, 0%, 50%) !important;
  }

  .client-profile.layout-clean .orders-title {
    color: hsl(0, 0%, 0%) !important;
    font-weight: 600 !important;
    border-bottom: 1px solid var(--restaurant-primary-color) !important;
    padding-bottom: 4px !important;
  }

  .client-profile.layout-clean .empty-orders-card {
    background: white !important;
    border-radius: 8px !important;
    border: 1px solid hsl(0, 0%, 90%) !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  }

  .client-profile.layout-clean .empty-orders-text {
    color: hsl(0, 0%, 50%) !important;
  }

  .client-profile.layout-square .client-summary-card {
    background: white !important;
    border-radius: 0 !important;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2) !important;
    border: 3px solid var(--restaurant-primary-color) !important;
  }

  .client-profile.layout-square .client-avatar {
    background: var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
  }

  .client-profile.layout-square .client-name {
    color: hsl(0, 0%, 0%) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }

  .client-profile.layout-square .client-phone {
    color: hsl(0, 0%, 50%) !important;
  }

  .client-profile.layout-square .logout-button {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 0 !important;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }

  .client-profile.layout-square .logout-button:hover {
    transform: translate(-2px, -2px) !important;
    box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2) !important;
  }

  .client-profile.layout-square .action-card {
    background: white !important;
    border-radius: 0 !important;
    border: 3px solid var(--restaurant-primary-color) !important;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2) !important;
  }

  .client-profile.layout-square .action-card:hover {
    transform: translate(-2px, -2px) !important;
    box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2) !important;
  }

  .client-profile.layout-square .card-icon {
    background: var(--restaurant-primary-color) !important;
    color: white !important;
    border-radius: 0 !important;
  }

  .client-profile.layout-square .card-title {
    color: hsl(0, 0%, 0%) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }

  .client-profile.layout-square .card-description {
    color: hsl(0, 0%, 50%) !important;
  }

  .client-profile.layout-square .orders-title {
    color: hsl(0, 0%, 0%) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    border-bottom: 3px solid var(--restaurant-primary-color) !important;
    padding-bottom: 8px !important;
  }

  .client-profile.layout-square .empty-orders-card {
    background: white !important;
    border-radius: 0 !important;
    border: 3px solid hsl(0, 0%, 80%) !important;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1) !important;
  }

  .client-profile.layout-square .empty-orders-text {
    color: hsl(0, 0%, 50%) !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    font-weight: 600 !important;
  }
`
