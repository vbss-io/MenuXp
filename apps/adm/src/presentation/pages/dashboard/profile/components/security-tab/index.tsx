import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { UpdatePasswordUsecase } from '@/application/users/update-password.usecase'
import { Button } from '@/presentation/components/ui/button'

import * as S from './styles'

const passwordSchema = z
  .object({
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    passwordConfirm: z.string().min(6, 'A confirmação de senha deve ter no mínimo 6 caracteres')
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm']
  })

type PasswordFormData = z.infer<typeof passwordSchema>

export const SecurityTab = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: ''
    }
  })

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true)
    try {
      const updatePasswordUsecase = new UpdatePasswordUsecase()
      await updatePasswordUsecase.execute({
        password: data.password,
        passwordConfirm: data.passwordConfirm
      })
      toast.success('Senha alterada com sucesso!')
      reset()
    } catch (error) {
      console.error('Erro ao alterar senha:', error)
      toast.error('Erro ao alterar senha')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Alterar Senha</S.SectionTitle>
          <S.Description>
            Crie uma senha forte com no mínimo 6 caracteres. Recomendamos usar letras maiúsculas, minúsculas, números e
            caracteres especiais.
          </S.Description>
          <S.FormGroup>
            <S.InputWrapper>
              <S.Label htmlFor="password">NOVA SENHA *</S.Label>
              <S.PasswordInputWrapper>
                <S.Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua nova senha"
                  {...register('password')}
                />
                <S.PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                </S.PasswordToggle>
              </S.PasswordInputWrapper>
              {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}
            </S.InputWrapper>
          </S.FormGroup>
          <S.FormGroup>
            <S.InputWrapper>
              <S.Label htmlFor="passwordConfirm">CONFIRMAR NOVA SENHA *</S.Label>
              <S.PasswordInputWrapper>
                <S.Input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  placeholder="Confirme sua nova senha"
                  {...register('passwordConfirm')}
                />
                <S.PasswordToggle
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  aria-label={showPasswordConfirm ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPasswordConfirm ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                </S.PasswordToggle>
              </S.PasswordInputWrapper>
              {errors.passwordConfirm && <S.ErrorMessage>{errors.passwordConfirm.message}</S.ErrorMessage>}
            </S.InputWrapper>
          </S.FormGroup>
        </S.Section>
        <S.Actions>
          <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
            Alterar Senha
          </Button>
        </S.Actions>
      </S.Form>
    </S.Container>
  )
}
