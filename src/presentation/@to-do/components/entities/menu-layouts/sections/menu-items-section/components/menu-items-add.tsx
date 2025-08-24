import { CheckIcon, ShoppingCartIcon, TagIcon, WarningIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetMenuItemsUsecase } from '@/application/menu-items/get-menu-items.usecase'
import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
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

interface MenuItemsAddProps {
  layoutId: string
  position: number
  onSectionUpdated?: () => void
  onClose?: () => void
}

export const MenuItemsAdd: React.FC<MenuItemsAddProps> = ({ layoutId, position, onSectionUpdated, onClose }) => {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [tempSelectedMenuItems, setTempSelectedMenuItems] = useState<MenuItemData[]>([])
  const [tempSelectedMenuItemIds, setTempSelectedMenuItemIds] = useState<string[]>([])
  const [tempType, setTempType] = useState<'custom' | 'best_sellers' | 'discounts'>('custom')
  const [tempTitle, setTempTitle] = useState('')
  const { restaurant } = useRestaurant()

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

  // Carrega todos os menu items disponíveis
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

  const handleAddSection = async () => {
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

  const handleMenuItemSelect = async (menuItemId: string) => {
    if (tempType !== 'custom') return

    if (tempSelectedMenuItemIds.includes(menuItemId)) {
      setTempSelectedMenuItemIds((prev) => prev.filter((id) => id !== menuItemId))
      setTempSelectedMenuItems((prev) => prev.filter((item) => item.id !== menuItemId))
    } else {
      try {
        const newItem = menuItems.find((item) => item.id === menuItemId)
        if (newItem) {
          setTempSelectedMenuItemIds((prev) => [...prev, menuItemId])
          setTempSelectedMenuItems((prev) => [...prev, newItem])
        }
      } catch {
        toast.error('Erro ao buscar dados do item')
      }
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

        <S.FormFields>
          <S.FormField>
            <label style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Tipo de Seção
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button
                variant={tempType === 'custom' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTempType('custom')}
                disabled={isLoading}
              >
                Itens Personalizados
              </Button>
              <Button
                variant={tempType === 'best_sellers' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTempType('best_sellers')}
                disabled={isLoading}
              >
                Mais Vendidos
              </Button>
              <Button
                variant={tempType === 'discounts' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTempType('discounts')}
                disabled={isLoading}
              >
                Com Descontos
              </Button>
            </div>
          </S.FormField>

          <S.FormField>
            <label style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Título da Seção (opcional)
            </label>
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              placeholder={getDefaultTitle(tempType)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </S.FormField>

          {tempType === 'custom' && (
            <S.FormField>
              <label style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Selecionar Itens ({tempSelectedMenuItemIds.length} selecionados)
              </label>
              {isLoading ? (
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <S.LoadingSpinner />
                  <span style={{ marginLeft: '8px' }}>Carregando itens...</span>
                </div>
              ) : (
                <S.MenuItemsSelectionGrid>
                  {menuItems.map((item) => {
                    const isSelected = tempSelectedMenuItemIds.includes(item.id)
                    return (
                      <S.MenuItemCard
                        key={item.id}
                        selected={isSelected}
                        onClick={() => handleMenuItemSelect(item.id)}
                      >
                        {item.medias && <S.MenuItemImage src={item.medias} alt={item.name} />}
                        <S.MenuItemInfo>
                          <S.MenuItemName>{item.name}</S.MenuItemName>
                          {item.description && <S.MenuItemDescription>{item.description}</S.MenuItemDescription>}
                          <S.MenuItemFooter>
                            <S.MenuItemPrice>
                              {item.discount > 0 && <S.OriginalPrice>{formatPrice(item.price)}</S.OriginalPrice>}
                              <S.FinalPrice discount={item.discount > 0}>
                                {formatPrice(item.price, item.discount)}
                              </S.FinalPrice>
                              {item.discount > 0 && (
                                <S.DiscountBadge>
                                  <TagIcon size={12} />-{item.discount}%
                                </S.DiscountBadge>
                              )}
                            </S.MenuItemPrice>
                            {item.categoryName && <S.CategoryName>{item.categoryName}</S.CategoryName>}
                          </S.MenuItemFooter>
                        </S.MenuItemInfo>
                        {isSelected && (
                          <S.SelectedIndicator>
                            <CheckIcon size={16} />
                          </S.SelectedIndicator>
                        )}
                      </S.MenuItemCard>
                    )
                  })}
                </S.MenuItemsSelectionGrid>
              )}
            </S.FormField>
          )}

          {tempType === 'custom' && tempSelectedMenuItems.length > 0 && (
            <S.FormField>
              <label style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Itens Selecionados
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tempSelectedMenuItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '500' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {formatPrice(item.price, item.discount)}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
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
        </S.FormFields>

        {isLoading && (
          <S.UploadingOverlay>
            <S.LoadingSpinner />
            <span>Adicionando seção...</span>
          </S.UploadingOverlay>
        )}

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleAddSection} disabled={isLoading}>
            {isLoading ? 'Adicionando...' : 'Adicionar Seção'}
          </Button>
        </div>
      </S.EditContent>
    </S.EditContainer>
  )
}
