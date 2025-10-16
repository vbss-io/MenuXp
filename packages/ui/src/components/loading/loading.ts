export const loadingLayoutGlobalStyles = `
  .loading-spinner {
    border-color: var(--restaurant-primary-color) !important;
    border-top-color: var(--restaurant-secondary-color) !important;
  }

  .loading-spinner.layout-menuxp {
    border-width: 3px;

    &:hover {
      transform: scale(1.05);
    }
  }

  .loading-spinner.layout-default {
    border-width: 2px;

    &:hover {
      transform: scale(1.02);
    }
  }

  .loading-spinner.layout-dark {
    border-width: 2px;
    background-color: rgba(42, 42, 42, 0.1);

    &:hover {
      transform: scale(1.02);
    }
  }

  .loading-spinner.layout-clean {
    border-width: 1px;

    &:hover {
      transform: none;
    }
  }

  .loading-spinner.layout-square {
    border-width: 2px;

    &:hover {
      transform: none;
    }
  }
`
