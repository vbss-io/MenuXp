import styled from 'styled-components'

interface HighlightContainerProps {
  $size?: string
}

export const HighlightContainer = styled.span<HighlightContainerProps>`
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  color: ${({ theme }) => theme.colors.mx.black};
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  font-weight: 600;
  display: inline;
  margin: 0 0.25rem;
  font-size: ${({ $size }) => $size || 'inherit'};
  white-space: nowrap;
`
