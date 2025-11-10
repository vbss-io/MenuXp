export const carouselSectionLayoutGlobalStyles = `
  .carousel-button {
    background-color: color-mix(in srgb, var(--restaurant-primary-color) 80%, transparent) !important;
    color: #ffffff !important;
    border-color: transparent !important;
  }

  .carousel-indicator.active {
    background-color: var(--restaurant-primary-color) !important;
    border-color: var(--restaurant-primary-color) !important;
  }

  .carousel-indicator:not(.active) {
    background-color: var(--restaurant-secondary-color) !important;
    border-color: var(--restaurant-primary-color) !important;
  }

  .carousel-view-container.layout-default {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;

    .carousel-image {
      border-radius: 8px !important;
    }

    .carousel-placeholder {
      background: transparent !important;
      color: hsl(220, 9%, 46%) !important;
      border-radius: 8px !important;
    }

    .carousel-button {
      border-radius: 50% !important;
      border: 2px solid #ffffff !important;
      box-shadow: 2px 2px 0 #000000 !important;
    }

    .carousel-indicator {
      border-radius: 50% !important;
      border-width: 2px !important;
    }
  }

  .carousel-view-container.layout-dark {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;

    .carousel-image {
      border-radius: 12px !important;
    }

    .carousel-placeholder {
      background: transparent !important;
      color: #cccccc !important;
      border-radius: 12px !important;
    }

    .carousel-button {
      border-radius: 50% !important;
      border: 2px solid #ffffff !important;
      box-shadow: 6px 6px 0 #000000 !important;
    }

    .carousel-indicator {
      border-radius: 50% !important;
      border-width: 2px !important;
    }
  }

  .carousel-view-container.layout-clean {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;

    .carousel-image {
      border-radius: 4px !important;
    }

    .carousel-placeholder {
      background: transparent !important;
      color: hsl(220, 9%, 46%) !important;
      border-radius: 4px !important;
    }

    .carousel-button {
      border-radius: 50% !important;
      border: 1px solid #ffffff !important;
      box-shadow: none !important;
    }

    .carousel-indicator {
      border-radius: 50% !important;
      border-width: 1px !important;
    }
  }

  .carousel-view-container.layout-square {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;

    .carousel-image {
      border-radius: 0 !important;
    }

    .carousel-placeholder {
      background: transparent !important;
      color: hsl(220, 9%, 46%) !important;
      border-radius: 0 !important;
    }

    .carousel-button {
      border-radius: 0 !important;
      border: 2px solid #ffffff !important;
      box-shadow: none !important;
    }

    .carousel-indicator {
      border-radius: 0 !important;
      border-width: 2px !important;
    }
  }
`
