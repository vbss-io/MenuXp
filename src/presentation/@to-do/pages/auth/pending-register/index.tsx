import { EnvelopeSimpleOpenIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ResentConfirmationEmailUsecase } from '@/application/auth/resent-confirmation-email.usecase'

import * as S from '../styles'

const EmailHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap;
`

export const PendingRegister = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email
  const [timer, setTimer] = useState(0)
  const [isResendDisabled, setIsResendDisabled] = useState(false)

  useEffect(() => {
    if (!email) {
      toast.error('Acesso inválido. Por favor, registre-se primeiro.')
      navigate('/login')
      return
    }
  }, [email, navigate])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else {
      setIsResendDisabled(false)
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [timer])

  const handleResendLink = async () => {
    try {
      if (!email) throw new Error()
      setIsResendDisabled(true)
      const resentConfirmationUsecase = new ResentConfirmationEmailUsecase()
      await resentConfirmationUsecase.execute({ email })
      toast.success('Confirmação reenviada com sucesso.')
      setTimer(60)
    } catch {
      toast.error('Ocorreu um erro ao reenviar a confirmação. Por favor, tente novamente.')
      setIsResendDisabled(false)
      setTimer(0)
    }
  }

  return (
    <S.Container>
      <S.LeftColumn>
        <S.Title>Verifique seu email</S.Title>
        <S.Divider />
        <S.Subtitle>Quase lá!</S.Subtitle>
        <S.Text>Enviamos um link de confirmação para verificar seu endereço de email.</S.Text>
      </S.LeftColumn>
      <S.RightColumn>
        <S.Card>
          <S.CardTitle>
            <S.IconWrapper>
              <EnvelopeSimpleOpenIcon size={48} weight="duotone" />
            </S.IconWrapper>
            Verifique seu email
          </S.CardTitle>
          <S.Description>
            <p>
              Enviamos um link de confirmação para <EmailHighlight>{email}</EmailHighlight>.
            </p>
            <p>Por favor, verifique sua caixa de entrada e clique no link para verificar sua conta.</p>
          </S.Description>
          <S.InfoText>
            Não recebeu o email? Verifique sua pasta de spam ou{' '}
            {isResendDisabled ? (
              <S.ResendLink disabled>Reenviar disponível em {timer}s</S.ResendLink>
            ) : (
              <S.ResendLink onClick={handleResendLink}>clique aqui para reenviar</S.ResendLink>
            )}
          </S.InfoText>
          <S.InfoText>
            Já tem uma conta? <S.Link to="/login">Entrar</S.Link>
          </S.InfoText>
        </S.Card>
      </S.RightColumn>
    </S.Container>
  )
}
