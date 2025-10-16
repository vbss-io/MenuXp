export const chipLayoutGlobalStyles = `
  .chip.primary {
    background-color: var(--restaurant-primary-color) !important;
  }

  .chip.secondary {
    background-color: var(--restaurant-secondary-color) !important;
  }

  .chip.outline {
    color: var(--restaurant-primary-color) !important;
    border-color: var(--restaurant-primary-color) !important;
  }

  .chip.ghost {
    color: var(--restaurant-primary-color) !important;
  }

  .chip.layout-menuxp {
    border-radius: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;

    &:not(.ghost):not(.outline) {
      border: none !important;
    }

    &:hover:not(.ghost):not(.outline) {
      transform: translateY(-2px) translateZ(0);
      box-shadow: 2px 3px 0 #000000;
    }

    &.outline {
      outline: none !important;
    }

    &.outline:hover {
      transform: none;
      box-shadow: none !important;
      outline: none !important;
    }
  }

  .chip.layout-default {
    border-radius: 9999px;
    font-weight: 500;
    letter-spacing: 0.3px;

    &:not(.ghost):not(.outline) {
      border: none !important;
    }

    &:hover:not(.ghost):not(.outline) {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 4px 4px 0 #000000;
    }

    &.outline {
      outline: none !important;
    }

    &.outline:hover {
      transform: none;
      box-shadow: none !important;
      outline: none !important;
    }
  }

  .chip.layout-dark {
    border-radius: 9999px;
    font-weight: 500;
    letter-spacing: 0.3px;

    &:not(.ghost):not(.outline) {
      border: none !important;
    }

    &:hover:not(.ghost):not(.outline) {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 6px 6px 0 #000000;
    }

    &.outline {
      outline: none !important;
    }

    &.outline:hover {
      transform: none;
      box-shadow: none !important;
      outline: none !important;
    }
  }

  .chip.layout-clean {
    border-radius: 9999px;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0px;

    &:not(.ghost):not(.outline) {
      border: none !important;
    }

    &:hover:not(.ghost):not(.outline) {
      transform: none;
      box-shadow: none;
    }

    &.outline:hover {
      transform: none;
      box-shadow: none;
    }
  }

  .chip.layout-square {
    border-radius: 0;
    letter-spacing: 0.5px;

    &:not(.ghost):not(.outline) {
      border: none !important;
    }

    &:hover:not(.ghost):not(.outline) {
      transform: none;
      box-shadow: none;
    }

    &.outline:hover {
      transform: none;
      box-shadow: none;
    }
  }
`
