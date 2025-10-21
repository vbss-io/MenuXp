export const buttonLayoutGlobalStyles = `
  .button.primary {
    background-color: var(--restaurant-primary-color) !important;
    
    &:hover:not(:disabled) {
      background-color: var(--restaurant-secondary-color) !important;
    }

    &::before {
      background: linear-gradient(
        135deg,
        var(--restaurant-primary-color)00,
        var(--restaurant-primary-color)40
      ) !important;
    }
  }

  .button.secondary {
    background-color: var(--restaurant-primary-color) !important;
    
    &:hover:not(:disabled) {
      background-color: var(--restaurant-secondary-color) !important;
    }

    &::before {
      background: var(--restaurant-secondary-color) !important;
    }
  }

  .button.outline {
    color: var(--restaurant-primary-color) !important;
    border-color: var(--restaurant-primary-color) !important;
    box-shadow: 3px 3px 0px var(--restaurant-primary-color) !important;
   
    &:hover:not(:disabled) {
      background-color: var(--restaurant-primary-color) !important;
      color: white !important;
      }
  }

  .button.ghost {
    color: var(--restaurant-primary-color) !important;
    
    &:hover:not(:disabled) {
      background-color: transparent !important;
      border: 1px solid var(--restaurant-primary-color) !important;
      box-shadow: 3px 3px 0px var(--restaurant-primary-color) !important;
      }
  }

  .button.layout-default {
    border-radius: 8px !important;
    box-shadow: 2px 2px 0 #000000 !important;
    border-width: 2px !important;
    font-weight: 400 !important;

    &:hover:not(:disabled) {
      transform: translateY(-1px) translateZ(0) !important;
      box-shadow: 4px 4px 0 #000000 !important;
    }

    &:active:not(:disabled) {
      transform: translateY(0px) translateZ(0) !important;
      box-shadow: 2px 2px 0 #000000 !important;
    }
  }

  .button.layout-dark {
    border-radius: 12px !important;
    box-shadow: 4px 4px 0 #000000 !important;
    border-width: 2px !important;
    font-weight: 500 !important;

    &:hover:not(:disabled) {
      transform: translateY(-1px) translateZ(0) !important;
      box-shadow: 6px 6px 0 #000000 !important;
    }

    &:active:not(:disabled) {
      transform: translateY(0px) translateZ(0) !important;
      box-shadow: 4px 4px 0 #000000 !important;
    }
  }

  .button.layout-clean {
    border-radius: 4px !important;
    box-shadow: none !important;
    border-width: 1px !important;
    font-weight: 300 !important;

    &:hover:not(:disabled) {
      filter: brightness(1.1) !important;
      box-shadow: 2px 2px 0 #000000 !important;
    }

    &:active:not(:disabled) {
      filter: brightness(0.95) !important;
    }
  }

  .button.layout-square {
    border-radius: 0 !important;
    box-shadow: none !important;
    border-width: 2px !important;
    font-weight: 700 !important;

    &:hover:not(:disabled) {
      box-shadow: inset 0 0 0 2px currentColor !important;
      filter: brightness(1.05) !important;
    }

    &:active:not(:disabled) {
      box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2) !important;
      filter: brightness(0.95) !important;
    }
  }
`

