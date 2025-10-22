import { CreateCategoryUsecase } from '@/application/categories/create-category.usecase'
import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { UpdateCategoryUsecase } from '@/application/categories/update-category.usecase'
import type { Category } from '@/domain/models/category.model'
import { useAuth } from '@/presentation/hooks/use-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Combobox,
  Dialog,
  FormInput,
  FormTextarea,
  IconSelector,
  Loading,
  OptionalsSection,
  type ComboboxOption,
  type MenuItemOptional,
  ICONS,
  ICONS_KEYS
} from '@menuxp/ui'
import { TrashIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import * as S from './styles'

const categorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  mainCategoryId: z.string().optional(),
  icon: z.string().optional(),
  optionals: z.any().optional()
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category?: Category
  parentCategoryId?: string
  onSuccess: () => void
}

export const CategoryModal = ({ isOpen, onClose, category, parentCategoryId, onSuccess }: CategoryModalProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('')
  const [selectedIcon, setSelectedIcon] = useState<string>('')
  const [optionals, setOptionals] = useState<MenuItemOptional[]>([])
  const isEditing = !!category

  const nameMax = 60
  const descriptionMax = 180
  const [nameCount, setNameCount] = useState(0)
  const [descriptionCount, setDescriptionCount] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      mainCategoryId: ''
    }
  })

  useEffect(() => {
    if (isOpen) {
      if (category) {
        reset({
          name: category.name,
          description: category.description || '',
          mainCategoryId: category.mainCategoryId || '',
          icon: category.icon || ''
        })
        setSelectedMainCategory(category.mainCategoryId || '')
        setSelectedIcon(category.icon || '')
        setOptionals(category.optionals || [])
      } else {
        reset({
          name: '',
          description: '',
          mainCategoryId: parentCategoryId || '',
          icon: ''
        })
        setSelectedMainCategory(parentCategoryId || '')
        setSelectedIcon('')
        setOptionals([])
      }
    }
  }, [isOpen, category, parentCategoryId, reset])

  // Atualiza contadores de caracteres em tempo real
  useEffect(() => {
    const subscription = watch((values) => {
      setNameCount(values.name ? values.name.length : 0)
      setDescriptionCount(values.description ? values.description.length : 0)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const handleMainCategoryChange = (value: string) => {
    setSelectedMainCategory(value)
    setValue('mainCategoryId', value)
  }

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
    setValue('icon', icon)
  }

  const handleMainCategorySearch = async (searchTerm: string): Promise<ComboboxOption[]> => {
    try {
      const getCategoriesNamesUsecase = new GetCategoriesNamesUsecase()
      const categoriesData = await getCategoriesNamesUsecase.execute({
        restaurantId: restaurantId!,
        searchMask: searchTerm,
        removeSubCategories: true
      })

      return categoriesData
        .filter((cat) => cat.id !== category?.id)
        .map((cat) => ({
          label: cat.name,
          value: cat.id,
          icon: cat.icon
        }))
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }
  }

  const validateOptionals = (): string | null => {
    for (let i = 0; i < optionals.length; i++) {
      const optional = optionals[i]
      if (!optional.name.trim()) {
        return `Nome do opcional ${i + 1} é obrigatório`
      }
      if (typeof optional.price !== 'number' || optional.price < 0) {
        return `Preço do opcional "${optional.name}" deve ser maior ou igual a 0`
      }
      if (
        optional.maxQuantity !== undefined &&
        (typeof optional.maxQuantity !== 'number' || optional.maxQuantity < 0)
      ) {
        return `Quantidade máxima do opcional "${optional.name}" deve ser maior ou igual a 0`
      }
    }
    return null
  }

  const onSubmit = async (data: CategoryFormData) => {
    if (!restaurantId) return
    const optionalsError = validateOptionals()
    if (optionalsError) {
      toast.error(optionalsError)
      return
    }
    setIsLoading(true)
    try {
      const mainCategoryId = data.mainCategoryId || undefined
      const icon = data.icon || undefined
      if (isEditing) {
        const updateCategoryUsecase = new UpdateCategoryUsecase()
        await updateCategoryUsecase.execute({
          categoryId: category!.id,
          name: data.name,
          description: data.description,
          mainCategoryId,
          icon,
          optionals: optionals.length > 0 ? optionals : undefined
        })
        toast.success('Categoria atualizada com sucesso!')
      } else {
        const createCategoryUsecase = new CreateCategoryUsecase()
        await createCategoryUsecase.execute({
          name: data.name,
          description: data.description,
          restaurantId,
          mainCategoryId,
          icon,
          optionals: optionals.length > 0 ? optionals : undefined
        })
        toast.success('Categoria criada com sucesso!')
      }
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} categoria`)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonText = () => {
    if (isLoading) return <Loading />
    return isEditing ? 'Atualizar e publicar' : 'Salvar e publicar'
  }

  const isDisabled = Array.isArray(category?.subCategories) && category.subCategories.length > 0

  return (
    <Dialog
      title={isEditing ? 'Editar Categoria' : 'Nova Categoria'}
      description={isEditing ? 'Edite a categoria para atualizar as informações' : 'Crie uma nova categoria'}
      open={isOpen}
      onOpenChange={onClose}
    >
      <S.CancelButtonStyles>
        <S.GlobalTextareaStyles>
          <S.ModalContent>
            <S.Form>
              <S.FormGroup
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                initial="hidden"
                animate="visible"
              >
                <FormInput
                  id="name"
                  label="Nome"
                  placeholder="Ex.: Bebidas, Lanches, Sobremesas"
                  error={errors.name?.message}
                  required
                  register={register('name', { maxLength: nameMax })}
                  fontSize="sm"
                  maxLength={nameMax}
                />
                <S.FieldHint aria-live="polite">
                  {Math.min(nameCount, nameMax)}/{nameMax}
                </S.FieldHint>
              </S.FormGroup>
              <S.FormGroup
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                initial="hidden"
                animate="visible"
              >
                <FormTextarea
                  id="description"
                  label="Descrição"
                  placeholder="Ex.: Refrigerantes, sucos naturais e bebidas geladas"
                  error={errors.description?.message}
                  register={register('description', { maxLength: descriptionMax })}
                  rows={3}
                />
                <S.FieldHint aria-live="polite">
                  {Math.min(descriptionCount, descriptionMax)}/{descriptionMax}
                </S.FieldHint>
              </S.FormGroup>
              <S.FormGroup
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                initial="hidden"
                animate="visible"
              >
                <S.Label>Categoria Pai</S.Label>
                <Combobox
                  placeholder="Selecione uma categoria pai (opcional)"
                  value={selectedMainCategory}
                  onChange={handleMainCategoryChange}
                  onSearch={handleMainCategorySearch}
                  disabled={isDisabled}
                />
                {isDisabled && (
                  <S.WarningText>Categorias com subcategorias não podem receber uma categoria pai.</S.WarningText>
                )}
              </S.FormGroup>
              <S.FormGroup
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                initial="hidden"
                animate="visible"
              >
                <S.IconSelectorHeader>
                  <S.Label>Ícone</S.Label>
                  <S.IconSelectorSubtitle>
                    Escolha um ícone para representar visualmente esta categoria no menu.
                  </S.IconSelectorSubtitle>
                  {!selectedIcon && (
                    <S.ChipsContainer>
                      <S.Chip>🍔 Hambúrgueres</S.Chip>
                      <S.Chip>🍕 Pizzas</S.Chip>
                      <S.Chip>🥤 Bebidas</S.Chip>
                    </S.ChipsContainer>
                  )}
                </S.IconSelectorHeader>
                {selectedIcon && (
                  <S.IconPreviewCard>
                    <S.IconPreviewWrapper>
                      {(() => {
                        const iconName = ICONS_KEYS[selectedIcon]
                        const IconComponent = iconName ? ICONS[iconName as keyof typeof ICONS] : null
                        return IconComponent ? <IconComponent size={32} /> : null
                      })()}
                    </S.IconPreviewWrapper>
                    <S.IconPreviewInfo>
                      <S.IconPreviewName>Ícone selecionado</S.IconPreviewName>
                      <S.IconPreviewKey>{selectedIcon}</S.IconPreviewKey>
                    </S.IconPreviewInfo>
                    <S.IconRemoveButton
                      type="button"
                      onClick={() => handleIconSelect('')}
                      disabled={isLoading}
                      title="Remover ícone"
                    >
                      <TrashIcon size={16} />
                    </S.IconRemoveButton>
                  </S.IconPreviewCard>
                )}
                {!selectedIcon && (
                  <S.IconSelectorButtonContainer>
                    <IconSelector
                      selectedIcon={selectedIcon}
                      onIconSelect={handleIconSelect}
                      placeholder="Selecionar Ícone"
                      variant="white"
                    />
                  </S.IconSelectorButtonContainer>
                )}
              </S.FormGroup>
              <S.FormGroup
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                initial="hidden"
                animate="visible"
              >
                <OptionalsSection optionals={optionals} setOptionals={setOptionals} disabled={isLoading} />
              </S.FormGroup>
              <S.ModalFooter>
                <S.TertiaryActionButton>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="cancel-button"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                </S.TertiaryActionButton>

                <S.SecondaryActionButton>
                  <Button type="button" variant="white" size="sm" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                    Salvar rascunho
                  </Button>
                </S.SecondaryActionButton>

                <S.PrimaryActionButton>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      disabled={isLoading}
                      onClick={handleSubmit(onSubmit)}
                    >
                      {getButtonText()}
                    </Button>
                  </motion.div>
                </S.PrimaryActionButton>
              </S.ModalFooter>
            </S.Form>
          </S.ModalContent>
        </S.GlobalTextareaStyles>
      </S.CancelButtonStyles>
    </Dialog>
  )
}
