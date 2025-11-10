export const notificationBellLayoutGlobalStyles = `
  .notification-bell.layout-default .bell-button {
    border-radius: 50% !important;
    background: transparent !important;

    &:hover {
      background: hsl(0, 0%, 95%) !important;
    }
  }

  .notification-bell.layout-default .bell-button svg {
    color: hsl(0, 0%, 20%) !important;
  }

  .notification-bell.layout-default .notification-badge {
    background: var(--restaurant-primary-color) !important;
    border-radius: 9px !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .notification-bell.layout-default .notification-header {
    border-bottom: 1px solid hsl(0, 0%, 90%) !important;
  }

  .notification-bell.layout-default .notification-title {
    color: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-default .mark-all-button {
    color: var(--restaurant-primary-color) !important;
    border-radius: 4px !important;

    &:hover {
      background: hsl(0, 0%, 95%) !important;
    }
  }

  .notification-bell.layout-default .notification-item {
    border-radius: 8px !important;
    border: 1px solid hsl(0, 0%, 85%) !important;

    &:hover {
      background: hsl(0, 0%, 96%) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    }
  }

  .notification-bell.layout-default .notification-item.unread {
    background: hsl(0, 0%, 98%) !important;
    border-color: hsl(0, 0%, 80%) !important;
  }

  .notification-bell.layout-default .notification-icon-container {
    border-radius: 50% !important;
  }

  .notification-bell.layout-default .unread-indicator {
    background: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-default .loading-spinner svg {
    color: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-default .empty-state svg {
    color: hsl(0, 0%, 80%) !important;
  }

  .notification-bell.layout-dark .bell-button {
    border-radius: 50% !important;
    background: transparent !important;

    &:hover {
      background: hsl(0, 0%, 20%) !important;
    }
  }

  .notification-bell.layout-dark .bell-button svg {
    color: hsl(0, 0%, 90%) !important;
  }

  .notification-bell.layout-dark .notification-badge {
    background: var(--restaurant-primary-color) !important;
    border-radius: 9px !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .notification-bell.layout-dark .notification-header {
    border-bottom: 1px solid hsl(0, 0%, 25%) !important;
  }

  .notification-bell.layout-dark .notification-title {
    color: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-dark .mark-all-button {
    color: var(--restaurant-primary-color) !important;
    border-radius: 4px !important;

    &:hover {
      background: hsl(0, 0%, 25%) !important;
    }
  }

  .notification-bell.layout-dark .notification-item {
    background: hsl(0, 0%, 15%) !important;
    border-radius: 8px !important;
    border: 1px solid hsl(0, 0%, 25%) !important;

    &:hover {
      background: hsl(0, 0%, 20%) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
    }
  }

  .notification-bell.layout-dark .notification-item.unread {
    background: hsl(0, 0%, 18%) !important;
    border-color: hsl(0, 0%, 30%) !important;
  }

  .notification-bell.layout-dark .notification-icon-container {
    border-radius: 50% !important;
  }

  .notification-bell.layout-dark .notification-item .notification-title-text {
    color: hsl(0, 0%, 95%) !important;
  }

  .notification-bell.layout-dark .notification-item .notification-message-text {
    color: hsl(0, 0%, 70%) !important;
  }

  .notification-bell.layout-dark .notification-item .notification-time-text {
    color: hsl(0, 0%, 60%) !important;
  }

  .notification-bell.layout-dark .unread-indicator {
    background: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-dark .loading-spinner svg {
    color: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-dark .empty-state svg {
    color: hsl(0, 0%, 40%) !important;
  }

  .notification-bell.layout-dark .empty-state p {
    color: hsl(0, 0%, 60%) !important;
  }

  .notification-bell.layout-clean .bell-button {
    border-radius: 50% !important;
    background: transparent !important;

    &:hover {
      background: hsl(0, 0%, 96%) !important;
    }
  }

  .notification-bell.layout-clean .bell-button svg {
    color: hsl(0, 0%, 30%) !important;
  }

  .notification-bell.layout-clean .notification-badge {
    background: var(--restaurant-primary-color) !important;
    border-radius: 9px !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .notification-bell.layout-clean .notification-header {
    border-bottom: 1px solid hsl(0, 0%, 92%) !important;
  }

  .notification-bell.layout-clean .notification-title {
    color: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-clean .mark-all-button {
    color: var(--restaurant-primary-color) !important;
    border-radius: 4px !important;

    &:hover {
      background: hsl(0, 0%, 96%) !important;
    }
  }

  .notification-bell.layout-clean .notification-item {
    border-radius: 6px !important;
    border: 1px solid hsl(0, 0%, 88%) !important;

    &:hover {
      background: hsl(0, 0%, 98%) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
    }
  }

  .notification-bell.layout-clean .notification-item.unread {
    background: hsl(210, 50%, 98%) !important;
    border-color: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-clean .notification-icon-container {
    border-radius: 50% !important;
  }

  .notification-bell.layout-clean .unread-indicator {
    background: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-clean .loading-spinner svg {
    color: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-clean .empty-state svg {
    color: hsl(0, 0%, 85%) !important;
  }

  .notification-bell.layout-square .bell-button {
    border-radius: 0 !important;
    background: transparent !important;

    &:hover {
      background: hsl(0, 0%, 95%) !important;
    }
  }

  .notification-bell.layout-square .bell-button svg {
    color: hsl(0, 0%, 20%) !important;
  }

  .notification-bell.layout-square .notification-badge {
    background: var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
    color: hsl(0, 0%, 100%) !important;
  }

  .notification-bell.layout-square .notification-header {
    border-bottom: 2px solid hsl(0, 0%, 0%) !important;
  }

  .notification-bell.layout-square .notification-title {
    color: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-square .mark-all-button {
    color: var(--restaurant-primary-color) !important;
    border-radius: 0 !important;

    &:hover {
      background: hsl(0, 0%, 95%) !important;
    }
  }

  .notification-bell.layout-square .notification-item {
    border-radius: 0 !important;
    border: 2px solid hsl(0, 0%, 0%) !important;

    &:hover {
      background: hsl(0, 0%, 96%) !important;
      transform: translateY(-2px) !important;
      box-shadow: 4px 4px 0 hsl(0, 0%, 0%) !important;
    }
  }

  .notification-bell.layout-square .notification-item.unread {
    background: hsl(0, 0%, 98%) !important;
    border-color: hsl(0, 0%, 0%) !important;
  }

  .notification-bell.layout-square .notification-icon-container {
    border-radius: 0 !important;
  }

  .notification-bell.layout-square .unread-indicator {
    background: var(--restaurant-primary-color) !important;
    border-radius: 0 !important;
  }

  .notification-bell.layout-square .loading-spinner svg {
    color: var(--restaurant-primary-color) !important;
  }

  .notification-bell.layout-square .empty-state svg {
    color: hsl(0, 0%, 80%) !important;
  }
`
