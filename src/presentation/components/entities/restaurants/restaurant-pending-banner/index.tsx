import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { WarningIcon } from '@phosphor-icons/react'
import styled from 'styled-components'

const Banner = styled.div`
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 1px solid #f87171;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.1);
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing.lg};
  height: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
`

const Content = styled.div`
  flex: 1;
`

const Title = styled.h3`
  color: #dc2626;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  line-height: 1.2;
`

const Description = styled.p`
  color: #991b1b;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin: 0;
  line-height: 1.3;
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
        <WarningIcon size={20} color="#dc2626" weight="fill" />
      </IconContainer>
      <Content>
        <Title>Seu Restaurante não está pronto para operação!</Title>
        <Description>Para iniciar as operações, complete as seguintes configurações: {missingConfigs}</Description>
      </Content>
    </Banner>
  )
}
