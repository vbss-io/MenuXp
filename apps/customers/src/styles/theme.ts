import type { DefaultTheme } from 'styled-components'

const menuXpColors = {
  black: 'hsl(0, 0%, 0%)',
  yellow: 'hsl(43, 99%, 52%)',
  red: 'hsl(357, 78%, 52%)',
  blue: 'hsl(201, 100%, 44%)',
  white: 'hsl(0, 0%, 100%)',

  gray: {
    50: 'hsl(210, 20%, 98%)',
    100: 'hsl(220, 14%, 96%)',
    200: 'hsl(220, 13%, 91%)',
    300: 'hsl(216, 12%, 84%)',
    400: 'hsl(218, 11%, 65%)',
    500: 'hsl(220, 9%, 46%)',
    600: 'hsl(215, 14%, 34%)',
    700: 'hsl(217, 19%, 27%)',
    800: 'hsl(215, 28%, 17%)',
    900: 'hsl(221, 39%, 11%)'
  },

  success: 'hsl(160, 84%, 39%)',
  warning: 'hsl(43, 96%, 56%)',
  error: 'hsl(0, 84%, 60%)',
  info: 'hsl(217, 91%, 60%)',

  gold: 'hsl(51, 100%, 50%)',
  silver: 'hsl(0, 0%, 75%)',
  bronze: 'hsl(25, 60%, 50%)',
  experience: 'hsl(271, 81%, 56%)',
  achievement: 'hsl(160, 84%, 39%)'
} as const

const typography = {
  fonts: {
    title: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    body: "'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  },
  fontSizes: {
    xxxs: '0.625rem',
    xxs: '0.75rem',
    xs: '0.875rem',
    sm: '1rem',
    md: '1.125rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
    xxxl: '2.5rem',
    xxxxl: '3rem',
    xxxxxl: '4rem'
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  }
} as const

const spacing = {
  xxxs: '0.125rem',
  xxs: '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '2.5rem',
  xxxl: '3rem',
  xxxxl: '4rem',
  xxxxxl: '5rem'
} as const

const borderRadius = {
  none: '0',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  xxl: '2rem',
  full: '9999px',
  brutalist: '16px'
} as const

const shadows = {
  none: 'none',
  sm: '2px 2px 0 #000000',
  md: '4px 4px 0 #000000',
  lg: '6px 6px 0 #000000',
  xl: '8px 8px 0 #000000',
  brutalist: '4px 6px 0 #000000',
  brutalistHover: '2px 3px 0 #000000',
  brutalistCard: '6px 8px 0 #000000'
} as const

const breakpoints = {
  xs: '(min-width: 480px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  xxl: '(min-width: 1536px)'
} as const

const animations = {
  durations: {
    fast: '0.15s',
    normal: '0.2s',
    slow: '0.3s'
  },
  easings: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
} as const

export const theme: DefaultTheme = {
  colors: {
    primary: menuXpColors.red,
    secondary: menuXpColors.yellow,
    accent: menuXpColors.blue,
    neutral: menuXpColors.black,
    background: menuXpColors.white,
    mx: menuXpColors,
    success: menuXpColors.success,
    warning: menuXpColors.warning,
    error: menuXpColors.error,
    info: menuXpColors.info,
    text: {
      primary: menuXpColors.black,
      secondary: menuXpColors.gray[600],
      muted: menuXpColors.gray[500],
      inverse: menuXpColors.white
    }
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  animations,
  zIndex: {
    hide: -1,
    base: 0,
    docked: 10,
    sticky: 20
  }
}
