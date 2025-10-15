export const sliderLayoutGlobalStyles = `
  .slider-close-button:hover {
    border-color: var(--restaurant-primary-color) !important;
    background: color-mix(in srgb, var(--restaurant-primary-color) 10%, transparent) !important;
  }

  .slider-container.layout-menuxp {
    border: 3px solid #000000;
    box-shadow: 4px 6px 0 #000000;

    .slider-header {
      border-bottom: 3px solid #000000;
      font-weight: 700;
    }

    .slider-title {
      color: #000000;
      font-weight: 700;
    }

    .slider-close-button {
      border: 2px solid hsl(216, 12%, 84%);
      border-radius: 8px;
    }
  }

  .slider-container.layout-default {
    border: 2px solid hsl(220, 13%, 91%);
    box-shadow: 6px 6px 0 #000000;

    .slider-header {
      border-bottom: 2px solid hsl(220, 13%, 91%);
    }

    .slider-title {
      color: #000000;
    }

    .slider-close-button:hover {
      background: hsl(220, 14%, 96%);
    }
  }

  .slider-container.layout-dark {
    background: hsl(215, 28%, 17%) !important;
    border-left: 2px solid var(--restaurant-primary-color);
    box-shadow: 6px 6px 0 #000000;
    color: #ffffff !important;

    .slider-header {
      background: hsl(215, 28%, 17%) !important;
      border-bottom: 2px solid hsl(217, 19%, 27%);
    }

    .slider-title {
      color: #ffffff !important;
    }

    .slider-close-button {
      color: hsl(220, 13%, 91%);

      &:hover {
        background: hsl(217, 19%, 27%);
        color: #ffffff;
      }
    }

    * {
      color: #ffffff;
    }

    label, p, span, h1, h2, h3, h4, h5, h6 {
      color: #ffffff !important;
    }
  }

  .slider-container.layout-clean {
    border: 1px solid hsl(220, 13%, 91%);
    box-shadow: 4px 4px 0 #000000;

    .slider-header {
      border-bottom: 1px solid hsl(220, 13%, 91%);
    }

    .slider-title {
      color: #000000;
      font-weight: 500;
    }

    .slider-close-button:hover {
      background: hsl(210, 20%, 98%);
    }
  }

  .slider-container.layout-square {
    border: 2px solid hsl(216, 12%, 84%);
    box-shadow: 6px 6px 0 #000000;
    border-radius: 0;

    .slider-header {
      border-bottom: 2px solid hsl(216, 12%, 84%);
      border-radius: 0;
    }

    .slider-title {
      color: #000000;
    }

    .slider-close-button {
      border-radius: 0;

      &:hover {
        background: hsl(220, 14%, 96%);
      }
    }
  }
`
