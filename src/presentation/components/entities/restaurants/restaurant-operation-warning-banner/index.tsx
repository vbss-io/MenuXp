import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { ClockIcon } from '@phosphor-icons/react'
import styled from 'styled-components'
import { BusinessWeekDay } from '@/domain/enums/restaurants/business-week-day.enum'

const Banner = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.yellow};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
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
      ${({ theme }) => theme.colors.mx.yellow} 0%,
      ${({ theme }) => theme.colors.mx.red} 100%
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
  background: ${({ theme }) => theme.colors.mx.yellow};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  position: relative;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing.xs};

  svg {
    width: 20px;
    height: 20px;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    width: ${({ theme }) => theme.spacing.xxxl};
    height: ${({ theme }) => theme.spacing.xxxl};

    svg {
      width: 24px;
      height: 24px;
    }
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

const TimeInfo = styled.strong`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.mx.black};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }
`

interface RestaurantOperationWarningBannerProps {
  operationId: string | null
  businessHours?: Record<string, string>
}

const dayLabels = {
  [BusinessWeekDay.MONDAY]: 'Segunda-feira',
  [BusinessWeekDay.TUESDAY]: 'Terça-feira',
  [BusinessWeekDay.WEDNESDAY]: 'Quarta-feira',
  [BusinessWeekDay.THURSDAY]: 'Quinta-feira',
  [BusinessWeekDay.FRIDAY]: 'Sexta-feira',
  [BusinessWeekDay.SATURDAY]: 'Sábado',
  [BusinessWeekDay.SUNDAY]: 'Domingo'
}

export const RestaurantOperationWarningBanner = ({
  operationId,
  businessHours
}: RestaurantOperationWarningBannerProps) => {
  const { configValidation } = useRestaurant()

  if (!configValidation?.isReadyForOperation || operationId) {
    return null
  }

  const getCurrentDay = (): BusinessWeekDay => {
    const today = new Date().getDay()
    const dayMap = {
      0: BusinessWeekDay.SUNDAY,
      1: BusinessWeekDay.MONDAY,
      2: BusinessWeekDay.TUESDAY,
      3: BusinessWeekDay.WEDNESDAY,
      4: BusinessWeekDay.THURSDAY,
      5: BusinessWeekDay.FRIDAY,
      6: BusinessWeekDay.SATURDAY
    }
    return dayMap[today as keyof typeof dayMap]
  }

  const currentDay = getCurrentDay()
  const todayHours = businessHours?.[currentDay]
  const dayLabel = dayLabels[currentDay]

  const description = 'Este restaurante não está aceitando pedidos no momento.'
  let timeInfo = ''

  if (todayHours) {
    const [startTime, endTime] = todayHours.split('-')
    timeInfo = `Horário de funcionamento hoje (${dayLabel}): ${startTime} - ${endTime}`
  } else {
    timeInfo = `Fechado hoje (${dayLabel})`
  }

  return (
    <Banner>
      <IconContainer>
        <ClockIcon size={20} color="#000000" weight="fill" />
      </IconContainer>
      <Content>
        <Title>Restaurante Fechado</Title>
        <Description>{description}</Description>
        {timeInfo && <TimeInfo>{timeInfo}</TimeInfo>}
      </Content>
    </Banner>
  )
}
