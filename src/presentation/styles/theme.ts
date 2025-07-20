import type { DefaultTheme } from 'styled-components'

export const basicTheme = {
  fonts: {
    default: 'Inter, sans-serif'
  },
  fontSizes: {
    xxxs: '0.5rem',
    xxs: '0.65rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem'
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700
  },
  spacing: {
    xxs: '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '2.5rem',
    xxxl: '3rem'
  },
  borderRadius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  breakpoints: {
    xs: '(min-width: 480px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)'
  }
} as const

const basicColors = {
  black: 'hsl(0, 0%, 0%)',
  white: 'hsl(0, 0%, 100%)',
  gray: 'hsl(0, 0%, 50%)',
  red: 'hsl(0, 100%, 50%)',
  green: 'hsl(120, 100%, 50%)'
}

export const theme: DefaultTheme = {
  ...basicTheme,
  colors: {
    ...basicColors,
    primary: 'hsl(10, 90%, 50%)',
    secondary: 'hsl(45, 100%, 51%)',
    highlight: 'hsl(200, 100%, 60%)',
    background: 'hsl(240, 17%, 96%)',
    text: 'hsl(0, 0%, 10%)',
    textAlt: 'hsl(0, 0%, 100%)'
  }
}
