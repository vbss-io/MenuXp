import { WarningIcon, XIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetMenuItemsUsecase } from '@/application/menu-items/get-menu-items.usecase'
import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { UpdateMenuItemsSectionUsecase } from '@/application/menu-layouts/sections/update-menu-items-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuItemsConfig, MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { Button } from '@/presentation/components/ui/button'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { FormInput } from '@/presentation/components/ui/form-input'
import { Loading } from '@/presentation/components/ui/loading'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from '../styles'

interface MenuItemData {
  id: string
  name: string
  description?: string
  price: number
  discount: number
  categoryName?: string
  medias?: string
}

interface MenuItemsEditProps {
  section?: MenuSection
  layoutId: string
  position?: number
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
}

export const MenuItemsEdit: React.FC<MenuItemsEditProps> = ({
  section,
  layoutId,
  position,
  onSectionUpdated,
  onClose,
  sectionDefinitions = []
}) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [tempSelectedMenuItems, setTempSelectedMenuItems] = useState<MenuItemData[]>([])
  const [tempSelectedMenuItemIds, setTempSelectedMenuItemIds] = useState<string[]>([])
  const [tempType, setTempType] = useState<'custom' | 'best_sellers' | 'discounts'>('custom')
  const [tempTitle, setTempTitle] = useState('')
  const { restaurant } = useRestaurant()

  const isEditing = !!section

  const getMenuItemsData = () => {
    if (!section || section.type !== MenuSectionType.MENU_ITEMS) return null
    return section.config as MenuItemsConfig
  }

  const menuItemsData = isEditing ? getMenuItemsData() : null
  const sectionType = isEditing
    ? (menuItemsData?.type as 'custom' | 'best_sellers' | 'discounts') || 'custom'
    : 'custom'
  const sectionTitle = isEditing ? menuItemsData?.title || getDefaultTitle(sectionType) : ''
  const isAllMenuItems = isEditing
    ? menuItemsData?.menuItemIds === null || menuItemsData?.menuItemIds === undefined
    : true

  function getDefaultTitle(type: string): string {
    switch (type) {
      case 'best_sellers':
        return 'Mais Vendidos'
      case 'discounts':
        return 'Com Descontos'
      case 'custom':
      default:
        return ''
    }
  }

  useEffect(() => {
    if (isEditing && sectionDefinitions.length > 0 && section) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions, isEditing])

  useEffect(() => {
    if (isEditing) {
      setTempType(sectionType)
      setTempTitle(sectionTitle)
      if (sectionType === 'custom' && !isAllMenuItems && menuItemsData?.menuItemIds) {
        setTempSelectedMenuItemIds(menuItemsData.menuItemIds)
        if (restaurant?.id) {
          loadMenuItemsForEdit()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionType, sectionTitle, isAllMenuItems, menuItemsData?.menuItemIds, restaurant?.id, isEditing])

  const loadMenuItemsForEdit = useCallback(async () => {
    if (!isEditing || !restaurant?.id || !menuItemsData?.menuItemIds) return

    try {
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const result = await getMenuItemsUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })

      const selectedItems = result.menuItems.filter((item) => menuItemsData?.menuItemIds?.includes(item.id))
      setTempSelectedMenuItems(selectedItems)
    } catch {
      toast.error('Erro ao carregar itens do menu')
    }
  }, [restaurant?.id, menuItemsData?.menuItemIds, isEditing])

  const loadAllMenuItems = useCallback(async () => {
    if (!restaurant?.id) return

    setIsLoading(true)
    try {
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const result = await getMenuItemsUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })
      setMenuItems(result.menuItems)
    } catch {
      toast.error('Erro ao carregar itens do menu')
    } finally {
      setIsLoading(false)
    }
  }, [restaurant?.id])

  useEffect(() => {
    loadAllMenuItems()
  }, [loadAllMenuItems])

  const handleSave = async () => {
    if (isEditing) {
      if (!section?.id || !layoutId) {
        toast.error('Erro: informações da seção inválidas')
        return
      }
      setIsLoading(true)
      try {
        const updateMenuItemsUsecase = new UpdateMenuItemsSectionUsecase()
        await updateMenuItemsUsecase.execute({
          layoutId,
          sectionId: section.id,
          type: tempType,
          title: tempTitle || undefined,
          menuItemIds: tempType === 'custom' ? tempSelectedMenuItemIds : null
        })

        onSectionUpdated?.()
        onClose?.()
        toast.success('Seção de itens do menu atualizada com sucesso!')
      } catch {
        toast.error('Erro ao atualizar seção de itens do menu')
      } finally {
        setIsLoading(false)
      }
    } else {
      if (!layoutId || position === undefined || position === null) {
        toast.error('Erro: informações de layout inválidas')
        return
      }
      setIsLoading(true)
      try {
        const addSectionUsecase = new AddSectionUsecase()
        const newSection: MenuSection = {
          type: MenuSectionType.MENU_ITEMS,
          config: {
            type: tempType,
            title: tempTitle || undefined,
            menuItemIds: tempType === 'custom' ? tempSelectedMenuItemIds : null
          }
        }
        await addSectionUsecase.execute({
          layoutId,
          section: newSection,
          position
        })
        onSectionUpdated?.()
        onClose?.()
        toast.success('Seção de itens do menu adicionada com sucesso!')
      } catch {
        toast.error('Erro ao adicionar seção de itens do menu')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleMenuItemRemove = (menuItemId: string) => {
    setTempSelectedMenuItemIds((prev) => prev.filter((id) => id !== menuItemId))
    setTempSelectedMenuItems((prev) => prev.filter((item) => item.id !== menuItemId))
  }

  const handleTypeChange = (newType: 'custom' | 'best_sellers' | 'discounts') => {
    setTempType(newType)
    setTempTitle(getDefaultTitle(newType))
  }

  const handleMenuItemSearch = async (searchTerm: string): Promise<ComboboxOption[]> => {
    if (!restaurant?.id) return []

    try {
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const result = await getMenuItemsUsecase.execute({
        restaurantId: restaurant.id,
        searchMask: searchTerm,
        includeInactive: false
      })

      return result.menuItems
        .filter((item) => !tempSelectedMenuItemIds.includes(item.id))
        .map((item) => ({
          label: item.name,
          value: item.id,
          displayLabel: `${item.name} - ${formatPrice(item.price, item.discount)}`
        }))
    } catch (error) {
      console.error('Erro ao buscar itens do menu:', error)
      return []
    }
  }

  const handleMenuItemSelect = (menuItemId: string) => {
    const menuItem = menuItems.find((item) => item.id === menuItemId)
    if (menuItem && !tempSelectedMenuItemIds.includes(menuItemId)) {
      setTempSelectedMenuItemIds((prev) => [...prev, menuItemId])
      setTempSelectedMenuItems((prev) => [...prev, menuItem])
    }
  }

  const formatPrice = (price: number, discount?: number) => {
    const finalPrice = discount ? price - (price * discount) / 100 : price
    return finalPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const getButtonText = () => {
    return isEditing ? 'Salvar Alterações' : 'Adicionar Seção'
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <S.EditContainer variants={containerVariants} initial="hidden" animate="visible">
      <S.EditContent>
        <S.Description>
          {isEditing
            ? 'Configure o tipo de exibição e quais itens do menu serão mostrados nesta seção.'
            : 'Configure o tipo de exibição e quais itens do menu serão mostrados na nova seção.'}
        </S.Description>
        <S.FormFields variants={formVariants}>
          <S.FormField>
            <S.FormLabel>Tipo de Seção</S.FormLabel>
            <S.SelectionButtons>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={tempType === 'custom' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleTypeChange('custom')}
                  disabled={isLoading}
                >
                  Itens Personalizados
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={tempType === 'best_sellers' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleTypeChange('best_sellers')}
                  disabled={isLoading}
                >
                  Mais Vendidos
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={tempType === 'discounts' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleTypeChange('discounts')}
                  disabled={isLoading}
                >
                  Com Descontos
                </Button>
              </motion.div>
            </S.SelectionButtons>
          </S.FormField>
          <S.FormField>
            <FormInput
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              placeholder={getDefaultTitle(tempType)}
              id={'title'}
              label={'Título da Seção (opcional)'}
            />
          </S.FormField>
          {tempType === 'custom' && (
            <>
              <S.FormField>
                <S.FormLabel>Adicionar item do menu</S.FormLabel>
                <Combobox
                  placeholder="Digite para buscar itens do menu..."
                  onSearch={handleMenuItemSearch}
                  onChange={handleMenuItemSelect}
                />
              </S.FormField>
              {tempSelectedMenuItems.length > 0 && (
                <S.FormField>
                  <S.FormLabel>Itens selecionados ({tempSelectedMenuItems.length})</S.FormLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tempSelectedMenuItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                          {item.medias && (
                            <img
                              src={item.medias}
                              alt={item.name}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px',
                                objectFit: 'cover'
                              }}
                            />
                          )}
                          <div style={{ flex: 1 }}>
                            <S.MenuItemName>{item.name}</S.MenuItemName>
                            {item.categoryName && (
                              <div
                                style={{
                                  backgroundColor: '#dc2626',
                                  color: '#ffffff',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  display: 'inline-block',
                                  marginTop: '4px'
                                }}
                              >
                                {item.categoryName}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMenuItemRemove(item.id)}
                          style={{ minWidth: '32px', height: '32px', padding: '0' }}
                        >
                          <XIcon size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </S.FormField>
              )}
            </>
          )}
        </S.FormFields>
        {isLoading && (
          <S.UploadingOverlay>
            <Loading />
            <span>{isEditing ? 'Salvando alterações...' : 'Adicionando seção...'}</span>
          </S.UploadingOverlay>
        )}
        {validationErrors.length > 0 && (
          <S.ValidationErrors>
            {validationErrors.map((error, index) => (
              <S.ValidationError key={index}>
                <WarningIcon size={16} />
                <span>{error}</span>
              </S.ValidationError>
            ))}
          </S.ValidationErrors>
        )}
        <S.ModalFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? <Loading /> : getButtonText()}
            </Button>
          </motion.div>
        </S.ModalFooter>
      </S.EditContent>
    </S.EditContainer>
  )
}
