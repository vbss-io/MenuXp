import { HouseIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useNavigate } from 'react-router-dom'

import * as S from './styles'

export const Error = () => {
  const navigate = useNavigate()
  return (
    <S.Container>
      <S.ErrorContent>
        <S.TitleContainer>
          <S.Title>ERROR</S.Title>
          <WarningCircleIcon size={48} weight="duotone" />
        </S.TitleContainer>
        <S.Message>Ops! Parece que algo deu errado. Esta página encontrou um erro inesperado.</S.Message>
        <S.ButtonContainer>
          <Button onClick={() => navigate('/')}>
            <HouseIcon size={20} weight="fill" />
            Voltar ao Menu
          </Button>
        </S.ButtonContainer>
      </S.ErrorContent>
    </S.Container>
  )
}
