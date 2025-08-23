import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { WarningIcon } from '@phosphor-icons/react'
import styled from 'styled-components'

const Banner = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.red};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  position: relative;

  @media ${({ theme }) => theme.breakpoints.md} {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.mx.red} 0%,
      ${({ theme }) => theme.colors.mx.yellow} 100%
    );
    opacity: 0.05;
    pointer-events: none;
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  }
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing.xl};
  height: ${({ theme }) => theme.spacing.xl};
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.mx.red};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  position: relative;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing.xs};

  @media ${({ theme }) => theme.breakpoints.md} {
    width: ${({ theme }) => theme.spacing.xxxl};
    height: ${({ theme }) => theme.spacing.xxxl};
  }
`

const Content = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.mx.black};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: 1.2;

  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.mx.black};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  margin: 0;
  line-height: 1.4;

  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }
`

export const RestaurantPendingBanner = () => {
  const { configValidation } = useRestaurant()

  if (!configValidation || configValidation.isReadyForOperation) {
    return null
  }

  const missingConfigs = configValidation.missingConfigs.join(', ')

  return (
    <Banner>
      <IconContainer>
        <WarningIcon size={24} color="#ffffff" weight="fill" />
      </IconContainer>
      <Content>
        <Title>Seu Restaurante não está pronto para operação!</Title>
        <Description>Para iniciar as operações, complete as seguintes configurações: {missingConfigs}</Description>
      </Content>
    </Banner>
  )
}
