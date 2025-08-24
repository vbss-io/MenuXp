import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

export const OptionalContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

export const OptionalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr auto;
    align-items: end;
  }
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const RemoveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.spacing.md};
`
