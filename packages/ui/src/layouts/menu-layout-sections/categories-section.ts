export const categoriesSectionLayoutGlobalStyles = `
  .view-container.categories-section.layout-default {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .category-card.layout-default {
    background: #ffffff !important;
    border-radius: 8px !important;
    border: none !important;
    box-shadow: none !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding-top: 8px !important;
  }

  .category-card.layout-default:hover {
    transform: translateY(-2px) translateZ(0) !important;
    box-shadow: none !important;
  }

  .category-card.layout-default .category-icon {
    width: 60px !important;
    height: 60px !important;
    background: #ffffff !important;
    border: 2px solid #000000 !important;
    border-radius: 50% !important;
    box-shadow: 4px 4px 0 #000000 !important;
    margin-bottom: 8px !important;
    min-width: 60px !important;
  }

  .category-card.layout-default .category-icon svg { width: 30px; height: 30px; color: #000000; }
  .category-card.layout-default:hover .category-icon { border-color: var(--restaurant-primary-color) !important; }
  .category-card.layout-default:hover .category-icon svg { color: var(--restaurant-primary-color) !important; }

  .category-card.layout-default .category-name {
    font-weight: 400 !important;
    color: hsl(217, 19%, 27%) !important;
  }

  .view-container.categories-section.layout-dark {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .category-card.layout-dark {
    background: transparent !important;
    border-radius: 12px !important;
    border: none !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding-top: 8px !important;
  }

  .category-card.layout-dark:hover { transform: translateY(-2px) translateZ(0) !important; box-shadow: none !important; }

  .category-card.layout-dark .category-icon {
    width: 60px !important;
    height: 60px !important;
    background: color-mix(in srgb, var(--restaurant-primary-color) 20%, transparent) !important;
    border: 2px solid var(--restaurant-primary-color) !important;
    border-radius: 25% !important;
    margin-bottom: 8px !important;
    min-width: 60px !important;
  }

  .category-card.layout-dark .category-icon svg { width: 30px; height: 30px; color: var(--restaurant-primary-color); }
  .categories-section.layout-dark .category-name { color: #ffffff !important; font-weight: 700; }
  .categories-section.layout-dark .category-description { color: #cccccc !important; }
  .category-card.layout-dark:hover .category-icon { border-color: var(--restaurant-secondary-color) !important; }
  .category-card.layout-dark:hover .category-icon svg { color: var(--restaurant-secondary-color) !important; }

  .view-container.categories-section.layout-clean {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .category-card.layout-clean {
    background: #ffffff !important;
    border: 1px solid var(--restaurant-primary-color) !important;
    border-radius: 4px !important;
    width: auto !important;
    min-width: 100px !important;
    max-width: 150px !important;
    height: 100px !important;
    margin-right: 8px !important;
    margin-top: 8px !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    justify-content: center !important;
    padding: 8px !important;
  }

  .category-card.layout-clean svg { color: var(--restaurant-primary-color); }
  .category-card.layout-clean:hover { border-color: var(--restaurant-secondary-color) !important; }
  .category-card.layout-clean:hover div { color: var(--restaurant-secondary-color) !important; }
  .category-card.layout-clean:hover svg { color: var(--restaurant-secondary-color) !important; }

  .category-card.layout-clean .category-icon { width: 40px !important; height: 40px !important; }
  .category-card.layout-clean .category-icon svg { width: 40px; height: 40px; color: var(--restaurant-primary-color); }
  .categories-section.layout-clean .category-name {
    color: var(--restaurant-primary-color) !important;
    padding: 0 8px !important;
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: unset !important;
    word-wrap: break-word !important;
    text-align: center !important;
    line-height: 1.2 !important;
  }
  .categories-section.layout-clean .category-description { display: none !important; }

  .view-container.categories-section.layout-square {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .category-card.layout-square {
    background: #ffffff !important;
    border-radius: 0 !important;
    border: none !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding-top: 8px !important;
  }

  .category-card.layout-square:hover { transform: translateY(-2px) translateZ(0) !important; box-shadow: none !important; }
  .category-card.layout-square .category-icon { width: 60px !important; height: 60px !important; border: 2px solid #000000 !important; margin-bottom: 8px !important; min-width: 60px !important; }
  .category-card.layout-square .category-icon svg { width: 30px; height: 30px; color: var(--restaurant-primary-color); }
  .categories-section.layout-square .category-name { color: hsl(217, 19%, 27%) !important; font-weight: 600; }
  .category-card.layout-square:hover .category-icon { border-color: var(--restaurant-secondary-color) !important; }
  .category-card.layout-square:hover .category-icon svg { color: var(--restaurant-secondary-color) !important; }
`
