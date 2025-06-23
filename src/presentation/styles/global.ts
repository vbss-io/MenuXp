import { createGlobalStyle } from 'styled-components'

const stripHsl = (color: string) => color.replace(/^hsl\(|\)$/g, '')

export const GlobalStyle = createGlobalStyle`
  * {
    --primary: ${({ theme }) => stripHsl(theme.colors.primary)};
    --secondary: ${({ theme }) => stripHsl(theme.colors.secondary)};
    --highlight: ${({ theme }) => stripHsl(theme.colors.highlight)};
    --text: ${({ theme }) => stripHsl(theme.colors.text)};
    --background: ${({ theme }) => stripHsl(theme.colors.background)};
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
  }

  &::-webkit-scrollbar {
    width: 0.3rem;
    height: 0.3rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 20rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 10rem;
      cursor: grab;
    }
  }
`
