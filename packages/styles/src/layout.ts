export type LayoutType = 'menuxp' | 'default' | 'dark' | 'clean' | 'square'

export const baseLayoutStyles = `
  body.layout-dark {
    background-color: #2a2a2a !important;
    color: #fff;
  }

  body.layout-menuxp,
  body.layout-default,
  body.layout-clean,
  body.layout-square {
    background-color: hsl(0, 0%, 100%) !important;
    color: #000;
  }
`

