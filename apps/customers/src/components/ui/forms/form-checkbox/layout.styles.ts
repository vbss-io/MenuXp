export const formCheckboxLayoutGlobalStyles = `
  .form-checkbox .checkboxContainer .checkboxRoot {
    background-color: var(--restaurant-primary-color) !important;
    border-color: var(--restaurant-primary-color) !important;

    &:checked {
      background-color: var(--restaurant-primary-color) !important;
      border-color: var(--restaurant-primary-color) !important;
    }

    &:hover:not(:disabled) {
      background-color: var(--restaurant-secondary-color) !important;
      border-color: var(--restaurant-secondary-color) !important;
    }
  }

  .form-checkbox .checkboxContainer .checkboxLabel:hover {
    color: var(--restaurant-primary-color) !important;
  }

  .form-checkbox.layout-menuxp .checkboxContainer .checkboxRoot {
    border-radius: 16px;
    box-shadow: 2px 2px 0 #000000;
    border-width: 3px;
    font-weight: 700;

    &:hover {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 4px 4px 0 #000000;
    }
  }

  .form-checkbox.layout-menuxp .checkboxContainer .checkboxLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
    cursor: pointer;
  }

  .form-checkbox.layout-default .checkboxContainer .checkboxRoot {
    border-radius: 8px;
    box-shadow: 2px 2px 0 #000000;
    border-width: 2px;
    font-weight: 400;

    &:hover {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 4px 4px 0 #000000;
    }
  }

  .form-checkbox.layout-default .checkboxContainer .checkboxLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
    cursor: pointer;
  }

  .form-checkbox.layout-dark .checkboxContainer .checkboxRoot {
    background-color: #2a2a2a !important;
    border-color: #404040 !important;
    border-radius: 12px;
    box-shadow: 4px 4px 0 #000000;
    border-width: 2px;
    font-weight: 500;

    &:hover {
      transform: translateY(-1px) translateZ(0);
      box-shadow: 6px 6px 0 #000000;
    }

    .checkboxIconContainer {
      color: #ffffff !important;
    }
  }

  .form-checkbox.layout-dark .checkboxContainer .checkboxLabel {
    color: #ffffff !important;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
    cursor: pointer;
  }

  .form-checkbox.layout-clean .checkboxContainer .checkboxRoot {
    border-radius: 4px;
    box-shadow: none;
    border-width: 1px;
    font-weight: 300;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  .form-checkbox.layout-clean .checkboxContainer .checkboxLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0px;
    cursor: pointer;
  }

  .form-checkbox.layout-square .checkboxContainer .checkboxRoot {
    border-radius: 0;
    box-shadow: none;
    border-width: 2px;
    font-weight: 400;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  .form-checkbox.layout-square .checkboxContainer .checkboxLabel {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0.3px;
    cursor: pointer;
  }
`
