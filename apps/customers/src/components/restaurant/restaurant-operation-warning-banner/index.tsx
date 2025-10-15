import { ClockIcon } from '@phosphor-icons/react'

import { useRestaurant } from '@/hooks/use-restaurant'
import { BusinessWeekDay } from '@/types/restaurant'

import * as S from './styles'

interface RestaurantOperationWarningBannerProps {
  operationId: string | null
  businessHours?: Record<string, string>
  acceptsScheduling?: boolean
  forceShow?: boolean
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
  businessHours,
  acceptsScheduling = false,
  forceShow = false
}: RestaurantOperationWarningBannerProps) => {
  const { configValidation, layout } = useRestaurant()

  if (!forceShow && (!configValidation?.isReadyForOperation || operationId)) {
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

  let description = 'Este restaurante não está aceitando pedidos no momento.'
  let timeInfo = ''

  if (acceptsScheduling) {
    description = 'Este restaurante está fechado no momento, mas você pode fazer um pedido agendado.'
  }

  if (todayHours) {
    const [startTime, endTime] = todayHours.split('-')
    timeInfo = `Horário de funcionamento hoje (${dayLabel}): ${startTime} - ${endTime}`
  } else {
    timeInfo = `Fechado hoje (${dayLabel})`
  }

  return (
    <S.Banner className={`banner layout-${layout}`}>
      <S.IconContainer className="icon-container">
        <ClockIcon size={20} color="#000000" weight="fill" />
      </S.IconContainer>
      <S.Content>
        <S.Title className="title">Restaurante Fechado</S.Title>
        <S.Description className="description">{description}</S.Description>
        {timeInfo && <S.TimeInfo className="time-info">{timeInfo}</S.TimeInfo>}
      </S.Content>
    </S.Banner>
  )
}
