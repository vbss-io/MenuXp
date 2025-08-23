// eslint-disable-next-line react-refresh/only-export-components
export const LAYOUTS_KEYS = ['default', 'dark', 'clean', 'square']

export const LAYOUTS = {
  default: {
    name: 'Círculos',
    key: 'default',
    image: '/images/layouts/01.png'
  },
  dark: {
    name: 'Cards Escuros',
    key: 'dark',
    image: '/images/layouts/02.png'
  },
  clean: {
    name: 'Cards Limpos',
    key: 'clean',
    image: '/images/layouts/03.png'
  },
  square: {
    name: 'Cards Quadrados',
    key: 'square',
    image: '/images/layouts/04.png'
  }
} as const

export type LayoutKey = (typeof LAYOUTS_KEYS)[number]
export type Layout = (typeof LAYOUTS)[keyof typeof LAYOUTS]
