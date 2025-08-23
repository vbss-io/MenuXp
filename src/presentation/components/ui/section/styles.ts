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
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

export const SectionGrid = styled.div`
  display: grid;
  gap: 3rem;
  align-items: center;
  width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`

export const SectionTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`

export const SectionVisualContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
