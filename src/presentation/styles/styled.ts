import 'styled-components'

interface BaseThemeSizes {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

interface ExtendedThemeSizes extends BaseThemeSizes {
  xxxs?: string
  xxs?: string
  xxl?: string
  xxxl: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      default: string
    }
    fontSizes: ExtendedThemeSizes
    fontWeights: {
      light: number
      normal: number
      medium: number
      bold: number
    }
    spacing: ExtendedThemeSizes
    borderRadius: BaseThemeSizes
    breakpoints: BaseThemeSizes
    colors: {
      primary: string
      secondary: string
      highlight: string
      text: string
      background: string
      [key: string]: string
    }
  }
}
