import { ClockIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

import { ResentConfirmationEmailUsecase } from '@/application/auth/resent-confirmation-email.usecase'

import * as S from '../styles'

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
        <S.Title>
          Registro <span style={{ color: '#FEBB11' }}>Pendente</span>
        </S.Title>
        <img 
          src="/images/img-tela-login.svg" 
          alt="Food Service Gamificado" 
          style={{ 
            width: '100%', 
            maxWidth: '300px', 
            margin: '16px 0',
            height: 'auto'
          }} 
        />
        <S.Text>#1 Food Service Gamificado do Brasil</S.Text>
      </S.LeftColumn>
      <S.RightColumn>
        <S.ContentWrapper>
          <S.LoginLogo>
            <img src="/images/menuxp-logo.svg" alt="MenuXP" />
          </S.LoginLogo>
          <S.Card>
            <S.CardTitle>
              <S.IconWrapper>
                <ClockIcon size={48} weight="duotone" />
              </S.IconWrapper>
              Verifique seu email
            </S.CardTitle>
          <S.Description>
            <p>
              Enviamos um link de confirmação para <S.EmailHighlight>{email}</S.EmailHighlight>.
            </p>
            <p>Por favor, verifique sua caixa de entrada e clique no link para verificar sua conta.</p>
          </S.Description>
          <S.InfoText>
            Não recebeu o email? Verifique sua pasta de spam ou{' '}
            {isResendDisabled ? (
              <S.ResendLink disabled aria-label={`Reenviar disponível em ${timer} segundos`}>Reenviar disponível em {timer}s</S.ResendLink>
            ) : (
              <S.ResendLink onClick={handleResendLink} aria-label="Clique aqui para reenviar confirmação de e-mail">clique aqui para reenviar</S.ResendLink>
            )}
          </S.InfoText>
          <S.InfoText>
            Já tem uma conta? <S.Link to="/login" aria-label="Já tem uma conta? Clique para entrar">Entrar</S.Link>
          </S.InfoText>
          </S.Card>
        </S.ContentWrapper>
      </S.RightColumn>
    </S.Container>
  )
}
