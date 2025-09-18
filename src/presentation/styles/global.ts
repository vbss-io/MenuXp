import { createGlobalStyle } from 'styled-components'

const stripHsl = (color: string) => color.replace(/^hsl\(|\)$/g, '')

export const GlobalStyle = createGlobalStyle`
  * {
    --primary: ${({ theme }) => stripHsl(theme.colors.primary)};
      --secondary: ${({ theme }) => stripHsl(theme.colors.secondary)};
      --highlight: ${({ theme }) => stripHsl(theme.colors.highlight)};
      --text: ${({ theme }) => stripHsl(theme.colors.text.primary)};
      --background: ${({ theme }) => stripHsl(theme.colors.background)};
  }

  :root {
    --mx-black: ${({ theme }) => theme.colors.mx.black};
    --mx-yellow: ${({ theme }) => theme.colors.mx.yellow};
    --mx-red: ${({ theme }) => theme.colors.mx.red};
    --mx-blue: ${({ theme }) => theme.colors.mx.blue};
    --mx-white: ${({ theme }) => theme.colors.mx.white};
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

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fonts.title};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    letter-spacing: 0.5px;
  }

  /* Regra global para fonte TANKER com peso regular - apenas títulos */
  *[style*="font-family: 'Tanker'"], 
  *[style*="font-family: Tanker"],
  .tanker-font {
    font-family: 'Tanker', ${({ theme }) => theme.typography.fonts.title} !important;
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular} !important;
  }

  /* Garantir que inputs usem fonte do body */
  input, textarea, select {
    font-family: ${({ theme }) => theme.typography.fonts.body} !important;
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular} !important;
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

  .mobile-header-content::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.mx.red};
  }

  .mobile-header-content::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  .mobile-header-content::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.mx.gray[700]};
  }
`
