import styled from 'styled-components'

export const ShowcaseGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
`

export const ShowcaseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
`

export const ShowcaseItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[700]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
`

export const Label = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-align: center;
  transition: color ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
`
