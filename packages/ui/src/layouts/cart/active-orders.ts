export const activeOrdersLayoutGlobalStyles = `
  .active-orders.layout-default .section-title {
    color: #1f2937 !important;
  }

  .active-orders.layout-default .current-order-card {
    border: 1px solid #dbeafe !important;
    border-radius: 16px !important;
    background: linear-gradient(145deg, #eff6ff 0%, #ffffff 100%) !important;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08) !important;
  }

  .active-orders.layout-default .timeline-icon {
    background: #e0efff !important;
    color: #2563eb !important;
    border: 1px solid #bfdbfe !important;
  }

  .active-orders.layout-default .timeline-icon.timeline-icon-active,
  .active-orders.layout-default .timeline-icon.timeline-icon-completed {
    background: linear-gradient(120deg, #3b82f6 0%, #2563eb 100%) !important;
    color: #ffffff !important;
    box-shadow: 0 6px 18px rgba(59, 130, 246, 0.35) !important;
  }

  .active-orders.layout-default .timeline-line.timeline-line-completed {
    background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%) !important;
  }

  .active-orders.layout-default .compact-order-card {
    border: 1px solid #e5e7eb !important;
    background: #f9fafb !important;
  }

  .active-orders.layout-dark {
    color: #f9fafb !important;
  }

  .active-orders.layout-dark .section-title {
    color: #f9fafb !important;
  }

  .active-orders.layout-dark .current-order-card {
    border: 1px solid #1f2937 !important;
    background: linear-gradient(145deg, #0f172a 0%, #1f2937 100%) !important;
    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.45) !important;
  }

  .active-orders.layout-dark .order-status {
    background: rgba(148, 163, 184, 0.25) !important;
    color: #f9fafb !important;
  }

  .active-orders.layout-dark .timeline-icon {
    background: rgba(148, 163, 184, 0.12) !important;
    color: #94a3b8 !important;
    border: 1px solid rgba(148, 163, 184, 0.25) !important;
  }

  .active-orders.layout-dark .timeline-icon.timeline-icon-active,
  .active-orders.layout-dark .timeline-icon.timeline-icon-completed {
    background: var(--restaurant-primary-color, #3b82f6) !important;
    color: #0f172a !important;
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.5) !important;
  }

  .active-orders.layout-dark .timeline-line {
    background: rgba(148, 163, 184, 0.25) !important;
  }

  .active-orders.layout-dark .timeline-line.timeline-line-completed {
    background: var(--restaurant-primary-color, #3b82f6) !important;
  }

  .active-orders.layout-dark .compact-order-card {
    border: 1px solid #1f2937 !important;
    background: rgba(17, 24, 39, 0.85) !important;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4) !important;
  }

  .active-orders.layout-clean .section-title {
    color: var(--restaurant-primary-color, #111827) !important;
    border-bottom: 2px solid var(--restaurant-primary-color, #111827) !important;
    padding-bottom: 8px !important;
  }

  .active-orders.layout-clean .current-order-card {
    border: 2px solid var(--restaurant-primary-color, #111827) !important;
    border-radius: 12px !important;
    background: #ffffff !important;
    box-shadow: none !important;
  }

  .active-orders.layout-clean .order-status {
    background: var(--restaurant-primary-color, #111827) !important;
    color: #ffffff !important;
  }

  .active-orders.layout-clean .timeline-icon {
    background: #ffffff !important;
    border: 2px solid var(--restaurant-primary-color, #111827) !important;
    color: var(--restaurant-primary-color, #111827) !important;
  }

  .active-orders.layout-clean .timeline-icon.timeline-icon-active,
  .active-orders.layout-clean .timeline-icon.timeline-icon-completed {
    background: var(--restaurant-primary-color, #111827) !important;
    color: #ffffff !important;
  }

  .active-orders.layout-clean .timeline-line {
    background: rgba(17, 24, 39, 0.15) !important;
  }

  .active-orders.layout-clean .timeline-line.timeline-line-completed {
    background: var(--restaurant-primary-color, #111827) !important;
  }

  .active-orders.layout-clean .compact-order-card {
    border: 1px solid #e5e7eb !important;
    background: #ffffff !important;
  }

  .active-orders.layout-square .section-title {
    color: var(--restaurant-primary-color, #111827) !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.6px !important;
  }

  .active-orders.layout-square .current-order-card {
    border: 4px solid var(--restaurant-primary-color, #111827) !important;
    border-radius: 0 !important;
    background: #ffffff !important;
    box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.18) !important;
  }

  .active-orders.layout-square .order-status {
    border-radius: 0 !important;
    background: var(--restaurant-secondary-color, #f59e0b) !important;
    color: #111827 !important;
    font-weight: 700 !important;
  }

  .active-orders.layout-square .timeline-icon {
    border-radius: 0 !important;
    border: 2px solid var(--restaurant-primary-color, #111827) !important;
    background: #ffffff !important;
    color: var(--restaurant-primary-color, #111827) !important;
  }

  .active-orders.layout-square .timeline-icon.timeline-icon-active,
  .active-orders.layout-square .timeline-icon.timeline-icon-completed {
    background: var(--restaurant-primary-color, #111827) !important;
    color: #ffffff !important;
  }

  .active-orders.layout-square .timeline-line {
    height: 4px !important;
    background: rgba(17, 24, 39, 0.4) !important;
  }

  .active-orders.layout-square .timeline-line.timeline-line-completed {
    background: var(--restaurant-primary-color, #111827) !important;
  }

  .active-orders.layout-square .compact-order-card {
    border: 3px solid var(--restaurant-primary-color, #111827) !important;
    border-radius: 0 !important;
    box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.15) !important;
  }
`

