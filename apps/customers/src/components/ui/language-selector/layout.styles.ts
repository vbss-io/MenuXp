export const languageSelectorLayoutGlobalStyles = `
  .language-trigger:hover {
    border-color: var(--restaurant-primary-color) !important;
    background: color-mix(in srgb, var(--restaurant-primary-color) 10%, transparent) !important;
  }

  .language-trigger:focus {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--restaurant-primary-color) 30%, transparent) !important;
  }

  .language-circle.active {
    background: color-mix(in srgb, var(--restaurant-primary-color) 20%, transparent) !important;
    border-color: var(--restaurant-primary-color) !important;
  }

  .language-code {
    color: var(--restaurant-primary-color) !important;
  }

  .language-option:hover {
    background: color-mix(in srgb, var(--restaurant-primary-color) 15%, transparent) !important;

    .language-circle {
      border-color: var(--restaurant-primary-color) !important;
      background: color-mix(in srgb, var(--restaurant-primary-color) 20%, transparent) !important;
    }
  }

  .language-option:focus {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--restaurant-primary-color) 40%, transparent) !important;
  }

  .language-option.active {
    background: color-mix(in srgb, var(--restaurant-primary-color) 10%, transparent) !important;
    color: var(--restaurant-primary-color) !important;
  }

  .language-trigger.layout-menuxp {
    border: 3px solid #000000;
    border-radius: 16px;
    box-shadow: 4px 6px 0 #000000;
    font-weight: 700;

    &:hover {
      box-shadow: 2px 3px 0 #000000;
      transform: translateY(-2px) translateZ(0);
    }

    .language-circle {
      border: 2px solid #000000;
    }

    .language-code {
      font-weight: 700;
    }
  }

  .language-trigger.layout-default {
    background: #ffffff;
    border: 2px solid hsl(220, 13%, 91%);
    border-radius: 8px;
  }

  .language-trigger.layout-dark {
    background: hsl(215, 28%, 17%) !important;
    border: 2px solid var(--restaurant-primary-color);
    color: #ffffff !important;

    &:hover {
      background: hsl(217, 19%, 27%) !important;
    }

    .language-circle {
      background: hsl(217, 19%, 27%) !important;
      border: 2px solid hsl(215, 14%, 34%);

      &.active {
        background: color-mix(in srgb, var(--restaurant-primary-color) 40%, transparent) !important;
      }
    }

    .language-code {
      color: #ffffff !important;
    }
  }

  .language-trigger.layout-clean {
    background: #ffffff;
    border: 1px solid hsl(216, 12%, 84%);
    border-radius: 4px;
    box-shadow: none;

    &:hover {
      box-shadow: 2px 2px 0 #000000;
    }

    .language-circle {
      background: hsl(210, 20%, 98%);
      border: 1px solid hsl(220, 13%, 91%);
    }
  }

  .language-trigger.layout-square {
    background: #ffffff;
    border: 2px solid hsl(216, 12%, 84%);
    border-radius: 0;
    box-shadow: none;

    &:hover {
      box-shadow: 2px 2px 0 #000000;
    }

    .language-circle {
      background: hsl(220, 14%, 96%);
      border: 2px solid hsl(216, 12%, 84%);
      border-radius: 0;
    }
  }

  .language-option.layout-dark {
    background: hsl(215, 28%, 17%) !important;
    color: #ffffff !important;

    &:hover {
      background: hsl(217, 19%, 27%) !important;

      .language-circle:not(.active) {
        background: hsl(215, 14%, 34%) !important;
        border-color: hsl(220, 9%, 46%) !important;
      }
    }

    &.active {
      background: color-mix(in srgb, var(--restaurant-primary-color) 40%, transparent) !important;
      color: #ffffff !important;
    }

    .language-circle {
      background: hsl(215, 14%, 34%);
      border-color: hsl(220, 9%, 46%);

      &.active {
        background: color-mix(in srgb, var(--restaurant-primary-color) 40%, transparent) !important;
      }
    }
  }
`
