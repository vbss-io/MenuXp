import { ArrowLeftIcon } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslator } from 'vbss-translator'

import { ChildBackButton as BackButton, ChildContainer as Container } from '../styles'
import * as S from './styles'

export const RestaurantGamesPage = () => {
  const { t } = useTranslator()
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(`/${slug}`)
  }

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <ArrowLeftIcon size={20} />
        {t('Voltar ao menu')}
      </BackButton>
      <S.PageContainer>
        <S.Title>{t('Jogos')}</S.Title>
        <S.DevelopmentMessage>{t('Esta página está em desenvolvimento')}</S.DevelopmentMessage>
      </S.PageContainer>
    </Container>
  )
}
