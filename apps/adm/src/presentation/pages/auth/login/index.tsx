import { Button } from '@menuxp/ui'
import { FormInput } from '@/presentation/components/ui/form-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { LoginUsecase } from '@/application/auth/login.usecase'
import { ResentConfirmationEmailUsecase } from '@/application/auth/resent-confirmation-email.usecase'
import type { Login as LoginType } from '@/presentation/contexts/auth-context'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from '../styles'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'O E-mail é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória')
})

type LoginFormData = z.infer<typeof loginSchema>

export const Login = () => {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [pendingUser, setPendingUser] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getFieldState
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [navigate, user])

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
      if (!pendingUser) throw new Error()
      setIsResendDisabled(true)
      const resentConfirmationUsecase = new ResentConfirmationEmailUsecase()
      await resentConfirmationUsecase.execute({ email: pendingUser })
      toast.success('E-mail de confirmação reenviado com sucesso.')
      setTimer(60)
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro ao reenviar a confirmação. Por favor, tente novamente.')
      setIsResendDisabled(false)
      setTimer(0)
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    setPendingUser(null)
    try {
      setIsSubmitting(true)
      const loginUsecase = new LoginUsecase()
      const response = await loginUsecase.execute(data)
      if (response?.pendingUser) {
        setPendingUser(response.pendingUser)
        return
      }
      login(response as LoginType)
      navigate('/dashboard')
    } catch {
      toast.error('Nome de usuário ou senha inválidos')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <S.Container>
      <S.LeftColumn>
        <S.Title>
          <span style={{ color: '#FEBB11' }}>Boas-vindas</span> de volta
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
            <S.CardTitle>Entrar</S.CardTitle>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                id="email"
                label="E-mail"
                type="email"
                error={errors.email?.message}
                placeholder="Digite seu E-mail"
                fontSize="sm"
                required
                status={
                  getFieldState('email').invalid ? 'error' : getFieldState('email').isTouched ? 'success' : 'idle'
                }
                register={register('email', {
                  onBlur: async () => {
                    await trigger('email')
                  }
                })}
              />
              <FormInput
                id="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                error={errors.password?.message}
                placeholder="Digite sua senha"
                fontSize="sm"
                required
                rightAdornment={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                  </button>
                }
                register={register('password')}
              />
              {pendingUser ? (
                <S.InfoText>
                  Por favor, confirme seu e-mail primeiro.{' '}
                  {isResendDisabled ? (
                    <S.ResendLink disabled aria-label={`Reenviar disponível em ${timer} segundos`}>
                      Reenviar disponível em {timer}s
                    </S.ResendLink>
                  ) : (
                    <S.ResendLink
                      onClick={handleResendLink}
                      aria-label="Clique aqui para reenviar confirmação de e-mail"
                    >
                      clique aqui para reenviar
                    </S.ResendLink>
                  )}
                </S.InfoText>
              ) : (
                <S.ForgotPasswordContainer>
                  <S.Link to="/forgot-password" aria-label="Esqueceu a senha? Clique para redefinir">
                    Esqueceu a senha?
                  </S.Link>
                </S.ForgotPasswordContainer>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="lg"
                loading={isSubmitting}
                loadingText="Entrando..."
              >
                Entrar
              </Button>
            </S.Form>
            <S.InfoText>
              Não tem uma conta?{' '}
              <S.Link to="/register" aria-label="Não tem uma conta? Clique para se cadastrar">
                Cadastre-se
              </S.Link>
            </S.InfoText>
          </S.Card>
        </S.ContentWrapper>
      </S.RightColumn>
    </S.Container>
  )
}
