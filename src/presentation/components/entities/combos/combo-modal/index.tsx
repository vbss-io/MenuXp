import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { CreateComboUsecase } from '@/application/combos/create-combo.usecase'
import { UpdateComboUsecase } from '@/application/combos/update-combo.usecase'
import { GetMenuItemsUsecase } from '@/application/menu-items/get-menu-items.usecase'
import type { Combo, ComboItem, ComboOptional } from '@/domain/models/combo.model'
import { Button } from '@/presentation/components/ui/button'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { Dialog } from '@/presentation/components/ui/dialog'
import { FormInput } from '@/presentation/components/ui/form-input'
import { FormTextarea } from '@/presentation/components/ui/form-textarea'
import { Loading } from '@/presentation/components/ui/loading'
import { MultipleImageUploader } from '@/presentation/components/ui/multiple-image-uploader'
import { OptionalsSection, type MenuItemOptional } from '@/presentation/components/ui/optionals'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

const comboSchema = z.object({
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
      invalid_type_error: 'Estoque deve ser um número'
    })
    .min(0, 'Estoque deve ser maior ou igual a 0')
    .optional(),
  discount: z.coerce.number().min(0).max(100).optional(),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  medias: z.any().optional(),
  useCategoryOptionals: z.boolean()
})

type ComboFormData = z.infer<typeof comboSchema>

interface ComboModalProps {
  isOpen: boolean
  onClose: () => void
  combo?: Combo
  onSuccess: () => void
}

export const ComboModal = ({ isOpen, onClose, combo, onSuccess }: ComboModalProps) => {
  const { restaurantId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [_removedMedias, setRemovedMedias] = useState<string[]>([])
  const [optionals, setOptionals] = useState<ComboOptional[]>([])
  const [comboItems, setComboItems] = useState<ComboItem[]>([])
  const [useCategoryOptionals, setUseCategoryOptionals] = useState(false)
  const [menuItemsCache, setMenuItemsCache] = useState<{ id: string; name: string; price: number }[]>([])
  const isEditing = !!combo
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ComboFormData>({
    resolver: zodResolver(comboSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: undefined,
      discount: 0,
      categoryId: '',
      medias: undefined,
      useCategoryOptionals: false
    }
  })

  useEffect(() => {
    if (isOpen) {
      if (combo) {
        reset({
          name: combo.name,
          description: combo.description || '',
          price: combo.price,
          stock: combo.stock,
          discount: combo.discount || 0,
          categoryId: combo.categoryId,
          medias: combo.medias,
          useCategoryOptionals: combo.useCategoryOptionals || false
        })
        setSelectedCategory(combo.categoryId)
        setRemovedMedias([])
        setOptionals(combo.optionals || [])
        setComboItems(combo.items || [])
        setUseCategoryOptionals(combo.useCategoryOptionals || false)
      } else {
        reset({
          name: '',
          description: '',
          price: 0,
          stock: undefined,
          discount: 0,
          categoryId: '',
          medias: undefined,
          useCategoryOptionals: false
        })
        setSelectedCategory('')
        setSelectedFiles([])
        setRemovedMedias([])
        setOptionals([])
        setComboItems([])
        setUseCategoryOptionals(false)
      }
    }
  }, [isOpen, combo, reset])

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

  const handleMenuItemSearch = async (searchTerm: string): Promise<ComboboxOption[]> => {
    try {
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const { menuItems } = await getMenuItemsUsecase.execute({
        restaurantId: restaurantId!,
        searchMask: searchTerm,
        includeInactive: false,
        rowsPerPage: 50
      })
      setMenuItemsCache((prev) => {
        const newCache = [...prev]
        menuItems.forEach((item) => {
          if (!newCache.find((cached) => cached.id === item.id)) {
            newCache.push(item)
          }
        })
        return newCache
      })
      return menuItems.map((item) => ({
        label: item.name,
        value: item.id,
        displayLabel: `${item.name} - R$ ${item.price.toFixed(2)}`
      }))
    } catch (error) {
      console.error('Erro ao buscar itens do menu:', error)
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
    if (!combo?.medias) return []
    return Array.isArray(combo.medias) ? combo.medias : [combo.medias]
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

  const validateComboItems = (): string | null => {
    if (comboItems.length === 0) {
      return 'Pelo menos um item deve ser adicionado ao combo'
    }
    for (let i = 0; i < comboItems.length; i++) {
      const item = comboItems[i]
      if (!item.menuItemId) {
        return `Item ${i + 1} deve ser selecionado`
      }
      if (!item.name.trim()) {
        return `Nome do item ${i + 1} é obrigatório`
      }
      if (typeof item.price !== 'number' || item.price < 0) {
        return `Preço do item "${item.name}" deve ser maior ou igual a 0`
      }
      if (typeof item.quantity !== 'number' || item.quantity < 1) {
        return `Quantidade do item "${item.name}" deve ser maior que 0`
      }
    }
    return null
  }

  const onSubmit = async (data: ComboFormData) => {
    if (!restaurantId) return
    const optionalsError = validateOptionals()
    if (optionalsError) {
      toast.error(optionalsError)
      return
    }
    const itemsError = validateComboItems()
    if (itemsError) {
      toast.error(itemsError)
      return
    }
    setIsLoading(true)
    try {
      if (isEditing && combo) {
        const updateComboUsecase = new UpdateComboUsecase()
        await updateComboUsecase.execute({
          comboId: combo.id,
          restaurantId,
          categoryId: data.categoryId,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          discount: data.discount,
          medias: selectedFiles,
          items: comboItems,
          optionals: optionals.length > 0 ? optionals : undefined,
          useCategoryOptionals
        })
        toast.success('Combo atualizado com sucesso!')
      } else {
        const createComboUsecase = new CreateComboUsecase()
        await createComboUsecase.execute({
          restaurantId,
          categoryId: data.categoryId,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          discount: data.discount,
          medias: selectedFiles,
          items: comboItems,
          optionals: optionals.length > 0 ? optionals : undefined,
          useCategoryOptionals
        })
        toast.success('Combo criado com sucesso!')
      }
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} combo`)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonText = () => {
    if (isLoading) return <Loading />
    return isEditing ? 'Atualizar' : 'Criar'
  }

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
      title={isEditing ? 'Editar Combo' : 'Novo Combo'}
      description={isEditing ? 'Edite o combo' : 'Crie um novo combo'}
      open={isOpen}
      onOpenChange={onClose}
    >
      <S.Form>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <FormInput
            id="name"
            label="Nome"
            placeholder="Digite o nome do combo"
            error={errors.name?.message}
            required
            register={register('name')}
            fontSize="sm"
          />
        </S.FormGroup>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
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
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <FormTextarea
            id="description"
            label="Descrição"
            placeholder="Digite uma descrição para o combo"
            error={errors.description?.message}
            register={register('description')}
            rows={3}
          />
        </S.FormGroup>
        <S.FormRow>
          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="price"
              label="Preço"
              type="number"
              step="0.01"
              min="0"
              placeholder="Preço do combo"
              error={errors.price?.message}
              required
              register={register('price')}
              fontSize="sm"
            />
          </S.FormGroup>
          <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
            <FormInput
              id="stock"
              label="Estoque"
              type="number"
              min="0"
              placeholder="Estoque do combo"
              error={errors.stock?.message}
              register={register('stock')}
              fontSize="sm"
            />
          </S.FormGroup>
        </S.FormRow>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <FormInput
            id="discount"
            label="Desconto (%)"
            type="number"
            min="0"
            max="100"
            placeholder="Desconto em porcentagem"
            error={errors.discount?.message}
            register={register('discount')}
            fontSize="sm"
          />
        </S.FormGroup>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <MultipleImageUploader
            label="Imagens/Vídeos"
            maxImages={5}
            existingImages={getExistingImages()}
            onChange={handleImagesChange}
            error={errors.medias?.message?.toString()}
          />
        </S.FormGroup>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
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
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <S.Label>Itens do Combo</S.Label>
          <S.ItemsContainer>
            {comboItems.map((item, index) => (
              <S.ItemRow key={index}>
                <S.ItemCombobox
                  placeholder="Selecionar item"
                  value={item.menuItemId}
                  onChange={(menuItemId) => {
                    const newItems = [...comboItems]
                    newItems[index].menuItemId = menuItemId

                    if (menuItemId) {
                      const selectedMenuItem = menuItemsCache.find((item) => item.id === menuItemId)
                      if (selectedMenuItem) {
                        newItems[index].name = selectedMenuItem.name
                        newItems[index].price = selectedMenuItem.price
                      } else {
                        newItems[index].name = ''
                        newItems[index].price = 0
                      }
                    } else {
                      newItems[index].name = ''
                      newItems[index].price = 0
                    }

                    setComboItems(newItems)
                  }}
                  onSearch={handleMenuItemSearch}
                />
                <S.ItemInput
                  type="number"
                  placeholder="Qtd"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...comboItems]
                    newItems[index].quantity = parseInt(e.target.value) || 1
                    setComboItems(newItems)
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newItems = comboItems.filter((_, i) => i !== index)
                    setComboItems(newItems)
                  }}
                >
                  Remover
                </Button>
              </S.ItemRow>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setComboItems([...comboItems, { menuItemId: '', name: '', price: 0, quantity: 1 }])
              }}
            >
              Adicionar Item
            </Button>
          </S.ItemsContainer>

          {/* Exibição dos itens selecionados */}
          {comboItems.filter((item) => item.menuItemId).length > 0 && (
            <S.SelectedItemsContainer>
              <S.SelectedItemsTitle>Itens Selecionados:</S.SelectedItemsTitle>
              {comboItems
                .filter((item) => item.menuItemId)
                .map((item, index) => (
                  <S.SelectedItemCard key={index}>
                    <S.SelectedItemInfo>
                      <S.SelectedItemName>{item.name}</S.SelectedItemName>
                      <S.SelectedItemPrice>R$ {item.price.toFixed(2)}</S.SelectedItemPrice>
                      <S.SelectedItemQuantity>Qtd: {item.quantity}</S.SelectedItemQuantity>
                    </S.SelectedItemInfo>
                  </S.SelectedItemCard>
                ))}
            </S.SelectedItemsContainer>
          )}
        </S.FormGroup>
        <S.FormGroup variants={formGroupVariants} initial="hidden" animate="visible">
          <OptionalsSection
            optionals={optionals as MenuItemOptional[]}
            setOptionals={setOptionals as (optionals: MenuItemOptional[]) => void}
            disabled={isLoading}
          />
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
