import { zodResolver } from '@hookform/resolvers/zod'
import { CameraIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { UpdateUserProfileUsecase } from '@/application/users/update-user-profile.usecase'
import { Button } from '@menuxp/ui'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório')
})

type ProfileFormData = z.infer<typeof profileSchema>

export const GeneralInfoTab = () => {
  const { user, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: ''
    }
  })

  useEffect(() => {
    if (user?.name) {
      setValue('name', user.name)
    }
  }, [user, setValue])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('A imagem deve ter no máximo 5MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        toast.error('O arquivo deve ser uma imagem')
        return
      }
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      const updateProfileUsecase = new UpdateUserProfileUsecase()
      const result = await updateProfileUsecase.execute({
        name: data.name,
        files: avatarFile ? [avatarFile] : undefined
      })
      updateProfile({
        name: result.name ?? data.name,
        avatar: result.avatar
      })
      toast.success('Perfil atualizado com sucesso!')
      setAvatarFile(null)
      setAvatarPreview(null)
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      toast.error('Erro ao atualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  const currentAvatar = avatarPreview || user?.avatar

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Foto de Perfil</S.SectionTitle>
          <S.AvatarSection>
            <S.AvatarPreview $hasImage={!!currentAvatar}>
              {currentAvatar ? (
                <img src={currentAvatar} alt="Avatar" />
              ) : (
                <span>{user?.name?.charAt(0).toUpperCase() ?? 'U'}</span>
              )}
            </S.AvatarPreview>
            <S.AvatarActions>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<CameraIcon size={16} />}
                onClick={() => fileInputRef.current?.click()}
              >
                Alterar Foto
              </Button>
              <S.AvatarHint>JPG, PNG ou GIF. Máximo 5MB.</S.AvatarHint>
            </S.AvatarActions>
          </S.AvatarSection>
        </S.Section>
        <S.Section>
          <S.SectionTitle>Informações Básicas</S.SectionTitle>
          <S.FormGroup>
            <S.InputWrapper>
              <S.Label htmlFor="name">NOME *</S.Label>
              <S.Input id="name" type="text" placeholder="Seu nome completo" {...register('name')} />
              {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}
            </S.InputWrapper>
          </S.FormGroup>
          <S.FormGroup>
            <S.InputWrapper>
              <S.Label htmlFor="email">EMAIL</S.Label>
              <S.Input id="email" type="email" value={user?.email ?? ''} disabled readOnly />
              <S.FieldHint>O email não pode ser alterado</S.FieldHint>
            </S.InputWrapper>
          </S.FormGroup>
        </S.Section>
        <S.Actions>
          <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
            Salvar Alterações
          </Button>
        </S.Actions>
      </S.Form>
    </S.Container>
  )
}
