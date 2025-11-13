import type { DefaultTheme } from 'styled-components'
import {
  animations,
  borderRadius,
  breakpoints,
  menuXpColors,
  shadows,
  spacing,
  typography,
  zIndex
} from './tokens'

export const createTheme = (overrides?: Partial<DefaultTheme>): DefaultTheme => {
  const baseTheme: DefaultTheme = {
    colors: {
      primary: menuXpColors.yellow,
      secondary: menuXpColors.blue,
      accent: menuXpColors.blue,
      highlight: menuXpColors.red,
      neutral: menuXpColors.black,
      background: menuXpColors.gray[50],

      mx: menuXpColors,

      success: menuXpColors.success,
      warning: menuXpColors.warning,
      error: menuXpColors.error,
      info: menuXpColors.info,

      text: {
        primary: menuXpColors.black,
        secondary: menuXpColors.black,
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
    },

    typography,
    spacing,
    borderRadius,
    shadows,
    breakpoints,
    animations,
    zIndex,

    fonts: {
      default: typography.fonts.body
    },
    fontSizes: typography.fontSizes,
    fontWeights: {
      light: typography.fontWeights.light,
      normal: typography.fontWeights.regular,
      medium: typography.fontWeights.medium,
      semibold: typography.fontWeights.semibold,
      bold: typography.fontWeights.bold,
      extrabold: typography.fontWeights.extrabold
    }
  }

  return overrides ? { ...baseTheme, ...overrides } : baseTheme
}

export const admTheme = createTheme()

export const customersTheme = createTheme({
  colors: {
    ...createTheme().colors,
    background: menuXpColors.white,
    text: {
      primary: menuXpColors.black,
      secondary: menuXpColors.gray[600],
      muted: menuXpColors.gray[500],
      inverse: menuXpColors.white
    }
  }
})

export const theme = createTheme()

