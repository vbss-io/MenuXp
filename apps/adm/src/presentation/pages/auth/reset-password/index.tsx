import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyIcon } from '@phosphor-icons/react'
import { Button } from '@menuxp/ui'
import { FormInput } from '@/presentation/components/ui/form-input'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { ResetPasswordUsecase } from '@/application/auth/reset-password.usecase'

import * as S from '../styles'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
    passwordConfirm: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm']
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')
  const hasAttemptedVerification = useRef(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  useEffect(() => {
    const verifyToken = async () => {
      if (hasAttemptedVerification.current) return
      hasAttemptedVerification.current = true
      if (!token) {
        toast.error('Link de redefinição inválido')
        navigate('/login')
        return
      }
    }
    verifyToken()
  }, [token, navigate])

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const resetPasswordUsecase = new ResetPasswordUsecase()
      await resetPasswordUsecase.execute({ token: token as string, ...data })
      toast.success('Senha redefinida com sucesso')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      console.error(error)
      toast.error('Falha ao redefinir a senha. Por favor, tente novamente.')
    }
  }

  return (
    <S.Container>
      <S.LeftColumn>
        <S.Title>
          Redefinir <span style={{ color: '#FEBB11' }}>Senha</span>
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
                <LockKeyIcon size={48} weight="duotone" />
              </S.IconWrapper>
              Redefina sua senha
            </S.CardTitle>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="password"
              label="Nova Senha"
              type="password"
              error={errors.password?.message}
              placeholder="Digite sua senha"
              fontSize="sm"
              required
              register={register('password')}
            />
            <FormInput
              id="passwordConfirm"
              label="Confirmar Senha"
              type="password"
              error={errors.passwordConfirm?.message}
              placeholder="Confirme sua senha"
              fontSize="sm"
              required
              register={register('passwordConfirm')}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              size="lg"
              loading={isSubmitting}
              loadingText="Redefinindo senha..."
            >
              Redefinir Senha
            </Button>
          </S.Form>
          <S.InfoText>
            <S.Link to="/login" aria-label="Voltar para a página de login">Voltar para o login</S.Link>
          </S.InfoText>
          </S.Card>
        </S.ContentWrapper>
      </S.RightColumn>
    </S.Container>
  )
}
