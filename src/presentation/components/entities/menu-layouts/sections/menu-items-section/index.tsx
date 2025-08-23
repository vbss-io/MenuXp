import { CheckIcon, PencilIcon, ShoppingCartIcon, TagIcon, TrashIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { GetMenuItemsUsecase } from '@/application/menu-items/get-menu-items.usecase'
import { UpdateMenuItemsSectionUsecase } from '@/application/menu-layouts/sections/update-menu-items-section.usecase'
import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'

import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { Combobox } from '@/presentation/components/ui/combobox'

import * as S from './styles'

type MenuItemsSectionMode = 'view' | 'preview-edit' | 'edit' | 'add'

interface MenuItemsSectionProps {
  section?: MenuSection
  mode: MenuItemsSectionMode
  onRemove?: () => void
  onEdit?: () => void
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  position?: number
}

interface MenuItemData {
  id: string
  name: string
  description?: string
  price: number
  discount: number
  categoryName?: string
  medias?: string
}

export const MenuItemsSection = ({
  section,
  mode,
  onRemove,
  onEdit,
  onSectionUpdated,
  onClose: _onClose,
  sectionDefinitions = [],
  layoutId,
  position: _position
}: MenuItemsSectionProps) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [tempSelectedMenuItems, setTempSelectedMenuItems] = useState<MenuItemData[]>([])
  const [tempSelectedMenuItemIds, setTempSelectedMenuItemIds] = useState<string[]>([])
  const [tempType, setTempType] = useState<'custom' | 'best_sellers' | 'discounts'>('custom')
  const [tempTitle, setTempTitle] = useState('')
  const { restaurant } = useRestaurant()

  // Estados para drag horizontal
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const sectionType = (section?.config as any)?.type || 'custom'
  const sectionTitle = section?.config.title || getDefaultTitle(sectionType)
  const isAllMenuItems = section?.config.menuItemIds === null || section?.config.menuItemIds === undefined

  // Função para obter título padrão baseado no tipo
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

  // Funções para drag horizontal
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      e.preventDefault()
      const x = e.pageX - containerRef.current.offsetLeft
      const walk = (x - startX) * 2 // Velocidade do scroll
      containerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Event listeners para drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (sectionDefinitions.length > 0 && section) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions])

  // Carrega menu items apenas para exibição (modos view e preview-edit)
  const loadMenuItemsForDisplay = useCallback(async () => {
    if (!restaurant?.id || (mode !== 'view' && mode !== 'preview-edit')) return

    console.log('MenuItemsSection - loadMenuItemsForDisplay called:', {
      restaurantId: restaurant.id,
      mode,
      sectionType,
      isAllMenuItems,
      sectionMenuItemIds: section?.config.menuItemIds
    })

    setIsLoading(true)
    try {
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const result = await getMenuItemsUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })

      let filteredItems = result.menuItems

      // Filtrar baseado no tipo da seção
      if (sectionType === 'best_sellers') {
        // TODO: Implementar lógica de mais vendidos
        filteredItems = result.menuItems.slice(0, 10) // Temporário: primeiros 10
      } else if (sectionType === 'discounts') {
        filteredItems = result.menuItems.filter((item) => item.discount > 0)
      } else if (sectionType === 'custom' && !isAllMenuItems && section?.config.menuItemIds) {
        filteredItems = result.menuItems.filter((item) => section.config.menuItemIds?.includes(item.id))
      }

      console.log('MenuItemsSection - loadMenuItemsForDisplay result:', {
        totalItems: result.menuItems.length,
        filteredItemsCount: filteredItems.length,
        items: filteredItems.map((item) => ({ id: item.id, name: item.name }))
      })

      setMenuItems(filteredItems)
    } catch {
      toast.error('Erro ao carregar itens do menu')
    } finally {
      setIsLoading(false)
    }
  }, [restaurant?.id, mode, sectionType, isAllMenuItems, section?.config.menuItemIds])

  // Inicializa estados para modos edit/add
  useEffect(() => {
    if (mode === 'edit' || mode === 'add') {
      setTempType(sectionType)
      setTempTitle(sectionTitle)

      if (sectionType === 'custom' && !isAllMenuItems && section?.config.menuItemIds) {
        setTempSelectedMenuItemIds(section.config.menuItemIds)
        // Para modo edit, carrega menu items para mostrar os já selecionados
        if (mode === 'edit' && restaurant?.id) {
          loadMenuItemsForEdit()
        }
      }
    }
  }, [mode, sectionType, sectionTitle, isAllMenuItems, section?.config.menuItemIds, restaurant?.id])

  // Carrega menu items para modo edit
  const loadMenuItemsForEdit = useCallback(async () => {
    if (!restaurant?.id || !section?.config.menuItemIds) return

    try {
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const result = await getMenuItemsUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })
      const selected = result.menuItems.filter((item) => section.config.menuItemIds?.includes(item.id))
      setTempSelectedMenuItems(selected)
    } catch {
      toast.error('Erro ao carregar itens do menu')
    }
  }, [restaurant?.id, section?.config.menuItemIds])

  // Carrega menu items para exibição
  useEffect(() => {
    if (mode === 'view' || mode === 'preview-edit') {
      console.log('MenuItemsSection - section?.config.menuItemIds changed:', {
        mode,
        sectionId: section?.id,
        sectionType,
        menuItemIds: section?.config.menuItemIds,
        isAllMenuItems
      })
      loadMenuItemsForDisplay()
    }
  }, [loadMenuItemsForDisplay, mode, section?.config.menuItemIds, sectionType])

  const handleSaveChanges = async () => {
    if (!section?.id || !layoutId) {
      console.error('Missing section.id or layoutId:', { sectionId: section?.id, layoutId })
      return
    }

    console.log('Saving changes with params:', {
      layoutId,
      sectionId: section.id,
      tempType,
      tempTitle,
      tempSelectedMenuItemIds
    })

    setIsLoading(true)
    try {
      const menuItemIds =
        tempType === 'custom' ? (tempSelectedMenuItemIds.length > 0 ? tempSelectedMenuItemIds : null) : null

      console.log('Calling UpdateMenuItemsSectionUsecase with:', {
        layoutId,
        sectionId: section.id,
        type: tempType,
        title: tempTitle,
        menuItemIds
      })

      const updateMenuItemsUsecase = new UpdateMenuItemsSectionUsecase()
      const result = await updateMenuItemsUsecase.execute({
        layoutId,
        sectionId: section.id,
        type: tempType,
        title: tempTitle,
        menuItemIds
      })

      console.log('Update menu items result:', result)

      onSectionUpdated?.()
      _onClose?.()
      toast.success('Itens do menu atualizados com sucesso!')
    } catch (error) {
      console.error('Error updating menu items:', error)
      toast.error('Erro ao atualizar itens do menu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddSection = async () => {
    if (!layoutId || _position === undefined || _position === null) {
      console.error('Missing layoutId or position:', { layoutId, _position })
      return
    }

    if (tempType === 'custom' && tempSelectedMenuItemIds.length === 0) {
      toast.error('Selecione pelo menos um item ou escolha outro tipo de seção')
      return
    }

    console.log('Adding section with params:', {
      layoutId,
      position: _position,
      tempType,
      tempTitle,
      tempSelectedMenuItemIds
    })

    setIsLoading(true)
    try {
      const addSectionUsecase = new AddSectionUsecase()
      const newSection = {
        type: MenuSectionType.MENU_ITEMS,
        config: {}
      }

      console.log('New section object:', newSection)

      const result = await addSectionUsecase.execute({
        layoutId,
        section: newSection,
        position: _position,
        menuItemsType: tempType,
        menuItemsTitle: tempTitle
      })

      console.log('Add section result:', result)

      onSectionUpdated?.()
      _onClose?.()
      toast.success('Seção de itens do menu adicionada com sucesso!')
    } catch (error) {
      console.error('Error adding section:', error)
      toast.error('Erro ao adicionar seção de itens do menu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMenuItemSearch = async (searchTerm: string) => {
    if (!restaurant?.id) return []

    try {
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const result = await getMenuItemsUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })

      const filteredItems = result.menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )

      return filteredItems.map((item) => ({
        label: item.name,
        value: item.id,
        displayLabel: `${item.name} - ${formatPrice(item.price, item.discount)}`,
        description: item.description
      }))
    } catch {
      console.error('Erro ao buscar itens do menu')
      return []
    }
  }

  const handleMenuItemSelect = async (menuItemId: string) => {
    // Verificar se o item já foi selecionado
    if (tempSelectedMenuItemIds.includes(menuItemId)) {
      return
    }

    try {
      // Buscar dados completos do item selecionado
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const result = await getMenuItemsUsecase.execute({
        restaurantId: restaurant!.id,
        includeInactive: false
      })

      const selectedItem = result.menuItems.find((item) => item.id === menuItemId)

      if (selectedItem) {
        const newItem: MenuItemData = {
          id: menuItemId,
          name: selectedItem.name,
          description: selectedItem.description,
          price: selectedItem.price,
          discount: selectedItem.discount,
          categoryName: selectedItem.categoryName,
          medias: selectedItem.medias
        }

        setTempSelectedMenuItemIds((prev) => [...prev, menuItemId])
        setTempSelectedMenuItems((prev) => [...prev, newItem])
      }
    } catch {
      toast.error('Erro ao buscar dados do item')
    }
  }

  const handleMenuItemRemove = (menuItemId: string) => {
    setTempSelectedMenuItemIds((prev) => prev.filter((id) => id !== menuItemId))
    setTempSelectedMenuItems((prev) => prev.filter((item) => item.id !== menuItemId))
  }

  const formatPrice = (price: number, discount?: number) => {
    const finalPrice = discount ? price - (price * discount) / 100 : price
    return finalPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const displayMenuItems = menuItems

  // Modo 1: VIEW - Visualização normal (preview e clientes)
  if (mode === 'view') {
    if (!displayMenuItems.length) {
      return null
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <S.ViewContainer>
            {sectionTitle && (
              <S.SectionTitle>
                <ShoppingCartIcon size={20} />
                <span>{sectionTitle}</span>
              </S.SectionTitle>
            )}
            <S.MenuItemsGrid
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              isDragging={isDragging}
            >
              {displayMenuItems.map((menuItem) => (
                <S.MenuItemCard key={menuItem.id}>
                  {menuItem.medias && <S.MenuItemImage src={menuItem.medias} alt={menuItem.name} />}
                  <S.MenuItemInfo>
                    <S.MenuItemName>{menuItem.name}</S.MenuItemName>
                    {menuItem.description && <S.MenuItemDescription>{menuItem.description}</S.MenuItemDescription>}
                    <S.MenuItemFooter>
                      <S.MenuItemPrice>
                        {menuItem.discount > 0 && <S.OriginalPrice>{formatPrice(menuItem.price)}</S.OriginalPrice>}
                        <S.FinalPrice discount={menuItem.discount > 0}>
                          {formatPrice(menuItem.price, menuItem.discount)}
                        </S.FinalPrice>
                        {menuItem.discount > 0 && (
                          <S.DiscountBadge>
                            <TagIcon size={12} />-{menuItem.discount}%
                          </S.DiscountBadge>
                        )}
                      </S.MenuItemPrice>
                      {menuItem.categoryName && <S.CategoryName>{menuItem.categoryName}</S.CategoryName>}
                    </S.MenuItemFooter>
                  </S.MenuItemInfo>
                </S.MenuItemCard>
              ))}
            </S.MenuItemsGrid>
          </S.ViewContainer>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Modo 2: PREVIEW-EDIT - Visualização no preview com controles de exclusão
  if (mode === 'preview-edit') {
    if (!displayMenuItems.length) {
      return (
        <S.ViewContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <S.SectionTitle>
              <ShoppingCartIcon size={20} />
              <span>{sectionTitle || 'Itens do Menu'}</span>
            </S.SectionTitle>
            <div style={{ display: 'flex', gap: '4px' }}>
              {onEdit && (
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <PencilIcon size={16} />
                </Button>
              )}
              {onRemove && (
                <Button variant="ghost" size="sm" onClick={onRemove}>
                  <TrashIcon size={16} />
                </Button>
              )}
            </div>
          </div>
          <div style={{ padding: '32px', textAlign: 'center', color: '#666' }}>
            <ShoppingCartIcon size={48} />
            <p>Nenhum item configurado</p>
          </div>
        </S.ViewContainer>
      )
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <S.ViewContainer>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
            >
              <S.SectionTitle>
                <ShoppingCartIcon size={20} />
                <span>{sectionTitle || 'Itens do Menu'}</span>
              </S.SectionTitle>
              <div style={{ display: 'flex', gap: '4px' }}>
                {onEdit && (
                  <Button variant="ghost" size="sm" onClick={onEdit}>
                    <PencilIcon size={16} />
                  </Button>
                )}
                {onRemove && (
                  <Button variant="ghost" size="sm" onClick={onRemove}>
                    <TrashIcon size={16} />
                  </Button>
                )}
              </div>
            </div>
            <S.MenuItemsGrid
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              isDragging={isDragging}
            >
              {displayMenuItems.map((menuItem) => (
                <S.MenuItemCard key={menuItem.id}>
                  {menuItem.medias && <S.MenuItemImage src={menuItem.medias} alt={menuItem.name} />}
                  <S.MenuItemInfo>
                    <S.MenuItemName>{menuItem.name}</S.MenuItemName>
                    {menuItem.description && <S.MenuItemDescription>{menuItem.description}</S.MenuItemDescription>}
                    <S.MenuItemFooter>
                      <S.MenuItemPrice>
                        {menuItem.discount > 0 && <S.OriginalPrice>{formatPrice(menuItem.price)}</S.OriginalPrice>}
                        <S.FinalPrice discount={menuItem.discount > 0}>
                          {formatPrice(menuItem.price, menuItem.discount)}
                        </S.FinalPrice>
                        {menuItem.discount > 0 && (
                          <S.DiscountBadge>
                            <TagIcon size={12} />-{menuItem.discount}%
                          </S.DiscountBadge>
                        )}
                      </S.MenuItemPrice>
                      {menuItem.categoryName && <S.CategoryName>{menuItem.categoryName}</S.CategoryName>}
                    </S.MenuItemFooter>
                  </S.MenuItemInfo>
                </S.MenuItemCard>
              ))}
            </S.MenuItemsGrid>
          </S.ViewContainer>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Modo 3: ADD - Interface para adicionar nova seção
  if (mode === 'add') {
    return (
      <S.EditContainer>
        <S.EditHeader>
          <S.EditTitle>
            <ShoppingCartIcon size={20} />
            <span>Adicionar Seção de Itens do Menu</span>
          </S.EditTitle>
        </S.EditHeader>

        <S.EditContent>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Configure o tipo de exibição e quais itens do menu serão mostrados nesta seção.
            </p>
          </div>

          <S.ConfigSection>
            <S.ConfigTitle>Tipo de Seção</S.ConfigTitle>
            <S.ConfigOptions>
              <S.ConfigOption
                active={tempType === 'custom'}
                onClick={() => {
                  setTempType('custom')
                  setTempTitle('')
                }}
              >
                <span>Itens personalizados</span>
                {tempType === 'custom' && <CheckIcon size={16} />}
              </S.ConfigOption>
              <S.ConfigOption
                active={tempType === 'best_sellers'}
                onClick={() => {
                  setTempType('best_sellers')
                  setTempTitle('Mais Vendidos')
                }}
              >
                <span>Mais vendidos</span>
                {tempType === 'best_sellers' && <CheckIcon size={16} />}
              </S.ConfigOption>
              <S.ConfigOption
                active={tempType === 'discounts'}
                onClick={() => {
                  setTempType('discounts')
                  setTempTitle('Com Descontos')
                }}
              >
                <span>Itens com desconto</span>
                {tempType === 'discounts' && <CheckIcon size={16} />}
              </S.ConfigOption>
            </S.ConfigOptions>
          </S.ConfigSection>

          <S.ConfigSection>
            <S.ConfigTitle>Título da Seção</S.ConfigTitle>
            <S.TitleInput
              type="text"
              placeholder="Digite o título da seção..."
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              maxLength={100}
            />
          </S.ConfigSection>

          {tempType === 'custom' && (
            <S.SelectionSection>
              <S.SelectionHeader>
                <h4>Selecionar Itens do Menu</h4>
                <Combobox
                  placeholder="Buscar itens do menu..."
                  onSearch={handleMenuItemSearch}
                  onChange={handleMenuItemSelect}
                />
              </S.SelectionHeader>

              {tempSelectedMenuItems.length > 0 && (
                <S.SelectedMenuItemsList>
                  {tempSelectedMenuItems.map((menuItem) => (
                    <S.SelectedMenuItemItem key={menuItem.id}>
                      <S.MenuItemInfo>
                        <S.MenuItemName>{menuItem.name}</S.MenuItemName>
                        <S.MenuItemPrice>
                          {formatPrice(menuItem.price, menuItem.discount)}
                          {menuItem.discount > 0 && (
                            <S.DiscountBadge>
                              <TagIcon size={12} />-{menuItem.discount}%
                            </S.DiscountBadge>
                          )}
                        </S.MenuItemPrice>
                      </S.MenuItemInfo>
                      <Button variant="ghost" size="sm" onClick={() => handleMenuItemRemove(menuItem.id)}>
                        <TrashIcon size={12} />
                      </Button>
                    </S.SelectedMenuItemItem>
                  ))}
                </S.SelectedMenuItemsList>
              )}
            </S.SelectionSection>
          )}

          {isLoading && (
            <S.LoadingContainer>
              <S.LoadingSpinner />
              <span>Carregando itens do menu...</span>
            </S.LoadingContainer>
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

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button
              variant="ghost"
              onClick={() => {
                console.log('Cancel button clicked (add mode)')
                _onClose?.()
              }}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                console.log('Add button clicked')
                handleAddSection()
              }}
              disabled={isLoading || (tempType === 'custom' && tempSelectedMenuItemIds.length === 0)}
            >
              {isLoading ? 'Adicionando...' : 'Adicionar Seção'}
            </Button>
          </div>
        </S.EditContent>
      </S.EditContainer>
    )
  }

  // Modo 4: EDIT - Visualização de edição (usada no SectionDialog)
  if (mode === 'edit') {
    return (
      <S.EditContainer>
        <S.EditHeader>
          <S.EditTitle>
            <ShoppingCartIcon size={20} />
            <span>Itens do Menu</span>
          </S.EditTitle>
        </S.EditHeader>

        <S.EditContent>
          <S.ConfigSection>
            <S.ConfigTitle>Tipo de Seção</S.ConfigTitle>
            <S.ConfigOptions>
              <S.ConfigOption
                active={tempType === 'custom'}
                onClick={() => {
                  setTempType('custom')
                  setTempTitle('')
                }}
              >
                <span>Itens personalizados</span>
                {tempType === 'custom' && <CheckIcon size={16} />}
              </S.ConfigOption>
              <S.ConfigOption
                active={tempType === 'best_sellers'}
                onClick={() => {
                  setTempType('best_sellers')
                  setTempTitle('Mais Vendidos')
                }}
              >
                <span>Mais vendidos</span>
                {tempType === 'best_sellers' && <CheckIcon size={16} />}
              </S.ConfigOption>
              <S.ConfigOption
                active={tempType === 'discounts'}
                onClick={() => {
                  setTempType('discounts')
                  setTempTitle('Com Descontos')
                }}
              >
                <span>Itens com desconto</span>
                {tempType === 'discounts' && <CheckIcon size={16} />}
              </S.ConfigOption>
            </S.ConfigOptions>
          </S.ConfigSection>

          <S.ConfigSection>
            <S.ConfigTitle>Título da Seção</S.ConfigTitle>
            <S.TitleInput
              type="text"
              placeholder="Digite o título da seção..."
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              maxLength={100}
            />
          </S.ConfigSection>

          {tempType === 'custom' && (
            <S.SelectionSection>
              <S.SelectionHeader>
                <h4>Selecionar Itens do Menu</h4>
                <Combobox
                  placeholder="Buscar itens do menu..."
                  onSearch={handleMenuItemSearch}
                  onChange={handleMenuItemSelect}
                />
              </S.SelectionHeader>

              {tempSelectedMenuItems.length > 0 && (
                <S.SelectedMenuItemsList>
                  {tempSelectedMenuItems.map((menuItem) => (
                    <S.SelectedMenuItemItem key={menuItem.id}>
                      <S.MenuItemInfo>
                        <S.MenuItemName>{menuItem.name}</S.MenuItemName>
                        <S.MenuItemPrice>
                          {formatPrice(menuItem.price, menuItem.discount)}
                          {menuItem.discount > 0 && (
                            <S.DiscountBadge>
                              <TagIcon size={12} />-{menuItem.discount}%
                            </S.DiscountBadge>
                          )}
                        </S.MenuItemPrice>
                      </S.MenuItemInfo>
                      <Button variant="ghost" size="sm" onClick={() => handleMenuItemRemove(menuItem.id)}>
                        <TrashIcon size={12} />
                      </Button>
                    </S.SelectedMenuItemItem>
                  ))}
                </S.SelectedMenuItemsList>
              )}
            </S.SelectionSection>
          )}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button
              variant="ghost"
              onClick={() => {
                console.log('Cancel button clicked (edit mode)')
                _onClose?.()
              }}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                console.log('Save button clicked')
                handleSaveChanges()
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>

          {isLoading && (
            <S.LoadingContainer>
              <S.LoadingSpinner />
              <span>Carregando itens do menu...</span>
            </S.LoadingContainer>
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
        </S.EditContent>
      </S.EditContainer>
    )
  }

  return null
}
