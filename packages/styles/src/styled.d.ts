import 'styled-components'

interface GrayScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

interface MenuXpColors {
  black: string
  yellow: string
  red: string
  blue: string
  white: string
  gray: GrayScale
  success: string
  warning: string
  error: string
  info: string
  gold: string
  silver: string
  bronze: string
  experience: string
  achievement: string
}

interface TextColors {
  primary: string
  secondary: string
  muted: string
  inverse: string
}

interface GameColors {
  gold: string
  silver: string
  bronze: string
  experience: string
  achievement: string
}

interface Typography {
  fonts: {
    title: string
    body: string
    mono: string
    game: string
  }
  fontSizes: {
    xxxs: string
    xxs: string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
    xxxl: string
    xxxxl: string
    xxxxxl: string
  }
  fontWeights: {
    light: number
    regular: number
    medium: number
    semibold: number
    bold: number
    extrabold: number
  }
  lineHeights: {
    none: number
    tight: number
    snug: number
    normal: number
    relaxed: number
    loose: number
  }
}

interface Animations {
  durations: {
    fast: string
    normal: string
    slow: string
    slower: string
  }
  easings: {
    linear: string
    ease: string
    easeIn: string
    easeOut: string
    easeInOut: string
    bounce: string
    game: string
  }
}

interface Shadows {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  brutalist: string
  brutalistHover: string
  brutalistCard: string
}

interface ZIndex {
  hide: number
  base: number
  docked: number
  dropdown: number
  sticky: number
  banner: number
  overlay: number
  modal: number
  popover: number
  skipLink: number
  toast: number
  tooltip: number
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      highlight: string
      neutral: string
      background: string

      mx: MenuXpColors

      success: string
      warning: string
      error: string
      info: string

      text: TextColors

      game: GameColors
    }

    typography: Typography
    spacing: {
      xxxs: string
      xxs: string
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
      xxxl: string
      xxxxl: string
      xxxxxl: string
    }
    borderRadius: {
      none: string
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
      full: string
      brutalist: string
    }
    shadows: Shadows
    breakpoints: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    animations: Animations
    zIndex: ZIndex
  }
}

