export const buttonLayoutGlobalStyles = `
  .button.primary {
    background-color: var(--restaurant-secondary-color) !important;
    
    &:hover:not(:disabled) {
      background-color: var(--restaurant-primary-color) !important;
      border-color: var(--restaurant-primary-color) !important;
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
    
    &:hover:not(:disabled) {
      background-color: var(--restaurant-primary-color) !important;
      border-color: var(--restaurant-primary-color) !important;
    }
  }

  .button.ghost {
    color: var(--restaurant-primary-color) !important;
    
    &:hover:not(:disabled) {
      background-color: var(--restaurant-primary-color) !important;
    }
  }

  .button.layout-menuxp {
    border-radius: 16px;
    box-shadow: 4px 6px 0 #000000;
    border-width: 3px;
    font-weight: 700;

    &:hover:not(:disabled) {
      transform: translateY(-2px) translateZ(0);
      box-shadow: 2px 3px 0 #000000;
    }

    &:active:not(:disabled) {
      transform: translateY(0px) translateZ(0);
      box-shadow: 4px 6px 0 #000000;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
    
    &:hover:not(:disabled)::after {
      transform: translateX(0);
    }
  }

  .button.layout-default {
    border-radius: 8px;
    box-shadow: 2px 2px 0 #000000;
    border-width: 2px;
    font-weight: 400;

    &:hover:not(:disabled) {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 4px 4px 0 #000000;
    }

    &:active:not(:disabled) {
      transform: translateY(0px) translateZ(0);
      box-shadow: 2px 2px 0 #000000;
    }
  }

  .button.layout-dark {
    border-radius: 12px;
    box-shadow: 4px 4px 0 #000000;
    border-width: 2px;
    font-weight: 500;

    &:hover:not(:disabled) {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 6px 6px 0 #000000;
    }

    &:active:not(:disabled) {
      transform: translateY(0px) translateZ(0);
      box-shadow: 4px 4px 0 #000000;
    }
  }

  .button.layout-clean {
    border-radius: 4px;
    box-shadow: none;
    border-width: 1px;
    font-weight: 300;

    &:hover:not(:disabled) {
      filter: brightness(1.1);
      box-shadow: 2px 2px 0 #000000;
    }

    &:active:not(:disabled) {
      filter: brightness(0.95);
    }
  }

  .button.layout-square {
    border-radius: 0;
    box-shadow: none;
    border-width: 2px;
    font-weight: 700;

    &:hover:not(:disabled) {
      box-shadow: inset 0 0 0 2px currentColor;
      filter: brightness(1.05);
    }

    &:active:not(:disabled) {
      box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
      filter: brightness(0.95);
    }
  }
`

