export const comboboxLayoutGlobalStyles = `
  .combobox-label.layout-dark {
    color: #ffffff !important;
  }

  .combobox-input.layout-menuxp {
    border-radius: 16px;
    box-shadow: 4px 6px 0 #000000;
    border-width: 3px;
    font-weight: 700;

    &:focus {
      border-color: var(--restaurant-primary-color) !important;
    }
  }

  .combobox-input.layout-default {
    border-radius: 8px;
    box-shadow: 2px 2px 0 #000000;
    border-width: 2px;
    font-weight: 400;

    &:focus {
      border-color: var(--restaurant-primary-color) !important;
    }
  }

  .combobox-input.layout-dark {
    background-color: #2a2a2a !important;
    color: #ffffff !important;
    border-color: #404040 !important;
    border-radius: 12px;
    box-shadow: 4px 4px 0 #000000;
    border-width: 2px;
    font-weight: 500;

    &:focus {
      border-color: var(--restaurant-primary-color) !important;
    }
  }

  .combobox-input.layout-clean {
    border-radius: 4px;
    box-shadow: none;
    border-width: 1px;
    font-weight: 300;

    &:focus {
      border-color: var(--restaurant-primary-color) !important;
    }
  }

  .combobox-input.layout-square {
    border-radius: 0;
    box-shadow: none;
    border-width: 2px;
    font-weight: 400;

    &:focus {
      border-color: var(--restaurant-primary-color) !important;
    }
  }

  .combobox-icon-button.layout-dark {
    color: #ffffff !important;

    &:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.1) !important;
      color: var(--restaurant-primary-color) !important;
    }
  }

  .combobox-icon-button:hover:not(:disabled) {
    background-color: color-mix(in srgb, var(--restaurant-primary-color) 10%, transparent) !important;
    color: var(--restaurant-primary-color) !important;
  }

  .combobox-dropdown.layout-menuxp {
    border-radius: 16px;
    box-shadow: 6px 8px 0 #000000;
    border-width: 3px;
  }

  .combobox-dropdown.layout-default {
    border-radius: 8px;
    box-shadow: 2px 2px 0 #000000;
    border-width: 2px;
  }

  .combobox-dropdown.layout-dark {
    background-color: #2a2a2a !important;
    border-color: #404040 !important;
    border-radius: 12px;
    box-shadow: 4px 4px 0 #000000;
    border-width: 2px;
  }

  .combobox-dropdown.layout-clean {
    border-radius: 4px;
    box-shadow: none;
    border-width: 1px;
  }

  .combobox-dropdown.layout-square {
    border-radius: 0;
    box-shadow: none;
    border-width: 2px;
  }

  .combobox-option.layout-dark {
    color: #ffffff !important;
    border-bottom-color: #404040 !important;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
      color: #ffffff !important;
    }

    &.selected {
      background-color: #404040 !important;
      color: #ffffff !important;
    }
  }

  .combobox-option:hover {
    background-color: color-mix(in srgb, var(--restaurant-primary-color) 10%, transparent) !important;
    color: var(--restaurant-primary-color) !important;
  }

  .combobox-option.selected {
    background-color: var(--restaurant-primary-color) !important;
  }

  .combobox-loading.layout-dark,
  .combobox-empty.layout-dark {
    color: #cccccc !important;
  }
`
