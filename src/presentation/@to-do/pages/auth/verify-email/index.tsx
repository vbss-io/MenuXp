import { CheckCircleIcon } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { VerifyEmailUsecase } from '@/application/auth/verify-email.usecase'
import { Loading } from '@/presentation/components/ui/loading'

import * as S from '../styles'

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')
  const hasAttemptedVerification = useRef(false)

  useEffect(() => {
    const verifyEmail = async () => {
      if (hasAttemptedVerification.current) return
      hasAttemptedVerification.current = true
      if (!token) {
        toast.error('Link de verificação inválido')
        navigate('/login')
        return
      }
      try {
        const verifyEmailUsecase = new VerifyEmailUsecase()
        await verifyEmailUsecase.execute({ token })
        toast.success('Email verificado com sucesso')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } catch (error) {
        console.error(error)
        toast.error('Falha ao verificar o email. Por favor, tente novamente.')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    }
    verifyEmail()
  }, [token, navigate])

  return (
    <S.Container>
      <S.LeftColumn>
        <S.Title>Verificação de Email</S.Title>
        <S.Divider />
        <S.Subtitle>Quase lá!</S.Subtitle>
        <S.Text>Estamos verificando seu endereço de email.</S.Text>
      </S.LeftColumn>
      <S.RightColumn>
        <S.Card>
          <S.CardTitle>
            <S.IconWrapper>
              <CheckCircleIcon size={48} weight="duotone" />
            </S.IconWrapper>
            Verificando seu email
          </S.CardTitle>
          <S.Description>
            <p>Por favor, aguarde enquanto verificamos seu endereço de email...</p>
            <S.LoadingWrapper>
              <Loading />
            </S.LoadingWrapper>
          </S.Description>
          <S.InfoText>Você será redirecionado para a página de login automaticamente.</S.InfoText>
        </S.Card>
      </S.RightColumn>
    </S.Container>
  )
}
