export const restaurantHeaderLayoutGlobalStyles = `
  .header-container.layout-menuxp {
    background: #ffffff !important;
    border-bottom: 3px solid #000000 !important;
    box-shadow: 6px 8px 0 #000000 !important;

    .logo-container img {
      filter: none;
    }

    .actions-container {
      gap: 16px;
    }
  }

  .header-container.layout-default {
    background: #ffffff !important;
    border-bottom: 1px solid hsl(220, 13%, 91%) !important;
    box-shadow: 2px 2px 0 #000000 !important;

    .logo-container img {
      filter: none;
    }
  }

  .header-container.layout-dark {
    background: #000000 !important;
    border-bottom: 2px solid hsl(217, 19%, 27%) !important;
    box-shadow: 6px 6px 0 #000000 !important;

    .logo-container img {
      filter: brightness(1.2) contrast(1.1);
    }
  }

  .header-container.layout-clean {
    background: #ffffff !important;
    border-bottom: 1px solid hsl(216, 18%, 95%) !important;
    box-shadow: none !important;

    .logo-container img {
      filter: none;
    }

    .actions-container {
      gap: 12px;
    }
  }

  .header-container.layout-square {
    background: #ffffff !important;
    border-bottom: 2px solid hsl(216, 12%, 84%) !important;
    box-shadow: none !important;

    .logo-container img {
      filter: none;
    }
  }
`
