import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { CreateComboUsecase } from '@/application/combos/create-combo.usecase'
import { UpdateComboUsecase } from '@/application/combos/update-combo.usecase'
import { GetMenuItemsUsecase } from '@/application/menu-items/get-menu-items.usecase'
import type { Combo, ComboItem, ComboOptional } from '@/domain/models/combo.model'
import { useAuth } from '@/presentation/hooks/use-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Combobox,
  Dialog,
  FormInput,
  FormTextarea,
  Loading,
  MultipleImageUploader,
  OptionalsSection,
  type ComboboxOption,
  type MenuItemOptional
} from '@menuxp/ui'
import { PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

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
    .min(0, 'Estoque deve ser maior ou igual a 0'),
  discount: z.coerce
    .number({
      invalid_type_error: 'Desconto deve ser um número'
    })
    .min(0, 'Desconto deve ser maior ou igual a 0')
    .max(100, 'Desconto deve ser no máximo 100%'),
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
  const [controlStock, setControlStock] = useState(false)
  const isEditing = !!combo

  const nameMax = 60
  const descriptionMax = 180
  const [nameCount, setNameCount] = useState(0)
  const [descriptionCount, setDescriptionCount] = useState(0)
  const currency = useMemo(() => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }), [])
  const [priceDisplay, setPriceDisplay] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ComboFormData>({
    resolver: zodResolver(comboSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      discount: 0,
      categoryId: '',
      medias: undefined,
      useCategoryOptionals: false
    }
  })

  useEffect(() => {
    if (isOpen) {
      if (combo) {
        const hasStock = combo.stock !== undefined && combo.stock !== null && combo.stock > 0
        reset({
          name: combo.name,
          description: combo.description || '',
          price: combo.price,
          stock: combo.stock ?? 0,
          discount: combo.discount ?? 0,
          categoryId: combo.categoryId,
          medias: combo.medias,
          useCategoryOptionals: combo.useCategoryOptionals || false
        })
        setSelectedCategory(combo.categoryId)
        setRemovedMedias([])
        setOptionals(combo.optionals || [])
        setComboItems(combo.items || [])
        setUseCategoryOptionals(combo.useCategoryOptionals || false)
        setControlStock(hasStock)
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
        setComboItems([])
        setUseCategoryOptionals(false)
        setControlStock(false)
      }
    }
  }, [isOpen, combo, reset])

  // Atualiza o valor do estoque quando o toggle é alterado
  useEffect(() => {
    if (!controlStock) {
      setValue('stock', 0, { shouldValidate: false })
    }
  }, [controlStock, setValue])

  // Atualiza contadores de caracteres em tempo real
  useEffect(() => {
    const subscription = watch((values) => {
      setNameCount(values.name ? values.name.length : 0)
      setDescriptionCount(values.description ? values.description.length : 0)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const watchedPrice = watch('price') || 0
  const watchedDiscount = watch('discount') || 0
  useEffect(() => {
    const num = Number(watchedPrice) || 0
    const capped = Math.min(num, 999999.99)
    if (capped !== num) {
      setValue('price', capped, { shouldValidate: true })
    }
    setPriceDisplay(currency.format(capped))
  }, [currency, watchedPrice, setValue])

  // Cálculo do preço com desconto
  const discountedPrice = useMemo(() => {
    const price = Number(watchedPrice) || 0
    const discount = Number(watchedDiscount) || 0
    const discountAmount = (price * discount) / 100
    const finalPrice = Math.max(0, price - discountAmount)
    return finalPrice
  }, [watchedPrice, watchedDiscount])

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value || ''
      const digitsOnly = raw.replace(/\D/g, '')
      let cents = digitsOnly === '' ? 0 : parseInt(digitsOnly, 10)
      // Limite 999999.99 -> 99_999_999 centavos
      const MAX_CENTS = 99999999
      if (cents > MAX_CENTS) cents = MAX_CENTS
      const value = cents / 100
      setValue('price', value, { shouldValidate: true })
      // Exibição será sincronizada pelo efeito de watchedPrice -> priceDisplay
    },
    [setValue]
  )

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
    return isEditing ? 'Atualizar e publicar' : 'Salvar e publicar'
  }

  return (
    <Dialog
      title={isEditing ? 'Editar Combo' : 'Novo Combo'}
      description={isEditing ? 'Edite o combo' : 'Crie um novo combo'}
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
                  placeholder="Ex.: Combo X-Burguer + Batata + Refrigerante"
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
                  placeholder="Ex.: X-burguer artesanal, batata frita crocante e refrigerante gelado"
                  error={errors.description?.message}
                  register={register('description', { maxLength: descriptionMax })}
                  rows={3}
                />
                <S.FieldHint aria-live="polite">
                  {Math.min(descriptionCount, descriptionMax)}/{descriptionMax}
                </S.FieldHint>
              </S.FormGroup>
              <S.FormRow>
                <S.FormGroup
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <FormInput
                    id="price"
                    label="Preço (R$)"
                    type="text"
                    inputMode="decimal"
                    min="0"
                    placeholder="R$ 0,00"
                    error={errors.price?.message}
                    required
                    fontSize="sm"
                    value={priceDisplay}
                    onChange={handlePriceChange}
                  />
                  <S.FieldHint>Preço base antes de descontos e opcionais.</S.FieldHint>
                </S.FormGroup>
                <S.FormGroup
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <S.Label>Desconto (%)</S.Label>
                  <S.SliderContainer>
                    <S.Slider
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={watchedDiscount}
                      onChange={(e) =>
                        setValue('discount', Number(e.target.value), {
                          shouldValidate: true
                        })
                      }
                      aria-label="Desconto em porcentagem"
                    />
                    <S.SliderValue>{watchedDiscount}%</S.SliderValue>
                  </S.SliderContainer>
                  <S.FieldHint>Preço com desconto: {currency.format(discountedPrice)}</S.FieldHint>
                </S.FormGroup>
              </S.FormRow>
              <S.FormGroup
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
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
              <S.FormRow>
                <S.FormGroup
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <S.Label>Estoque</S.Label>
                  <S.ToggleContainer>
                    <S.ToggleSwitch>
                      <S.ToggleInput
                        type="checkbox"
                        id="controlStock"
                        checked={controlStock}
                        onChange={(e) => setControlStock(e.target.checked)}
                        disabled={isLoading}
                      />
                      <S.ToggleSlider />
                    </S.ToggleSwitch>
                    <S.ToggleLabel htmlFor="controlStock">Controlar estoque</S.ToggleLabel>
                  </S.ToggleContainer>

                  {controlStock && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormInput
                        id="stock"
                        label="Quantidade"
                        type="number"
                        min="0"
                        placeholder="0 = ilimitado"
                        error={errors.stock?.message}
                        register={register('stock')}
                        fontSize="sm"
                      />
                      <S.FieldHint>0 = ilimitado</S.FieldHint>
                    </motion.div>
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
                  <S.Label>Usar Opcionais da Categoria</S.Label>
                  <S.ToggleContainer>
                    <S.ToggleSwitch>
                      <S.ToggleInput
                        type="checkbox"
                        id="useCategoryOptionals"
                        checked={useCategoryOptionals}
                        onChange={(e) => setUseCategoryOptionals(e.target.checked)}
                        disabled={isLoading}
                      />
                      <S.ToggleSlider />
                    </S.ToggleSwitch>
                    <S.ToggleLabel htmlFor="useCategoryOptionals">
                      Herdar opcionais da categoria selecionada
                    </S.ToggleLabel>
                  </S.ToggleContainer>
                </S.FormGroup>
              </S.FormRow>
              <S.FormGroup
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                initial="hidden"
                animate="visible"
              >
                <S.ComboItemsHeader>
                  <S.Label>Itens do Combo</S.Label>
                  <S.ComboItemsSubtitle>
                    Selecione os itens que fazem parte deste combo e suas quantidades.
                  </S.ComboItemsSubtitle>
                  {comboItems.length === 0 && (
                    <S.ChipsContainer>
                      <S.Chip>Ex.: X-Burguer</S.Chip>
                      <S.Chip>Ex.: Batata Frita</S.Chip>
                      <S.Chip>Ex.: Refrigerante</S.Chip>
                    </S.ChipsContainer>
                  )}
                </S.ComboItemsHeader>
                {comboItems.map((item, index) => (
                  <S.ComboItemCard key={index}>
                    <S.ComboItemRemoveButton
                      type="button"
                      onClick={() => {
                        const newItems = comboItems.filter((_, i) => i !== index)
                        setComboItems(newItems)
                      }}
                      disabled={isLoading}
                      title="Remover item"
                    >
                      <TrashIcon size={16} />
                    </S.ComboItemRemoveButton>
                    <S.ComboItemGrid>
                      <S.ComboItemInputGroup>
                        <S.Label>Item do menu *</S.Label>
                        <Combobox
                          placeholder="Selecionar item"
                          value={item.menuItemId}
                          onChange={(menuItemId: string) => {
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
                      </S.ComboItemInputGroup>
                      <S.ComboItemInputGroup>
                        <S.Label>Quantidade *</S.Label>
                        <S.ComboItemQuantityInput
                          type="number"
                          placeholder="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newItems = [...comboItems]
                            newItems[index].quantity = parseInt(e.target.value) || 1
                            setComboItems(newItems)
                          }}
                          min="1"
                        />
                      </S.ComboItemInputGroup>
                    </S.ComboItemGrid>
                  </S.ComboItemCard>
                ))}
                <S.AddComboItemButtonContainer>
                  <Button
                    type="button"
                    variant="white"
                    size="sm"
                    onClick={() => {
                      setComboItems([...comboItems, { menuItemId: '', name: '', price: 0, quantity: 1 }])
                    }}
                    disabled={isLoading}
                    leftIcon={<PlusIcon size={16} weight="bold" />}
                  >
                    Adicionar Item
                  </Button>
                </S.AddComboItemButtonContainer>
              </S.FormGroup>
              <S.FormGroup
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                initial="hidden"
                animate="visible"
              >
                <OptionalsSection
                  optionals={optionals as MenuItemOptional[]}
                  setOptionals={setOptionals as (optionals: MenuItemOptional[]) => void}
                  disabled={isLoading}
                />
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
