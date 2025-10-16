export const combosSectionLayoutGlobalStyles = `
  .view-container.combos-section {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .section-title {
    svg {
      color: var(--restaurant-secondary-color) !important;
    }
  }

  .view-container.combos-section.layout-menuxp {
    .section-title {
      color: hsl(0, 0%, 0%) !important;
    }

    .combos-grid {
      gap: 16px !important;

      @media (max-width: 768px) {
        gap: 12px !important;
      }
    }

    .loading-container {
      color: hsl(0, 0%, 50%) !important;
    }

    .empty-state-container {
      color: hsl(0, 0%, 50%) !important;
    }

    .empty-state-description {
      color: hsl(0, 0%, 50%) !important;
    }
  }

  .view-container.combos-section.layout-default {
    .section-title {
      color: hsl(0, 0%, 0%) !important;
    }

    .combos-grid {
      gap: 16px !important;

      @media (max-width: 768px) {
        gap: 12px !important;
      }
    }

    .loading-container {
      color: hsl(0, 0%, 50%) !important;
    }

    .empty-state-container {
      color: hsl(0, 0%, 50%) !important;
    }

    .empty-state-description {
      color: hsl(0, 0%, 50%) !important;
    }
  }

  .view-container.combos-section.layout-dark {
    .section-title {
      color: hsl(0, 0%, 100%) !important;
    }

    .combos-grid {
      gap: 16px !important;

      @media (max-width: 768px) {
        gap: 12px !important;
      }
    }

    .loading-container {
      color: #cccccc !important;
    }

    .empty-state-container {
      color: #cccccc !important;
    }

    .empty-state-description {
      color: #cccccc !important;
    }
  }

  .view-container.combos-section.layout-clean {
    .section-title {
      color: hsl(0, 0%, 0%) !important;
    }

    .combos-grid {
      gap: 20px !important;

      @media (max-width: 768px) {
        gap: 16px !important;
      }
    }

    .loading-container {
      color: hsl(0, 0%, 50%) !important;
    }

    .empty-state-container {
      color: hsl(0, 0%, 50%) !important;
    }

    .empty-state-description {
      color: hsl(0, 0%, 50%) !important;
    }
  }

  .view-container.combos-section.layout-square {
    .section-title {
      color: hsl(0, 0%, 0%) !important;
    }

    .combos-grid {
      gap: 16px !important;

      @media (max-width: 768px) {
        gap: 12px !important;
      }
    }

    .loading-container {
      color: hsl(0, 0%, 50%) !important;
    }

    .empty-state-container {
      color: hsl(0, 0%, 50%) !important;
    }

    .empty-state-description {
      color: hsl(0, 0%, 50%) !important;
    }
  }
`
