import { createGlobalStyle } from 'styled-components'

import { layoutStyles } from './layout'

const stripHsl = (color: string) => color.replace(/^hsl\(|\)$/g, '')

export const GlobalStyle = createGlobalStyle`
  * {
    --primary: ${({ theme }) => stripHsl(theme.colors.primary)};
    --secondary: ${({ theme }) => stripHsl(theme.colors.secondary)};
    --highlight: ${({ theme }) => stripHsl(theme.colors.accent)};
    --text: ${({ theme }) => stripHsl(theme.colors.text.primary)};
    --background: ${({ theme }) => stripHsl(theme.colors.background)};
  }

  :root {
    --restaurant-primary-color: ${({ theme }) => theme.colors.primary};
    --restaurant-secondary-color: ${({ theme }) => theme.colors.secondary};
    --primary-color: ${({ theme }) => theme.colors.primary};
    --secondary-color: ${({ theme }) => theme.colors.secondary};
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  * {
    max-width: 100%;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.mx.white};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    
    &:hover {
      background: ${({ theme }) => theme.colors.mx.gray[700]};
    }
  }

  ${layoutStyles}
`
