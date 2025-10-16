export const tooltipLayoutGlobalStyles = `
  .tooltip-wrapper.layout-menuxp .tooltipContent {
    border-radius: 16px !important;
    box-shadow: 6px 8px 0 #000000 !important;
    font-weight: 700 !important;
    padding: 16px !important;
    font-size: 16px !important;
    border-width: 3px !important;
  }

  .tooltip-wrapper.layout-default .tooltipContent {
    border-radius: 8px !important;
    box-shadow: 4px 4px 0 #000000 !important;
    font-weight: 400 !important;
    padding: 12px !important;
    font-size: 16px !important;
    border-width: 1px !important;
  }

  .tooltip-wrapper.layout-dark .tooltipContent {
    border-radius: 12px !important;
    box-shadow: 6px 6px 0 #000000 !important;
    font-weight: 500 !important;
    padding: 12px !important;
    font-size: 16px !important;
    border-width: 1px !important;
  }

  .tooltip-wrapper.layout-clean .tooltipContent {
    border-radius: 4px !important;
    box-shadow: 2px 2px 0 #000000 !important;
    font-weight: 300 !important;
    padding: 12px !important;
    font-size: 16px !important;
    border-width: 1px !important;
  }

  .tooltip-wrapper.layout-square .tooltipContent {
    border-radius: 0 !important;
    box-shadow: none !important;
    font-weight: 400 !important;
    padding: 12px !important;
    font-size: 16px !important;
    border-width: 2px !important;
  }

  .tooltip-wrapper.primary .tooltipContent {
    background-color: var(--restaurant-primary-color) !important;
    border-color: var(--restaurant-primary-color) !important;
    color: #ffffff !important;
  }

  .tooltip-wrapper.secondary .tooltipContent {
    background-color: var(--restaurant-secondary-color) !important;
    border-color: var(--restaurant-secondary-color) !important;
    color: #ffffff !important;
  }

  .tooltip-wrapper.outline .tooltipContent {
    background-color: #ffffff !important;
    border-color: var(--restaurant-primary-color) !important;
    color: #000000 !important;
  }

  .tooltip-wrapper.ghost .tooltipContent {
    background-color: hsl(220, 14%, 96%) !important;
    border-color: hsl(220, 13%, 91%) !important;
    color: hsl(215, 28%, 17%) !important;
  }

  .tooltip-wrapper.danger .tooltipContent {
    background-color: #ef4444 !important;
    border-color: #ef4444 !important;
    color: #ffffff !important;
  }

  .tooltip-wrapper.layout-dark.default .tooltipContent,
  .tooltip-wrapper.layout-dark:not(.primary):not(.secondary):not(.outline):not(.ghost):not(.danger) .tooltipContent {
    background-color: #1a1a1a !important;
    border-color: #404040 !important;
    color: #ffffff !important;
  }
`
