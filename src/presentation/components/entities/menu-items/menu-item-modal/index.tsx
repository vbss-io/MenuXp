import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@vbss-ui/button'
import { Input } from '@vbss-ui/input'
import { Dialog } from '@vbss-ui/dialog'
import { Textarea } from '@vbss-ui/textarea'
import toast from 'react-hot-toast'

import type { MenuItem } from '@/domain/models/menu-item.model'
import { CreateMenuItemUsecase } from '@/application/menu-items/create-menu-item.usecase'
import { UpdateMenuItemUsecase } from '@/application/menu-items/update-menu-item.usecase'
import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { MultipleImageUploader } from '@/presentation/components/ui/multiple-image-uploader'
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
  medias: z.any().optional()
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
      medias: undefined
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
          medias: menuItem.medias
        })
        setSelectedCategory(menuItem.categoryId)
        setRemovedMedias([])
        setOptionals(menuItem.optionals || [])
      } else {
        reset({
          name: '',
          description: '',
          discount: 0,
          categoryId: '',
          medias: undefined
        })
        setSelectedCategory('')
        setSelectedFiles([])
        setRemovedMedias([])
        setOptionals([])
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
        displayLabel: cat.mainCategoryName ? `${cat.mainCategoryName} → ${cat.name}` : cat.name
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
          optionals: optionals.length > 0 ? optionals : undefined
        })
        toast.success('Item atualizado com sucesso!')
      } else {
        const createMenuItemUsecase = new CreateMenuItemUsecase()
        await createMenuItemUsecase.execute({
          ...data,
          restaurantId,
          medias: selectedFiles,
          optionals: optionals.length > 0 ? optionals : undefined
        })
        toast.success('Item criado com sucesso!')
      }
      onSuccess()
      onClose()
    } catch (error) {
      toast.error('Erro ao salvar item')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      title={isEditing ? 'Editar Item' : 'Novo Item'}
      description={isEditing ? 'Edite o item do menu' : 'Crie um novo item para o menu'}
      open={isOpen}
      onOpenChange={onClose}
      variant="outline"
      disableTextColor
      style={{ width: '90%', maxWidth: '1200px' }}
      footer={
        <S.ModalFooter>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
            {(() => {
              if (isLoading) return 'Salvando...'
              if (isEditing) return 'Atualizar'
              return 'Criar'
            })()}
          </Button>
        </S.ModalFooter>
      }
    >
      <S.Form>
        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="name">Nome *</S.Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome do item"
              error={errors.name?.message}
              fontSize="sm"
              {...register('name')}
              disabled={isLoading}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="categoryId">Categoria *</S.Label>
            <Combobox
              placeholder="Selecione uma categoria"
              value={selectedCategory}
              onChange={handleCategoryChange}
              onSearch={handleCategorySearch}
              error={errors.categoryId?.message}
              disabled={isLoading}
            />
          </S.FormGroup>
        </S.FormRow>
        <S.FormGroupFull>
          <S.Label htmlFor="description">Descrição</S.Label>
          <Textarea
            id="description"
            {...register('description')}
            error={errors.description?.message}
            disabled={isLoading}
            placeholder="Descreva o item..."
            fontSize="sm"
          />
          {errors.description && <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>}
        </S.FormGroupFull>
        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="price">Preço *</S.Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Preço do item"
              error={errors.price?.message}
              fontSize="sm"
              {...register('price')}
              disabled={isLoading}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="stock">Estoque *</S.Label>
            <Input
              id="stock"
              type="number"
              min="0"
              placeholder="Estoque do item"
              error={errors.stock?.message}
              fontSize="sm"
              {...register('stock')}
              disabled={isLoading}
            />
          </S.FormGroup>
        </S.FormRow>
        <S.FormGroupFull>
          <MultipleImageUploader
            label="Imagens/Vídeos"
            maxImages={5}
            existingImages={getExistingImages()}
            onChange={handleImagesChange}
            error={errors.medias?.message?.toString()}
          />
        </S.FormGroupFull>
        <S.FormGroupFull>
          <OptionalsSection optionals={optionals} setOptionals={setOptionals} disabled={isLoading} />
        </S.FormGroupFull>
      </S.Form>
    </Dialog>
  )
}
