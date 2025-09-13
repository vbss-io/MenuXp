import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/presentation/components/ui/button'
import { FormInput } from '@/presentation/components/ui/form-input'
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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
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
      await resentConfirmationUsecase.execute({ username: pendingUser })
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
        <S.Title>Bem-vindo de volta</S.Title>
        <S.Divider />
        <S.Subtitle>Entre na sua conta</S.Subtitle>
        <S.Text>Digite suas credenciais para acessar sua conta.</S.Text>
      </S.LeftColumn>
      <S.RightColumn>
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
              register={register('email')}
            />
            <FormInput
              id="password"
              label="Senha"
              type="password"
              error={errors.password?.message}
              placeholder="Digite sua senha"
              fontSize="sm"
              required
              register={register('password')}
            />
            {pendingUser ? (
              <S.InfoText>
                Por favor, confirme seu e-mail primeiro.{' '}
                {isResendDisabled ? (
                  <S.ResendLink disabled>Reenviar disponível em {timer}s</S.ResendLink>
                ) : (
                  <S.ResendLink onClick={handleResendLink}>clique aqui para reenviar</S.ResendLink>
                )}
              </S.InfoText>
            ) : (
              <S.ForgotPasswordContainer>
                <S.Link to="/forgot-password">Esqueceu a senha?</S.Link>
              </S.ForgotPasswordContainer>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              loading={isSubmitting}
              loadingText="Entrando..."
            >
              Entrar
            </Button>
          </S.Form>
          <S.InfoText>
            Não tem uma conta? <S.Link to="/register">Cadastre-se</S.Link>
          </S.InfoText>
        </S.Card>
      </S.RightColumn>
    </S.Container>
  )
}
