import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, SpinnerIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Input } from '@vbss-ui/input'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { CheckSlugAvailableUsecase } from '@/application/restaurants/check-slug-available.usecase'
import { CreateRestaurantUsecase } from '@/application/restaurants/create-restaurant.usecase'
import { FormTextarea } from '@/presentation/components/ui/form-textarea'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

const createRestaurantSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
    slug: z
      .string()
      .min(3, 'Slug deve ter pelo menos 3 caracteres')
      .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens')
  })
  .refine(
    async (data) => {
      if (!data.slug || data.slug.length < 3 || !/^[a-z0-9-]+$/.test(data.slug)) return true
      const checkSlugUsecase = new CheckSlugAvailableUsecase()
      const result = await checkSlugUsecase.execute({ slug: data.slug })
      return result.available
    },
    {
      message: 'Este slug já está em uso',
      path: ['slug']
    }
  )

type CreateRestaurantFormData = z.infer<typeof createRestaurantSchema>

type SlugStatus = 'empty' | 'checking' | 'available' | 'unavailable' | 'invalid'

// To-Do: Update Styles
export const CreateRestaurant = () => {
  const navigate = useNavigate()
  const { updateRestaurantId } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [slugStatus, setSlugStatus] = useState<SlugStatus>('empty')
  const [debouncedSlug, setDebouncedSlug] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateRestaurantFormData>({
    resolver: zodResolver(createRestaurantSchema),
    mode: 'onChange'
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const onSubmit = async (data: CreateRestaurantFormData) => {
    setError(null)
    const createRestaurantUsecase = new CreateRestaurantUsecase()
    try {
      const result = await createRestaurantUsecase.execute({
        name: data.name,
        description: data.description,
        slug: data.slug,
        files: selectedFile ? [selectedFile] : undefined
      })
      updateRestaurantId(result.id)
      toast.success('Restaurante criado com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ocorreu um erro')
      toast.error('Ocorreu um erro ao criar o restaurante. Por favor, tente novamente.')
    }
  }

  const transformSlug = (value: string): string => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const checkSlugAvailability = useCallback(async (slug: string) => {
    if (!slug || slug.length === 0) return setSlugStatus('empty')
    if (slug.length < 3) return setSlugStatus('invalid')
    setSlugStatus('checking')
    try {
      const checkSlugUsecase = new CheckSlugAvailableUsecase()
      const result = await checkSlugUsecase.execute({ slug })
      setSlugStatus(result.available ? 'available' : 'unavailable')
    } catch (error) {
      console.error('Erro ao verificar slug:', error)
      setSlugStatus('invalid')
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSlug) checkSlugAvailability(debouncedSlug)
    }, 500)
    return () => clearTimeout(timer)
  }, [debouncedSlug, checkSlugAvailability])

  const handleSlugChange = (slug: string) => {
    let transformedSlug = slug.toLowerCase()
    if (!/^[a-z0-9-]*$/.test(transformedSlug)) {
      transformedSlug = transformSlug(slug)
      setValue('slug', transformedSlug, { shouldValidate: true })
    } else {
      setValue('slug', transformedSlug, { shouldValidate: true })
    }
    setDebouncedSlug(transformedSlug)
  }

  const renderSlugStatus = () => {
    switch (slugStatus) {
      case 'empty':
        return null
      case 'checking':
        return (
          <S.StatusLabel $status="checking">
            <SpinnerIcon size={16} className="animate-spin" />
            Verificando disponibilidade...
          </S.StatusLabel>
        )
      case 'available':
        return (
          <S.StatusLabel $status="available">
            <CheckIcon size={16} />
            Slug disponível
          </S.StatusLabel>
        )
      case 'unavailable':
        return (
          <S.StatusLabel $status="unavailable">
            <WarningIcon size={16} />
            Slug já está em uso
          </S.StatusLabel>
        )
      case 'invalid':
        return (
          <S.StatusLabel $status="invalid">
            <WarningIcon size={16} />
            Formato inválido
          </S.StatusLabel>
        )
      default:
        return null
    }
  }

  const slugStatusElement = renderSlugStatus()

  return (
    <S.Container>
      <S.Card>
        <S.CardTitle>Criar Restaurante</S.CardTitle>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome do Restaurante *"
            type="text"
            error={errors.name?.message}
            placeholder="Digite o nome do seu restaurante"
            fontSize="sm"
            {...register('name')}
          />
          <FormTextarea
            id="description"
            label="Descrição"
            placeholder="Descreva seu restaurante"
            error={errors.description?.message}
            required
            register={register('description')}
          />
          <S.InputWrapper>
            <Input
              label="Slug (URL amigável) *"
              type="text"
              error={errors.slug?.message}
              placeholder="meu-restaurante"
              fontSize="sm"
              {...register('slug', {
                onChange: (e) => handleSlugChange(e.target.value)
              })}
            />
            {slugStatusElement && <S.StatusContainer>{slugStatusElement}</S.StatusContainer>}
          </S.InputWrapper>
          <S.FileLabel htmlFor="logo">
            {selectedFile ? selectedFile.name : 'Clique para selecionar o logo do restaurante'}
            <S.FileInput id="logo" type="file" accept="image/*" onChange={handleFileChange} />
          </S.FileLabel>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <Button type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? <Loading /> : 'Criar Restaurante'}
          </Button>
        </S.Form>
      </S.Card>
    </S.Container>
  )
}
