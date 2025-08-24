import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@vbss-ui/button'
import { Checkbox } from '@vbss-ui/checkbox'
import { Input } from '@vbss-ui/input'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { z } from 'zod'

import { RegisterUsecase } from '@/application/auth/register.usecase'
import { Loading } from '@/presentation/@to-do/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from '../styles'

const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const registerSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Você deve aceitar os termos e condições'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

type RegisterFormData = z.infer<typeof registerSchema>

export const Register = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false
    }
  })

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [navigate, user])

  const onSubmit = async (data: RegisterFormData) => {
    setError(null)
    const registerUsecase = new RegisterUsecase()
    try {
      await registerUsecase.execute({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirmPassword
      })
      navigate('/pending-register', { state: { email: data.email } })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ocorreu um erro')
      toast.error('Ocorreu um erro ao criar sua conta. Por favor, tente novamente.')
    }
  }

  return (
    <S.Container>
      <S.LeftColumn>
        <S.Title>Criar Conta</S.Title>
        <S.Divider />
        <S.Subtitle>Junte-se a nós hoje</S.Subtitle>
        <S.Text>Cadastre-se para acessar todos os recursos.</S.Text>
      </S.LeftColumn>
      <S.RightColumn>
        <S.Card>
          <S.CardTitle>Cadastre-se</S.CardTitle>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nome"
              type="text"
              error={errors.name?.message}
              placeholder="Escolha um nome de usuário"
              fontSize="sm"
              {...register('name')}
            />
            <Input
              label="E-mail"
              type="text"
              error={errors.email?.message}
              placeholder="Digite seu e-mail"
              fontSize="sm"
              {...register('email')}
            />
            <Input
              label="Senha"
              type="password"
              showPasswordSwitch
              error={errors.password?.message}
              placeholder="Crie uma senha"
              fontSize="sm"
              {...register('password')}
            />
            <Input
              label="Confirmar Senha"
              type="password"
              showPasswordSwitch
              error={errors.confirmPassword?.message}
              placeholder="Confirme sua senha"
              fontSize="sm"
              {...register('confirmPassword')}
            />
            <TermsContainer>
              <Checkbox
                label={
                  (
                    <>
                      Eu aceito os&nbsp;
                      <S.Link to="/terms" target="_blank">
                        termos e condições
                      </S.Link>
                    </> // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ) as any
                }
                fontSize="sm"
                onCheckedChange={(checked) => {
                  const acceptTerms = checked ? true : false
                  setValue('acceptTerms', acceptTerms)
                }}
              />
              {errors.acceptTerms && <S.ErrorMessage>{errors.acceptTerms.message}</S.ErrorMessage>}
            </TermsContainer>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            <Button type="submit" disabled={isSubmitting} variant="primary">
              {isSubmitting ? <Loading /> : 'Criar Conta'}
            </Button>
          </S.Form>
          <S.InfoText>
            Já tem uma conta? <S.Link to="/login">Entrar</S.Link>
          </S.InfoText>
        </S.Card>
      </S.RightColumn>
    </S.Container>
  )
}
