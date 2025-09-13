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
    body: "'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    mono: "'Roboto Mono', 'Courier New', monospace",
    game: "'Press Start 2P', monospace"
  },
  fontSizes: {
    xxxs: '0.625rem', // 10px
    xxs: '0.75rem', // 12px
    xs: '0.875rem', // 14px
    sm: '1rem', // 16px
    md: '1.125rem', // 18px
    lg: '1.25rem', // 20px
    xl: '1.5rem', // 24px
    xxl: '2rem', // 32px
    xxxl: '2.5rem', // 40px
    xxxxl: '3rem', // 48px
    xxxxxl: '4rem' // 64px
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
  xxxs: '0.125rem', // 2px
  xxs: '0.25rem', // 4px
  xs: '0.5rem', // 8px
  sm: '0.75rem', // 12px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  xxl: '2.5rem', // 40px
  xxxl: '3rem', // 48px
  xxxxl: '4rem', // 64px
  xxxxxl: '5rem' // 80px
} as const

const borderRadius = {
  none: '0',
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.5rem', // 24px
  xxl: '2rem', // 32px
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
    slow: '0.3s',
    slower: '0.5s'
  },
  easings: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    game: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }
} as const

const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
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
    },

    game: {
      gold: menuXpColors.gold,
      silver: menuXpColors.silver,
      bronze: menuXpColors.bronze,
      experience: menuXpColors.experience,
      achievement: menuXpColors.achievement
    },

    highlight: menuXpColors.blue // Legacy
  },

  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  animations,
  zIndex,

  fonts: {
    default: typography.fonts.body // Legacy
  },
  fontSizes: {
    xxxs: typography.fontSizes.xxxs, // Legacy
    xxs: typography.fontSizes.xxs, // Legacy
    xs: typography.fontSizes.xs, // Legacy
    sm: typography.fontSizes.sm, // Legacy
    md: typography.fontSizes.md, // Legacy
    lg: typography.fontSizes.lg, // Legacy
    xl: typography.fontSizes.xl, // Legacy
    xxl: typography.fontSizes.xxl, // Legacy
    xxxl: typography.fontSizes.xxxl // Legacy
  },
  fontWeights: {
    light: typography.fontWeights.light, // Legacy
    normal: typography.fontWeights.regular, // Legacy
    medium: typography.fontWeights.medium, // Legacy
    bold: typography.fontWeights.bold // Legacy
  }
}
