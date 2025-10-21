export const accordionLayoutGlobalStyles = `
  .accordion-trigger.open,
  .accordion-trigger:focus {
    box-shadow: inset 0 0 0 2px var(--restaurant-primary-color) !important;
  }

  .accordion-item.layout-default {
    border-radius: 8px;
    box-shadow: 2px 2px 0 #000000;
    border-width: 2px;
    font-weight: 400;

    &:hover {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 4px 4px 0 #000000;
    }

    .accordion-trigger {
      font-weight: 500;
      border-radius: 8px;

      &.open {
        border-radius: 8px 8px 0 0;
      }
    }
  }

  .accordion-item.layout-dark {
    border-radius: 12px;
    box-shadow: 4px 4px 0 #000000;
    border-width: 2px;
    font-weight: 500;
    background-color: #2a2a2a !important;
    border-color: #404040 !important;

    &:hover {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 6px 6px 0 #000000;
    }

    .accordion-trigger {
      font-weight: 500;
      color: #ffffff !important;
      border-radius: 12px;

      &.open {
        border-radius: 12px 12px 0 0;
      }

      &:hover:not(:disabled) {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .accordion-title {
      color: #ffffff !important;
    }

    .accordion-icon {
      color: #ffffff !important;
    }

    .accordion-content {
      border-top-color: #404040 !important;
    }

    .accordion-content-inner {
      color: #cccccc !important;
    }
  }

  .accordion-item.layout-clean {
    border-radius: 4px;
    box-shadow: none;
    border-width: 1px;
    font-weight: 300;

    &:hover {
      transform: none;
      box-shadow: none;
    }

    .accordion-trigger {
      font-weight: 400;
      border-radius: 4px;

      &.open {
        border-radius: 4px 4px 0 0;
      }

      &:hover:not(:disabled) {
        background-color: hsl(210, 20%, 98%);
      }
    }
  }

  .accordion-item.layout-square {
    border-radius: 0;
    box-shadow: none;
    border-width: 2px;
    font-weight: 700;

    &:hover {
      transform: none;
      box-shadow: none;
    }

    .accordion-trigger {
      font-weight: 700;
      border-radius: 0;

      &.open {
        border-radius: 0;
      }

      &:hover:not(:disabled) {
        background-color: hsl(220, 14%, 96%);
      }
    }
  }
`
