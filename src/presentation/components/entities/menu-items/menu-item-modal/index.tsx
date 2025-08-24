import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { CreateMenuItemUsecase } from '@/application/menu-items/create-menu-item.usecase'
import { UpdateMenuItemUsecase } from '@/application/menu-items/update-menu-item.usecase'
import type { MenuItem } from '@/domain/models/menu-item.model'
import { Loading } from '@/presentation/@to-do/components/ui/loading'
import { MultipleImageUploader } from '@/presentation/@to-do/components/ui/multiple-image-uploader'
import { Button } from '@/presentation/components/ui/button'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { Dialog } from '@/presentation/components/ui/dialog'
import { FormInput } from '@/presentation/components/ui/form-input'
import { FormTextarea } from '@/presentation/components/ui/form-textarea'
import { OptionalsSection, type MenuItemOptional } from '@/presentation/components/ui/optionals'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

const menuItemSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  price: z.coerce
    .number({
      invalid_type_error: 'Preço deve ser um número',
      required_error: 'Preço é obrigatório'
    })
    .min(0, 'Preço deve ser maior ou igual a 0'),
  stock: z.coerce
    .number({
      invalid_type_error: 'Estoque deve ser um número',
      required_error: 'Estoque é obrigatório'
    })
    .min(0, 'Estoque deve ser maior ou igual a 0'),
  discount: z.coerce.number().min(0).max(100),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  medias: z.any().optional(),
  useCategoryOptionals: z.boolean()
})

type MenuItemFormData = z.infer<typeof menuItemSchema>

interface MenuItemModalProps {
  isOpen: boolean
  onClose: () => void
  menuItem?: MenuItem
  onSuccess: () => void
}

export const MenuItemModal = ({ isOpen, onClose, menuItem, onSuccess }: MenuItemModalProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [removedMedias, setRemovedMedias] = useState<string[]>([])
  const [optionals, setOptionals] = useState<MenuItemOptional[]>([])
  const [useCategoryOptionals, setUseCategoryOptionals] = useState(false)
  const isEditing = !!menuItem
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      description: '',
      discount: 0,
      categoryId: '',
      medias: undefined,
      useCategoryOptionals: false
    }
  })

  useEffect(() => {
    if (isOpen) {
      if (menuItem) {
        reset({
          name: menuItem.name,
          description: menuItem.description || '',
          price: menuItem.price,
          stock: menuItem.stock,
          discount: menuItem.discount,
          categoryId: menuItem.categoryId,
          medias: menuItem.medias,
          useCategoryOptionals: menuItem.useCategoryOptionals || false
        })
        setSelectedCategory(menuItem.categoryId)
        setRemovedMedias([])
        setOptionals(menuItem.optionals || [])
        setUseCategoryOptionals(menuItem.useCategoryOptionals || false)
      } else {
        reset({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          discount: 0,
          categoryId: '',
          medias: undefined,
          useCategoryOptionals: false
        })
        setSelectedCategory('')
        setSelectedFiles([])
        setRemovedMedias([])
        setOptionals([])
        setUseCategoryOptionals(false)
      }
    }
  }, [isOpen, menuItem, reset])

  useEffect(() => {
    setValue('categoryId', selectedCategory)
  }, [selectedCategory, setValue])

  const handleCategorySearch = async (searchTerm: string): Promise<ComboboxOption[]> => {
    try {
      const getCategoriesNamesUsecase = new GetCategoriesNamesUsecase()
      const categoriesData = await getCategoriesNamesUsecase.execute({
        restaurantId: restaurantId!,
        searchMask: searchTerm,
        removeSubCategories: false
      })

      return categoriesData.map((cat) => ({
        label: cat.name,
        value: cat.id,
        displayLabel: cat.mainCategoryName ? `${cat.mainCategoryName} → ${cat.name}` : cat.name,
        icon: cat.icon
      }))
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setValue('categoryId', value, { shouldValidate: true })
  }

  const handleImagesChange = (files: File[], removeMedias: string[]) => {
    setSelectedFiles(files)
    setRemovedMedias(removeMedias)
  }

  const getExistingImages = () => {
    if (!menuItem?.medias) return []
    return Array.isArray(menuItem.medias) ? menuItem.medias : [menuItem.medias]
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

  const onSubmit = async (data: MenuItemFormData) => {
    if (!restaurantId) return
    const optionalsError = validateOptionals()
    if (optionalsError) {
      toast.error(optionalsError)
      return
    }
    setIsLoading(true)
    try {
      if (isEditing && menuItem) {
        const updateMenuItemUsecase = new UpdateMenuItemUsecase()
        await updateMenuItemUsecase.execute({
          menuItemId: menuItem.id,
          ...data,
          restaurantId,
          medias: selectedFiles,
          removeMedias: removedMedias.length > 0 ? removedMedias : undefined,
          optionals: optionals.length > 0 ? optionals : undefined,
          useCategoryOptionals
        })
        toast.success('Item atualizado com sucesso!')
      } else {
        const createMenuItemUsecase = new CreateMenuItemUsecase()
        await createMenuItemUsecase.execute({
          ...data,
          restaurantId,
          medias: selectedFiles,
          optionals: optionals.length > 0 ? optionals : undefined,
          useCategoryOptionals
        })
        toast.success('Item criado com sucesso!')
      }
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} item`)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonText = () => {
    if (isLoading) return <Loading />
    return isEditing ? 'Atualizar' : 'Criar'
  }

  return (
    <Dialog
      title={isEditing ? 'Editar Item' : 'Novo Item'}
      description={isEditing ? 'Edite o item do menu' : 'Crie um novo item para o menu'}
      open={isOpen}
      onOpenChange={onClose}
    >
      <S.Form>
        <S.FormGroup
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            id="name"
            label="Nome"
            placeholder="Digite o nome do item"
            error={errors.name?.message}
            required
            register={register('name')}
            fontSize="sm"
          />
        </S.FormGroup>
        <S.FormGroup
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
          initial="hidden"
          animate="visible"
        >
          <S.Label>Categoria</S.Label>
          <Combobox
            placeholder="Selecione uma categoria"
            value={selectedCategory}
            onChange={handleCategoryChange}
            onSearch={handleCategorySearch}
            error={errors.categoryId?.message}
            disabled={isLoading}
          />
        </S.FormGroup>
        <S.FormGroup
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
          initial="hidden"
          animate="visible"
        >
          <FormTextarea
            id="description"
            label="Descrição"
            placeholder="Digite uma descrição para o item"
            error={errors.description?.message}
            register={register('description')}
            rows={3}
          />
        </S.FormGroup>
        <S.FormRow>
          <S.FormGroup
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            initial="hidden"
            animate="visible"
          >
            <FormInput
              id="price"
              label="Preço"
              type="number"
              step="0.01"
              min="0"
              placeholder="Preço do item"
              error={errors.price?.message}
              required
              register={register('price')}
              fontSize="sm"
            />
          </S.FormGroup>
          <S.FormGroup
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            initial="hidden"
            animate="visible"
          >
            <FormInput
              id="stock"
              label="Estoque"
              type="number"
              min="0"
              placeholder="Estoque do item"
              error={errors.stock?.message}
              required
              register={register('stock')}
              fontSize="sm"
            />
          </S.FormGroup>
        </S.FormRow>
        <S.FormGroup
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
          initial="hidden"
          animate="visible"
        >
          <MultipleImageUploader
            label="Imagens/Vídeos"
            maxImages={5}
            existingImages={getExistingImages()}
            onChange={handleImagesChange}
            error={errors.medias?.message?.toString()}
          />
        </S.FormGroup>
        <S.FormGroup
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
          initial="hidden"
          animate="visible"
        >
          <S.Label>Usar Opcionais da Categoria</S.Label>
          <S.CheckboxContainer>
            <input
              type="checkbox"
              id="useCategoryOptionals"
              checked={useCategoryOptionals}
              onChange={(e) => setUseCategoryOptionals(e.target.checked)}
              disabled={isLoading}
            />
            <S.CheckboxLabel htmlFor="useCategoryOptionals">Herdar opcionais da categoria selecionada</S.CheckboxLabel>
          </S.CheckboxContainer>
        </S.FormGroup>
        <S.FormGroup
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
          initial="hidden"
          animate="visible"
        >
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
