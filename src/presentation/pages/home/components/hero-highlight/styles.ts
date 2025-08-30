import styled from 'styled-components'

interface HighlightContainerProps {
  $size?: string
}

export const HighlightContainer = styled.span<HighlightContainerProps>`
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  color: ${({ theme }) => theme.colors.mx.black};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  display: inline;
  margin: 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ $size }) => $size || 'inherit'};
  white-space: nowrap;
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  word-wrap: normal;
  word-break: keep-all;
  hyphens: none;
  overflow-wrap: normal;

  @media ${({ theme }) => theme.breakpoints.xs} {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    margin: 0 ${({ theme }) => theme.spacing.xs};
    white-space: nowrap;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin: 0 ${({ theme }) => theme.spacing.sm};
    white-space: nowrap;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    margin: 0 ${({ theme }) => theme.spacing.lg};
    white-space: nowrap;
  }
`
