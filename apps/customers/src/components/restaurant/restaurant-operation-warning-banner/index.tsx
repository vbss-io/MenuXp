import { ClockIcon } from '@phosphor-icons/react'
import { useTranslator } from 'vbss-translator'

import { useRestaurant } from '@/hooks/use-restaurant'
import { BusinessWeekDay } from '@/types/restaurant'

import * as S from './styles'

interface RestaurantOperationWarningBannerProps {
  operationId: string | null
  businessHours?: Record<string, string>
  acceptsScheduling?: boolean
  forceShow?: boolean
}

const getDayLabels = (t: (key: string) => string) => ({
  [BusinessWeekDay.MONDAY]: t('Segunda-feira'),
  [BusinessWeekDay.TUESDAY]: t('Terça-feira'),
  [BusinessWeekDay.WEDNESDAY]: t('Quarta-feira'),
  [BusinessWeekDay.THURSDAY]: t('Quinta-feira'),
  [BusinessWeekDay.FRIDAY]: t('Sexta-feira'),
  [BusinessWeekDay.SATURDAY]: t('Sábado'),
  [BusinessWeekDay.SUNDAY]: t('Domingo')
})

export const RestaurantOperationWarningBanner = ({
  operationId,
  businessHours,
  acceptsScheduling = false,
  forceShow = false
}: RestaurantOperationWarningBannerProps) => {
  const { t } = useTranslator()
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
  const dayLabels = getDayLabels(t)
  const dayLabel = dayLabels[currentDay]

  let description = t('Este restaurante não está aceitando pedidos no momento.')
  let timeInfo = ''

  if (acceptsScheduling) {
    description = t('Este restaurante está fechado no momento, mas você pode fazer um pedido agendado.')
  }

  if (todayHours) {
    const [startTime, endTime] = todayHours.split('-')
    timeInfo = `${t('Horário de funcionamento hoje')} (${dayLabel}): ${startTime} - ${endTime}`
  } else {
    timeInfo = `${t('Fechado hoje')} (${dayLabel})`
  }

  return (
    <S.Banner className={`banner layout-${layout}`}>
      <S.IconContainer className="icon-container">
        <ClockIcon size={20} color="#000000" weight="fill" />
      </S.IconContainer>
      <S.Content>
        <S.Title className="title">{t('Restaurante Fechado')}</S.Title>
        <S.Description className="description">{description}</S.Description>
        {timeInfo && <S.TimeInfo className="time-info">{timeInfo}</S.TimeInfo>}
      </S.Content>
    </S.Banner>
  )
}
