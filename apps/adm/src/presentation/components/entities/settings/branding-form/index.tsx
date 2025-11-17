import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ColorInput, FormInput, FormTextarea, Loading } from '@menuxp/ui'
import { CameraIcon, CheckIcon, SpinnerIcon, WarningIcon, XIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { CheckSlugAvailableUsecase } from '@/application/restaurants/check-slug-available.usecase'
import { UpdateRestaurantBasicInfoUsecase } from '@/application/restaurants/update-restaurant-basic-info.usecase'
import { UpdateRestaurantContactInfoUsecase } from '@/application/restaurants/update-restaurant-contact-info.usecase'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from './styles'

const brandingSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  slug: z
    .string()
    .min(1, 'Slug é obrigatório')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  email: z.string().email('Email inválido'),
  website: z.string().url('Website deve ser uma URL válida').optional().or(z.literal('')),
  instagram: z.string().url('Instagram deve ser uma URL válida').optional().or(z.literal('')),
  facebook: z.string().url('Facebook deve ser uma URL válida').optional().or(z.literal('')),
  whatsapp: z.string().min(1, 'WhatsApp é obrigatório'),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor primária deve ser uma cor HEX válida')
    .optional(),
  secondaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor secundária deve ser uma cor HEX válida')
    .optional()
})

type BrandingFormData = z.infer<typeof brandingSchema>

type SlugStatus = 'empty' | 'checking' | 'available' | 'unavailable' | 'invalid'

export const BrandingForm = () => {
  const { restaurant, refreshRestaurant } = useRestaurant()
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [slugStatus, setSlugStatus] = useState<SlugStatus>('empty')
  const [debouncedSlug, setDebouncedSlug] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<BrandingFormData>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      name: restaurant?.name ?? '',
      description: restaurant?.description ?? '',
      slug: restaurant?.slug ?? '',
      phone: restaurant?.contactInfo?.phone ?? '',
      email: restaurant?.contactInfo?.email ?? '',
      website: restaurant?.contactInfo?.website ?? '',
      instagram: restaurant?.contactInfo?.socialMedia?.instagram ?? '',
      facebook: restaurant?.contactInfo?.socialMedia?.facebook ?? '',
      whatsapp: restaurant?.contactInfo?.socialMedia?.whatsapp ?? '',
      primaryColor: restaurant?.style?.primaryColor ?? '#FF0000',
      secondaryColor: restaurant?.style?.secondaryColor ?? '#FFD700'
    }
  })

  const watchedSlug = watch('slug')
  const watchedPrimaryColor = watch('primaryColor')
  const watchedSecondaryColor = watch('secondaryColor')

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
      const result = await checkSlugUsecase.execute({ slug, restaurantId: restaurantId as string })
      setSlugStatus(result.available ? 'available' : 'unavailable')
    } catch (error) {
      console.error('Erro ao verificar slug:', error)
      setSlugStatus('invalid')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = async (data: BrandingFormData) => {
    if (!restaurantId) return

    setIsLoading(true)
    try {
      const updateBasicInfo = new UpdateRestaurantBasicInfoUsecase()
      await updateBasicInfo.execute({
        restaurantId,
        name: data.name,
        description: data.description,
        slug: data.slug,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        files: logoFile ? [logoFile] : undefined
      })
      const updateContactInfo = new UpdateRestaurantContactInfoUsecase()
      await updateContactInfo.execute({
        restaurantId,
        phone: data.phone,
        email: data.email,
        website: data.website ?? undefined,
        socialMedia: {
          instagram: data.instagram ?? undefined,
          facebook: data.facebook ?? undefined,
          whatsapp: data.whatsapp ?? undefined
        }
      })
      toast.success('Configurações de branding atualizadas com sucesso!')
      await refreshRestaurant()
    } catch (error) {
      toast.error('Erro ao atualizar configurações de branding')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  const formGroupVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)} variants={containerVariants} initial="hidden" animate="visible">
      <S.Section variants={sectionVariants}>
        <S.SectionTitle>Informações Básicas</S.SectionTitle>
        <S.SectionDescription>Configure o nome, descrição e identificador do seu restaurante</S.SectionDescription>
        <S.BasicInfoGrid>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="name"
              label="Nome do Restaurante"
              placeholder="Digite o nome do restaurante"
              error={errors.name?.message}
              required
              register={register('name')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormTextarea
              id="description"
              label="Descrição"
              placeholder="Descreva seu restaurante"
              error={errors.description?.message}
              required
              register={register('description')}
              rows={4}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="slug"
              label="Slug"
              placeholder="identificador-unico"
              error={errors.slug?.message}
              required
              register={register('slug', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleSlugChange(e.target.value)
              })}
            />
            <S.HelpText>URL amigável: menuxp.com/{watchedSlug || 'seu-restaurante'}</S.HelpText>
            {renderSlugStatus()}
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label>Logo do Restaurante</S.Label>
            <S.LogoContainer variants={logoVariants}>
              {(logoPreview || restaurant?.logo) && (
                <S.LogoPreview whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <S.LogoImage src={logoPreview || restaurant?.logo} alt="Logo do restaurante" />
                  <S.RemoveLogoButton type="button" onClick={removeLogo}>
                    <XIcon size={16} />
                  </S.RemoveLogoButton>
                </S.LogoPreview>
              )}
              <S.LogoUploadButton
                type="button"
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CameraIcon size={20} />
                <span>{logoPreview || restaurant?.logo ? 'Alterar Logo' : 'Adicionar Logo'}</span>
              </S.LogoUploadButton>
              <S.HiddenFileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoChange} />
            </S.LogoContainer>
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <S.Label>Cores do Restaurante</S.Label>
            <S.ColorsGrid>
              <ColorInput
                id="primaryColor"
                label="Cor Primária"
                value={watchedPrimaryColor}
                placeholder="#FF0000"
                error={errors.primaryColor?.message}
                onChange={(value) => setValue('primaryColor', value)}
              />
              <ColorInput
                id="secondaryColor"
                label="Cor Secundária"
                value={watchedSecondaryColor}
                placeholder="#FFD700"
                error={errors.secondaryColor?.message}
                onChange={(value) => setValue('secondaryColor', value)}
              />
            </S.ColorsGrid>
          </S.FormGroup>
        </S.BasicInfoGrid>
      </S.Section>
      <S.Section variants={sectionVariants}>
        <S.SectionTitle>Informações de Contato</S.SectionTitle>
        <S.SectionDescription>Configure como os clientes podem entrar em contato com você</S.SectionDescription>
        <S.FormGrid>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="phone"
              label="Telefone"
              placeholder="(11) 99999-9999"
              error={errors.phone?.message}
              required
              register={register('phone')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="contato@restaurante.com"
              error={errors.email?.message}
              required
              register={register('email')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="website"
              label="Website"
              placeholder="https://www.restaurante.com"
              error={errors.website?.message}
              register={register('website')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="whatsapp"
              label="WhatsApp"
              placeholder="(11) 99999-9999"
              error={errors.whatsapp?.message}
              required
              register={register('whatsapp')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="instagram"
              label="Instagram"
              placeholder="https://instagram.com/restaurante"
              error={errors.instagram?.message}
              register={register('instagram')}
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants}>
            <FormInput
              id="facebook"
              label="Facebook"
              placeholder="https://facebook.com/restaurante"
              error={errors.facebook?.message}
              register={register('facebook')}
            />
          </S.FormGroup>
        </S.FormGrid>
      </S.Section>
      <S.SubmitSection>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" disabled={isLoading} variant="primary" size="lg">
            {isLoading ? <Loading /> : 'Salvar Marca'}
          </Button>
        </motion.div>
      </S.SubmitSection>
    </S.FormContainer>
  )
}
