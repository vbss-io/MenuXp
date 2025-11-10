export const addressStepLayoutGlobalStyles = `
  .address-step.layout-default {
    gap: 1.25rem !important;
  }

  .address-step.layout-default .section-title {
    font-size: 1.125rem !important;
    font-weight: 600 !important;
    color: hsl(220, 13%, 13%) !important;
  }

  .address-step.layout-default .address-card {
    border: 2px solid hsl(220, 13%, 91%) !important;
    border-radius: 8px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
    padding: 1rem !important;
    transition: all 0.2s ease !important;
  }

  .address-step.layout-default .address-card:hover {
    border-color: hsl(221, 83%, 53%) !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
    transform: none !important;
  }

  .address-step.layout-default .address-card.selected {
    background: hsl(214, 100%, 97%) !important;
    border-color: hsl(221, 83%, 53%) !important;
  }

  .address-step.layout-default .address-card.selected .address-card-title {
    color: hsl(221, 83%, 53%) !important;
  }

  .address-step.layout-default .address-card.selected .address-card-text {
    color: hsl(215, 20%, 44%) !important;
  }

  .address-step.layout-default .address-card.not-selected {
    background: hsl(0, 0%, 100%) !important;
  }

  .address-step.layout-default .address-card-title {
    font-weight: 600 !important;
  }

  .address-step.layout-dark {
    gap: 1.25rem !important;
  }

  .address-step.layout-dark .section-title {
    font-size: 1.125rem !important;
    font-weight: 600 !important;
    color: hsl(0, 0%, 98%) !important;
  }

  .address-step.layout-dark .address-card {
    border: 2px solid hsl(217, 19%, 27%) !important;
    border-radius: 8px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
    padding: 1rem !important;
    background: hsl(217, 19%, 18%) !important;
  }

  .address-step.layout-dark .address-card:hover {
    border-color: hsl(217, 91%, 60%) !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
    transform: none !important;
  }

  .address-step.layout-dark .address-card.selected {
    background: hsl(217, 32%, 25%) !important;
    border-color: hsl(217, 91%, 60%) !important;
  }

  .address-step.layout-dark .address-card.selected .address-card-title {
    color: hsl(217, 91%, 60%) !important;
  }

  .address-step.layout-dark .address-card.selected .address-card-text {
    color: hsl(215, 20%, 78%) !important;
  }

  .address-step.layout-dark .address-card.not-selected {
    background: hsl(217, 19%, 18%) !important;
  }

  .address-step.layout-dark .address-card.not-selected .address-card-title {
    color: hsl(0, 0%, 90%) !important;
  }

  .address-step.layout-dark .address-card.not-selected .address-card-text {
    color: hsl(215, 20%, 65%) !important;
  }

  .address-step.layout-clean {
    gap: 1.5rem !important;
  }

  .address-step.layout-clean .section-title {
    font-size: 1rem !important;
    font-weight: 500 !important;
    color: hsl(0, 0%, 20%) !important;
    letter-spacing: 0.025em !important;
  }

  .address-step.layout-clean .address-card {
    border: 1px solid hsl(0, 0%, 85%) !important;
    border-radius: 4px !important;
    box-shadow: none !important;
    padding: 1rem !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .address-step.layout-clean .address-card:hover {
    border-color: hsl(0, 0%, 60%) !important;
    box-shadow: none !important;
    transform: none !important;
  }

  .address-step.layout-clean .address-card.selected {
    background: hsl(0, 0%, 97%) !important;
    border-color: hsl(0, 0%, 40%) !important;
  }

  .address-step.layout-clean .address-card.selected .address-card-title {
    color: hsl(0, 0%, 10%) !important;
  }

  .address-step.layout-clean .address-card.selected .address-card-text {
    color: hsl(0, 0%, 30%) !important;
  }

  .address-step.layout-clean .address-card.not-selected {
    background: hsl(0, 0%, 100%) !important;
  }

  .address-step.layout-clean .address-card-title {
    font-weight: 500 !important;
    font-size: 0.9375rem !important;
  }

  .address-step.layout-square {
    gap: 1rem !important;
  }

  .address-step.layout-square .section-title {
    font-size: 1.125rem !important;
    font-weight: 600 !important;
    color: hsl(0, 0%, 13%) !important;
    text-transform: uppercase !important;
    font-family: 'Courier New', monospace !important;
    letter-spacing: 0.1em !important;
  }

  .address-step.layout-square .address-card {
    border: 2px solid hsl(0, 0%, 13%) !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 1rem !important;
    background: hsl(0, 0%, 100%) !important;
  }

  .address-step.layout-square .address-card:hover {
    border-width: 3px !important;
    transform: none !important;
  }

  .address-step.layout-square .address-card.selected {
    background: hsl(0, 0%, 13%) !important;
    border-color: hsl(0, 0%, 13%) !important;
  }

  .address-step.layout-square .address-card.selected .address-card-title {
    color: hsl(0, 0%, 100%) !important;
  }

  .address-step.layout-square .address-card.selected .address-card-text {
    color: hsl(0, 0%, 90%) !important;
  }

  .address-step.layout-square .address-card.not-selected {
    background: hsl(0, 0%, 100%) !important;
  }

  .address-step.layout-square .address-card-title {
    font-weight: 600 !important;
    font-family: 'Courier New', monospace !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
  }

  @media (max-width: 768px) {
    .address-step .address-card {
      padding: 1rem !important;
    }

    .address-step .section-title {
      font-size: 1rem !important;
    }

    .address-step .address-card-title {
      font-size: 0.9375rem !important;
    }

    .address-step .address-card-text {
      font-size: 0.8125rem !important;
    }
  }
`
