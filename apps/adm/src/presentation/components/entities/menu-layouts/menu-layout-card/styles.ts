import styled from 'styled-components'

export const Card = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primary : theme.colors.mx.black)};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;
  aspect-ratio: 1;
  min-width: 220px;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

export const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.2;
`

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const SectionsCount = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const CardFooter = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.sm};
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
`
