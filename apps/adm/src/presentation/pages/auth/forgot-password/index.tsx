import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormInput } from '@menuxp/ui'
import { EnvelopeSimpleOpenIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { ForgotPasswordUsecase } from '@/application/auth/forgot-password.usecase'

import * as S from '../styles'

const forgotSchema = z.object({
  email: z.string().email('E-mail inválido')
})

type ForgotFormData = z.infer<typeof forgotSchema>

export const ForgotPassword = () => {
  const [timer, setTimer] = useState(0)
  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema)
  })

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

  const onSubmit = async (data: ForgotFormData) => {
    try {
      const forgotPasswordUsecase = new ForgotPasswordUsecase()
      await forgotPasswordUsecase.execute(data)
      toast.success('Link de redefinição de senha enviado para seu e-mail.')
      setIsSuccess(true)
      setTimer(60)
      setIsResendDisabled(true)
    } catch (error) {
      console.error(error)
      toast.error('Falha ao enviar o link de redefinição. Por favor, tente novamente.')
      setIsResendDisabled(false)
      setTimer(0)
    }
  }

  return (
    <S.Container>
      <S.LeftColumn>
        <S.Title>
          Esqueceu a <span style={{ color: '#FEBB11' }}>Senha</span>
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
                <EnvelopeSimpleOpenIcon size={48} weight="duotone" />
              </S.IconWrapper>
              Redefina sua senha
            </S.CardTitle>
            {isSuccess ? (
              <S.Description>
                <p>Enviamos um link de redefinição de senha para seu e-mail.</p>
                <p>Por favor, verifique sua caixa de entrada e pasta de spam para redefinir sua senha.</p>
                <S.InfoText>
                  Não recebeu o e-mail?{' '}
                  {isResendDisabled ? (
                    <S.ResendLink disabled aria-label={`Reenviar disponível em ${timer} segundos`}>
                      Reenviar disponível em {timer}s
                    </S.ResendLink>
                  ) : (
                    <S.ResendLink
                      onClick={handleSubmit(onSubmit)}
                      aria-label="Clique aqui para reenviar link de redefinição de senha"
                    >
                      clique aqui para reenviar
                    </S.ResendLink>
                  )}
                </S.InfoText>
              </S.Description>
            ) : (
              <S.Form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  id="email"
                  label="E-mail"
                  type="email"
                  error={errors.email?.message}
                  placeholder="Digite seu E-mail"
                  fontSize="sm"
                  required
                  register={register('email')}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || isResendDisabled}
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  loadingText="Enviando..."
                >
                  {(() => {
                    if (isResendDisabled) return `Reenviar disponível em ${timer}s`
                    return 'Enviar Link'
                  })()}
                </Button>
              </S.Form>
            )}
            <S.InfoText>
              <S.Link to="/login" aria-label="Voltar para a página de login">
                Voltar para o login
              </S.Link>
            </S.InfoText>
          </S.Card>
        </S.ContentWrapper>
      </S.RightColumn>
    </S.Container>
  )
}
