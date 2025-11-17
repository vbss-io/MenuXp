import styled from 'styled-components'

export const PlansSection = styled.section`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.xxxxl} ${theme.spacing.md}`};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.mx.white} 0%,
    ${({ theme }) => theme.colors.mx.gray[50]} 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xxxxxl} ${theme.spacing.xl}`};
  }
`

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxxl};
  }
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.muted};
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
`

export const BillingToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxs};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  background: ${({ theme }) => theme.colors.mx.white};
  padding: ${({ theme }) => theme.spacing.xxxs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`

export const ToggleButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxs};
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.lg}`};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.mx.black : theme.colors.text.muted)};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.fontWeights.semibold : theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.mx.gray[100])};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xl}`};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`

export const SaveBadge = styled.span`
  background: ${({ theme }) => theme.colors.mx.black};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.xxxs} ${theme.spacing.xxs}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const FooterNote = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: ${({ theme }) => theme.spacing.xxxl};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

export const LoadingState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxxl};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.muted};
`

export const ErrorState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxxl};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.error};
`
