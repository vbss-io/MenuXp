import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { CreateMenuItemUsecase } from '@/application/menu-items/create-menu-item.usecase'
import { UpdateMenuItemUsecase } from '@/application/menu-items/update-menu-item.usecase'
import type { MenuItem } from '@/domain/models/menu-item.model'
import { Button } from '@menuxp/ui'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { Dialog } from '@/presentation/components/ui/dialog'
import { FormInput } from '@/presentation/components/ui/form-input'
import { FormTextarea } from '@/presentation/components/ui/form-textarea'
import { Loading } from '@/presentation/components/ui/loading'
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
  const [controlStock, setControlStock] = useState(false)
  const isEditing = !!menuItem
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
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

  const nameMax = 60
  const descriptionMax = 180
  const [nameCount, setNameCount] = useState(0)
  const [descriptionCount, setDescriptionCount] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const currency = useMemo(() => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }), [])
  const [priceDisplay, setPriceDisplay] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (menuItem) {
        const hasStock = menuItem.stock !== undefined && menuItem.stock !== null && menuItem.stock > 0
        reset({
          name: menuItem.name,
          description: menuItem.description || '',
          price: menuItem.price,
          stock: menuItem.stock ?? 0,
          discount: menuItem.discount ?? 0,
          categoryId: menuItem.categoryId,
          medias: menuItem.medias,
          useCategoryOptionals: menuItem.useCategoryOptionals || false
        })
        setSelectedCategory(menuItem.categoryId)
        setRemovedMedias([])
        setOptionals(menuItem.optionals || [])
        setUseCategoryOptionals(menuItem.useCategoryOptionals || false)
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
        setUseCategoryOptionals(false)
        setControlStock(false)
      }
    }
  }, [isOpen, menuItem, reset])

  useEffect(() => {
    setValue('categoryId', selectedCategory)
  }, [selectedCategory, setValue])

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
    return isEditing ? 'Atualizar e publicar' : 'Salvar e publicar'
  }

  return (
    <Dialog
      title={isEditing ? 'Editar Item' : 'Novo Item'}
      description={isEditing ? 'Edite o item do menu' : 'Crie um novo item para o menu'}
      open={isOpen}
      onOpenChange={onClose}
    >
      <S.GlobalTextareaStyles>
        <S.ModalContent>
          <S.Form ref={formRef}>
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
                placeholder="Ex.: X-Burguer Clássico"
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
                placeholder="Ex.: Pão australiano, 160g de carne, queijo, maionese da casa."
                error={errors.description?.message}
                register={register('description', { maxLength: descriptionMax })}
                rows={3}
                maxLength={descriptionMax}
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
            <S.FormGroup
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              initial="hidden"
              animate="visible"
            >
              <Combobox
                label="Categoria *"
                placeholder="Selecione ou pesquise uma categoria"
                value={selectedCategory}
                onChange={handleCategoryChange}
                onSearch={handleCategorySearch}
                error={errors.categoryId?.message}
                disabled={isLoading}
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
              <OptionalsSection optionals={optionals} setOptionals={setOptionals} disabled={isLoading} />
            </S.FormGroup>
            <S.ModalFooter>
              <S.TertiaryActionButton>
                <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
                  Cancelar
                </Button>
              </S.TertiaryActionButton>

              <S.SecondaryActionButton>
                <Button type="button" variant="outline" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                  Salvar rascunho
                </Button>
              </S.SecondaryActionButton>

              <S.PrimaryActionButton>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="button" variant="primary" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                    {getButtonText()}
                  </Button>
                </motion.div>
              </S.PrimaryActionButton>
            </S.ModalFooter>
          </S.Form>
        </S.ModalContent>
      </S.GlobalTextareaStyles>
    </Dialog>
  )
}
