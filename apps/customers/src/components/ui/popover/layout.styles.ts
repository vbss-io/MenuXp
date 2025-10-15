export const popoverLayoutGlobalStyles = `
  .popover.primary[data-state='open'] {
    border-color: var(--restaurant-primary-color) !important;
    background-color: var(--restaurant-primary-color) !important;
  }

  .popover.secondary[data-state='open'] {
    border-color: var(--restaurant-secondary-color) !important;
    background-color: var(--restaurant-secondary-color) !important;
  }

  .popover.outline[data-state='open'] {
    border-color: var(--restaurant-primary-color) !important;
  }

  .popover.outline[data-state='open'] h3 {
    color: var(--restaurant-primary-color) !important;
  }

  .popover[data-state='open'] .icon-button:hover {
    border-color: var(--restaurant-primary-color) !important;
    background: color-mix(in srgb, var(--restaurant-secondary-color) 20%, transparent) !important;
  }

  .popover[data-state='open'] .icon-button:focus {
    box-shadow: 0 0 0 3px var(--restaurant-primary-color) !important;
  }

  .popover[data-state='open'] .icon-button.selected {
    border-color: var(--restaurant-primary-color) !important;
    background: var(--restaurant-primary-color) !important;
  }

  .popover[data-state='open'] .pagination-button:hover:not(:disabled) {
    border-color: var(--restaurant-primary-color) !important;
    background: color-mix(in srgb, var(--restaurant-secondary-color) 20%, transparent) !important;
  }

  .popover[data-state='open'] .pagination-button:focus {
    box-shadow: 0 0 0 3px var(--restaurant-primary-color) !important;
  }

  .popover.layout-menuxp[data-state='open'] {
    border: 3px solid #000000;
    border-radius: 16px;
    box-shadow: 6px 8px 0 #000000;
    font-weight: 700;

    h3 {
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .icon-button {
      border-width: 3px;
      border-radius: 16px;
      box-shadow: 6px 8px 0 #000000;
      font-weight: 700;

      &:hover {
        transform: translateY(-2px) translateZ(0);
        box-shadow: 6px 8px 0 #000000;
      }
    }

    .pagination-button {
      border-width: 3px;
      border-radius: 16px;
      box-shadow: 6px 8px 0 #000000;
      font-weight: 700;

      &:hover:not(:disabled) {
        transform: translateY(-2px) translateZ(0);
        box-shadow: 6px 8px 0 #000000;
      }
    }
  }

  .popover.layout-default[data-state='open'] {
    border: 2px solid hsl(220, 13%, 91%);
    border-radius: 8px;
    box-shadow: 2px 2px 0 #000000;
    font-weight: 400;

    h3 {
      font-weight: 500;
      letter-spacing: 0.3px;
    }

    .icon-button {
      border-width: 2px;
      border-radius: 8px;
      box-shadow: 2px 2px 0 #000000;
      font-weight: 400;

      &:hover {
        transform: translateY(-1px) translateZ(0);
        box-shadow: 4px 4px 0 #000000;
      }
    }

    .pagination-button {
      border-width: 2px;
      border-radius: 8px;
      box-shadow: 2px 2px 0 #000000;
      font-weight: 400;

      &:hover:not(:disabled) {
        transform: translateY(-1px) translateZ(0);
        box-shadow: 4px 4px 0 #000000;
      }
    }
  }

  .popover.layout-dark[data-state='open'] {
    background-color: #2a2a2a !important;
    color: #ffffff !important;
    border: 2px solid #404040;
    border-radius: 12px;
    box-shadow: 4px 4px 0 #000000;
    font-weight: 500;

    h3 {
      color: #ffffff !important;
      font-weight: 500;
      letter-spacing: 0.3px;
    }

    .icon-button {
      border: 2px solid hsl(215, 14%, 34%);
      background: hsl(215, 28%, 17%);
      color: #ffffff;
      border-radius: 12px;
      box-shadow: 4px 4px 0 #000000;
      font-weight: 500;

      &:hover {
        background: hsl(217, 19%, 27%);
        transform: translateY(-1px) translateZ(0);
        box-shadow: 4px 4px 0 #000000;
      }
    }

    .pagination-button {
      border: 2px solid hsl(215, 14%, 34%);
      background: hsl(215, 28%, 17%);
      color: #ffffff;
      border-radius: 12px;
      box-shadow: 4px 4px 0 #000000;
      font-weight: 500;

      &:hover:not(:disabled) {
        background: hsl(217, 19%, 27%);
        transform: translateY(-1px) translateZ(0);
        box-shadow: 4px 4px 0 #000000;
      }
    }

    .pagination-info {
      color: hsl(220, 13%, 91%) !important;
    }
  }

  .popover.layout-clean[data-state='open'] {
    border: 1px solid hsl(220, 13%, 91%);
    border-radius: 4px;
    box-shadow: none;
    font-weight: 300;

    h3 {
      font-weight: 400;
      letter-spacing: 0px;
    }

    .icon-button {
      border-width: 1px;
      border-radius: 4px;
      box-shadow: none;
      font-weight: 300;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }

    .pagination-button {
      border-width: 1px;
      border-radius: 4px;
      box-shadow: none;
      font-weight: 300;

      &:hover:not(:disabled) {
        transform: none;
        box-shadow: none;
      }
    }
  }

  .popover.layout-square[data-state='open'] {
    border: 2px solid hsl(220, 13%, 91%);
    border-radius: 0;
    box-shadow: none;
    font-weight: 400;

    h3 {
      font-weight: 700;
      letter-spacing: 0.3px;
    }

    .icon-button {
      border-width: 2px;
      border-radius: 0;
      box-shadow: none;
      font-weight: 400;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }

    .pagination-button {
      border-width: 2px;
      border-radius: 0;
      box-shadow: none;
      font-weight: 400;

      &:hover:not(:disabled) {
        transform: none;
        box-shadow: none;
      }
    }
  }
`
