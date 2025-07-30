import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@vbss-ui/button'
import { Dialog } from '@vbss-ui/dialog'
import { Input } from '@vbss-ui/input'
import { Textarea } from '@vbss-ui/textarea'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { CreateCategoryUsecase } from '@/application/categories/create-category.usecase'
import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { UpdateCategoryUsecase } from '@/application/categories/update-category.usecase'
import type { Category } from '@/domain/models/category.model'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { Loading } from '@/presentation/components/ui/loading'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

const categorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  mainCategoryId: z.string().optional()
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category?: Category
  onSuccess: () => void
}

export const CategoryModal = ({ isOpen, onClose, category, onSuccess }: CategoryModalProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('')
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
          mainCategoryId: category.mainCategoryId || ''
        })
        setSelectedMainCategory(category.mainCategoryId || '')
      } else {
        reset({
          name: '',
          description: '',
          mainCategoryId: ''
        })
        setSelectedMainCategory('')
      }
    }
  }, [isOpen, category, reset])

  const handleMainCategoryChange = (value: string) => {
    setSelectedMainCategory(value)
    setValue('mainCategoryId', value)
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
          value: cat.id
        }))
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }
  }

  const onSubmit = async (data: CategoryFormData) => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const mainCategoryId = data.mainCategoryId || undefined
      if (isEditing) {
        const updateCategoryUsecase = new UpdateCategoryUsecase()
        await updateCategoryUsecase.execute({
          categoryId: category!.id,
          name: data.name,
          description: data.description,
          mainCategoryId
        })
        toast.success('Categoria atualizada com sucesso!')
      } else {
        const createCategoryUsecase = new CreateCategoryUsecase()
        await createCategoryUsecase.execute({
          name: data.name,
          description: data.description,
          restaurantId,
          mainCategoryId
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

  return (
    <Dialog
      title={isEditing ? 'Editar Categoria' : 'Nova Categoria'}
      description={isEditing ? 'Edite a categoria para atualizar as informações' : 'Crie uma nova categoria'}
      open={isOpen}
      onOpenChange={onClose}
      variant="outline"
      disableTextColor
      footer={
        <S.ModalFooter>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="button" variant="primary" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
            {getButtonText()}
          </Button>
        </S.ModalFooter>
      }
    >
      <S.Form>
        <S.FormGroup>
          <S.Label htmlFor="name">Nome *</S.Label>
          <Input
            id="name"
            placeholder="Digite o nome da categoria"
            error={errors.name?.message}
            fontSize="sm"
            {...register('name')}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="description">Descrição</S.Label>
          <Textarea
            id="description"
            placeholder="Digite uma descrição para a categoria"
            error={errors.description?.message}
            fontSize="sm"
            rows={3}
            {...register('description')}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Categoria Pai</S.Label>
          <Combobox
            placeholder="Selecione uma categoria pai (opcional)"
            value={selectedMainCategory}
            onChange={handleMainCategoryChange}
            onSearch={handleMainCategorySearch}
            disabled={isDisabled}
          />
          {isDisabled && (
            <span style={{ color: '#e57373', fontSize: 12, marginTop: 4 }}>
              Categorias com subcategorias não podem receber uma categoria pai.
            </span>
          )}
        </S.FormGroup>
      </S.Form>
    </Dialog>
  )
}
