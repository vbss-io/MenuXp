import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
`

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
`

export const ChartTypeToggle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
`

interface ToggleButtonProps {
  $isActive?: boolean
}

export const ToggleButton = styled.button<ToggleButtonProps>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.yellow : 'transparent')};
  color: ${({ theme }) => theme.colors.mx.black};
  border: ${({ $isActive }) => ($isActive ? '2px solid' : 'none')};
  border-color: ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  text-transform: uppercase;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.fast} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    background: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.yellow : theme.colors.mx.gray[200])};
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 2px ${({ theme }) => theme.colors.mx.white},
      0 0 0 4px ${({ theme }) => theme.colors.mx.blue};
  }
`

export const KpisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

export const KpiCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`

export const KpiLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.gray[600]};
  text-transform: uppercase;
`

export const KpiValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const ChartContainer = styled.div`
  min-height: 300px;
  width: 100%;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.mx.gray[500]};
  text-align: center;
`

export const EmptyStateText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.body};
`
