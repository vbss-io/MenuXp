import styled from 'styled-components'

interface SectionContainerProps {
  $background: string
  $padding: string
  $minHeight: string
}

export const SectionContainer = styled.section<SectionContainerProps>`
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight};
  background-color: ${({ $background }) => $background};
  padding: ${({ $padding }) => $padding};
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`

export const SectionContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`

export const SectionGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.lg} {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`

export const SectionTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  min-width: 0; /* Permite que o conteúdo quebre */
`

export const SectionVisualContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 0; /* Permite que o conteúdo quebre */
`
