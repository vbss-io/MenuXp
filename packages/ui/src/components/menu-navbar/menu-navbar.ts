export const menuNavbarLayoutGlobalStyles = `
  .icon-wrapper {
    color: var(--restaurant-primary-color) !important;
    border-color: var(--restaurant-primary-color) !important;

    &:hover {
      background-color: color-mix(in srgb, var(--restaurant-secondary-color) 20%, transparent) !important;
    }
  }

  .navigation-container.layout-menuxp {
    background-color: #ffffff;
    border-top: 3px solid #000000;
    box-shadow: 6px 8px 0 #000000;

    .icon-wrapper {
      border-radius: 16px;
      border: 3px solid var(--restaurant-primary-color);
      box-shadow: 4px 6px 0 #000000;

      &:hover {
        box-shadow: 2px 3px 0 #000000;
        transform: translateY(-4px) translateZ(0);
      }

      &:active {
        transform: translateY(-1px) translateZ(0);
      }
    }
  }

  .navigation-container.layout-default {
    background-color: #ffffff;
    border-top: 2px solid hsl(220, 13%, 91%);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

    .icon-wrapper {
      border-radius: 8px;
      border: 2px solid var(--restaurant-primary-color);

      &:hover {
        box-shadow: 2px 2px 0 #000000;
      }
    }
  }

  .navigation-container.layout-dark {
    background-color: #000000 !important;
    border-top: 2px solid hsl(217, 19%, 27%);
    box-shadow: 6px 6px 0 #000000;

    .icon-wrapper {
      border-radius: 12px;
      border: 2px solid var(--restaurant-primary-color);
      color: #ffffff !important;

      &:hover {
        background-color: hsl(215, 28%, 17%) !important;
        box-shadow: 4px 4px 0 #000000;
      }
    }

    .navigation-item:hover {
      transform: translateY(-3px) translateZ(0);
    }
  }

  .navigation-container.layout-clean {
    background-color: #ffffff;
    border-top: 1px solid hsl(220, 13%, 91%);
    box-shadow: none;

    .icon-wrapper {
      border-radius: 4px;
      border: 1px solid var(--restaurant-primary-color);

      &:hover {
        box-shadow: 2px 2px 0 #000000;
        background-color: transparent !important;
      }
    }

    .navigation-item:hover {
      transform: translateY(-1px) translateZ(0);
    }
  }

  .navigation-container.layout-square {
    background-color: #ffffff;
    border-top: 2px solid hsl(220, 13%, 91%);
    box-shadow: none;

    .icon-wrapper {
      border-radius: 0;
      border: 2px solid var(--restaurant-primary-color);

      &:hover {
        box-shadow: 2px 2px 0 #000000;
      }
    }
  }
`
