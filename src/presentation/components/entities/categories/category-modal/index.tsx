import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { CreateCategoryUsecase } from '@/application/categories/create-category.usecase'
import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { UpdateCategoryUsecase } from '@/application/categories/update-category.usecase'
import type { Category } from '@/domain/models/category.model'
import { Button } from '@/presentation/components/ui/button'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { Dialog } from '@/presentation/components/ui/dialog'
import { FormInput } from '@/presentation/components/ui/form-input'
import { FormTextarea } from '@/presentation/components/ui/form-textarea'
import { IconSelector } from '@/presentation/components/ui/icon-selector'
import { Loading } from '@/presentation/components/ui/loading'
import { OptionalsSection, type MenuItemOptional } from '@/presentation/components/ui/optionals'
import { useAuth } from '@/presentation/hooks/use-auth'

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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
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
    return isEditing ? 'Atualizar' : 'Criar'
  }

  const isDisabled = Array.isArray(category?.subCategories) && category.subCategories.length > 0

  const formGroupVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <Dialog
      title={isEditing ? 'Editar Categoria' : 'Nova Categoria'}
      description={isEditing ? 'Edite a categoria para atualizar as informações' : 'Crie uma nova categoria'}
      open={isOpen}
      onOpenChange={onClose}
    >
      <S.Form>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <FormInput
            id="name"
            label="Nome"
            placeholder="Digite o nome da categoria"
            error={errors.name?.message}
            required
            register={register('name')}
            fontSize="sm"
          />
        </S.FormGroup>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <S.Label>Ícone</S.Label>
          <IconSelector
            selectedIcon={selectedIcon}
            onIconSelect={handleIconSelect}
            placeholder="Selecionar ícone (opcional)"
          />
        </S.FormGroup>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <FormTextarea
            id="description"
            label="Descrição"
            placeholder="Digite uma descrição para a categoria"
            error={errors.description?.message}
            register={register('description')}
            rows={3}
          />
        </S.FormGroup>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
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
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <OptionalsSection optionals={optionals} setOptionals={setOptionals} disabled={isLoading} />
        </S.FormGroup>
        <S.ModalFooter>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="button" variant="primary" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
              {getButtonText()}
            </Button>
          </motion.div>
        </S.ModalFooter>
      </S.Form>
    </Dialog>
  )
}
