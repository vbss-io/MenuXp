import { WarningIcon } from '@phosphor-icons/react'
import { useTranslator } from 'vbss-translator'

import { useRestaurant } from '@/hooks/use-restaurant'
import * as S from './styles'

interface RestaurantClientWarningBannerProps {
  forceShow?: boolean
}

export const RestaurantClientWarningBanner = ({ forceShow = false }: RestaurantClientWarningBannerProps) => {
  const { t } = useTranslator()
  const { configValidation, layout } = useRestaurant()

  if (!forceShow && (!configValidation || configValidation.isReadyForOperation)) {
    return null
  }

  return (
    <S.Banner className={`banner layout-${layout}`}>
      <S.IconContainer className="icon-container">
        <WarningIcon size={20} color="#ffffff" weight="fill" />
      </S.IconContainer>
      <S.Content>
        <S.Title className="title">{t('Restaurante Temporariamente Indisponível')}</S.Title>
        <S.Description className="description">
          {t(
            'Este restaurante ainda está em processo de configuração. Por favor, tente novamente mais tarde ou entre em contato diretamente com o estabelecimento.'
          )}
        </S.Description>
      </S.Content>
    </S.Banner>
  )
}
