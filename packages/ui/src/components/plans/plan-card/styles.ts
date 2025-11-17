import styled from 'styled-components'

export const CardContainer = styled.div<{ $highlighted: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mx.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme, $highlighted }) =>
    $highlighted ? theme.shadows.lg : theme.shadows.md};
  border: 2px solid ${({ theme, $highlighted }) =>
    $highlighted ? theme.colors.primary : theme.colors.mx.gray[200]};
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transform: translateY(-4px);
  }
`

export const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  right: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.mx.black};
  padding: ${({ theme }) => `${theme.spacing.xxxs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const PlanName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xxs} 0;
`

export const PlanDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

export const PriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xxs};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const Currency = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`

export const Price = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1;
`

export const PriceLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.muted};
`

export const CTAContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  .plan-cta {
    width: 100%;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`

export const FeaturesSection = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  }
`
