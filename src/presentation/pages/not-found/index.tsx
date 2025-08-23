import { HouseIcon, RocketIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useNavigate } from 'react-router-dom'

import * as S from './styles'

// To-Do: Update styles
export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <S.Container>
      <S.NotFoundContent>
        <S.TitleContainer>
          <S.Title>GAME OVER</S.Title>
          <RocketIcon size={48} weight="duotone" />
        </S.TitleContainer>
        <S.Message>
          Ops! Parece que você encontrou um glitch na matrix. Esta página não existe ou foi movida para outro lugar.
        </S.Message>
        <S.ButtonContainer>
          <Button onClick={() => navigate('/')}>
            <HouseIcon size={20} weight="fill" />
            Voltar ao Menu
          </Button>
        </S.ButtonContainer>
      </S.NotFoundContent>
    </S.Container>
  )
}
