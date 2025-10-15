import { ArrowLeftIcon } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'

import { ChildBackButton as BackButton, ChildContainer as Container } from '../styles'
import * as S from './styles'

export const RestaurantGamesPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(`/${slug}`)
  }

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <ArrowLeftIcon size={20} />
        Voltar ao menu
      </BackButton>
      <S.PageContainer>
        <S.Title>Jogos</S.Title>
        <S.DevelopmentMessage>Esta página está em desenvolvimento</S.DevelopmentMessage>
      </S.PageContainer>
    </Container>
  )
}
