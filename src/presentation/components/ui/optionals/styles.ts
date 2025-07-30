import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin: 0;
`

export const OptionalContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
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
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`

export const RemoveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.spacing.sm};
`
