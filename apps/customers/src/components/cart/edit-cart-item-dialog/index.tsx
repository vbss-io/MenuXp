import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ComboItemsList } from '@/components/combo/combo-items-list'
import { Button } from '@menuxp/ui'
import { Dialog } from '@menuxp/ui'
import { FormTextarea } from '@menuxp/ui'
import { getRestaurantMenuCombo } from '@/services/menu/get-combo'
import { getRestaurantMenuItem } from '@/services/menu/get-menu-item'
import type { CartItem } from '@/types/cart'

import * as S from './styles'

interface EditCartItemDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (editedItems: CartItem[]) => void
  item: CartItem
  restaurantId: string
}

export const EditCartItemDialog = ({ isOpen, onClose, onSave, item, restaurantId }: EditCartItemDialogProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const [editedItems, setEditedItems] = useState<CartItem[]>([])
  const [originalItems, setOriginalItems] = useState<CartItem[]>([])

  const isCombo = item.itemType === 'combo'

  const { data: menuItem, isLoading: isLoadingMenuItem } = useQuery({
    queryKey: ['menu-item', restaurantId, item.itemId],
    queryFn: () => getRestaurantMenuItem({ restaurantId, menuItemId: item.itemId }),
    enabled: isOpen && !!restaurantId && !!item.itemId && !isCombo
  })

  const { data: combo, isLoading: isLoadingCombo } = useQuery({
    queryKey: ['combo', restaurantId, item.itemId],
    queryFn: () => getRestaurantMenuCombo({ restaurantId, comboId: item.itemId }),
    enabled: isOpen && !!restaurantId && !!item.itemId && isCombo
  })

  const isLoading = isLoadingMenuItem || isLoadingCombo

  useEffect(() => {
    const items: CartItem[] = []
    for (let i = 0; i < item.quantity; i++) {
      items.push({
        ...item,
        quantity: 1,
        note: item.note || '',
        optionals: item.optionals ? item.optionals.map((opt) => ({ ...opt })) : []
      })
    }
    setEditedItems(items)
    setOriginalItems(items)
  }, [item])

  const hasChanges = () => {
    return JSON.stringify(editedItems) !== JSON.stringify(originalItems)
  }

  const handleSave = () => {
    if (!hasChanges()) {
      onClose()
      return
    }

    onSave(editedItems)
    onClose()
  }

  const handleItemChange = (index: number, field: keyof CartItem, value: string | number) => {
    const newItems = [...editedItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setEditedItems(newItems)
  }

  const getOptionalQuantity = (itemIndex: number, optionalName: string): number => {
    const item = editedItems[itemIndex]
    if (!item.optionals) return 0
    const optional = item.optionals.find((opt) => opt.name === optionalName)
    return optional?.quantity || 0
  }

  const handleOptionalQuantityChange = (itemIndex: number, optionalName: string, increment: boolean) => {
    const newItems = [...editedItems]
    const item = { ...newItems[itemIndex] }
    if (!item.optionals) {
      item.optionals = []
    } else {
      item.optionals = [...item.optionals]
    }
    const existingOptionalIndex = item.optionals.findIndex((opt) => opt.name === optionalName)
    const menuOptional = menuItem?.optionals.find((opt) => opt.name === optionalName)
    const currentQuantity = getOptionalQuantity(itemIndex, optionalName)
    const maxQuantity = menuOptional?.maxQuantity || 10
    if (increment) {
      if (currentQuantity < maxQuantity) {
        if (existingOptionalIndex >= 0) {
          item.optionals[existingOptionalIndex] = {
            ...item.optionals[existingOptionalIndex],
            quantity: item.optionals[existingOptionalIndex].quantity + 1
          }
        } else {
          item.optionals.push({
            name: optionalName,
            price: menuOptional?.price || 0,
            quantity: 1
          })
        }
      }
    } else {
      if (currentQuantity > 0) {
        if (existingOptionalIndex >= 0) {
          const newQuantity = item.optionals[existingOptionalIndex].quantity - 1
          if (newQuantity <= 0) {
            item.optionals.splice(existingOptionalIndex, 1)
          } else {
            item.optionals[existingOptionalIndex] = { ...item.optionals[existingOptionalIndex], quantity: newQuantity }
          }
        }
      }
    }

    newItems[itemIndex] = item
    setEditedItems(newItems)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <S.DialogContent>
          <S.DialogHeader>
            <S.DialogTitle>Carregando...</S.DialogTitle>
          </S.DialogHeader>
          <S.DialogBody>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <span>Carregando dados do {isCombo ? 'combo' : 'item'}...</span>
            </div>
          </S.DialogBody>
        </S.DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <S.DialogContent>
        <S.DialogHeader>
          <S.DialogTitle>
            Editar {isCombo ? 'Combo' : 'Item'}: {item.name}
            {isCombo && <S.ComboBadge>COMBO</S.ComboBadge>}
          </S.DialogTitle>
        </S.DialogHeader>
        <S.DialogBody>
          <S.TabsContainer>
            <S.TabsList>
              {editedItems.map((_, index) => (
                <S.TabButton key={index} $isActive={activeTab === index} onClick={() => setActiveTab(index)}>
                  {isCombo ? 'Combo' : 'Item'} {index + 1}
                </S.TabButton>
              ))}
            </S.TabsList>
            {editedItems.map((editedItem, itemIndex) => (
              <S.TabContent key={itemIndex} $isActive={activeTab === itemIndex}>
                <S.ItemSection>
                  <S.SectionTitle>Informações do {isCombo ? 'Combo' : 'Item'}</S.SectionTitle>
                  <S.ItemInfo>
                    <S.ItemName>{editedItem.name}</S.ItemName>
                    <S.ItemPrice>R$ {editedItem.price.toFixed(2).replace('.', ',')}</S.ItemPrice>
                  </S.ItemInfo>
                  <S.FieldGroup>
                    <FormTextarea
                      id={`note-${itemIndex}`}
                      label="Observação"
                      value={editedItem.note || ''}
                      onChange={(e) => handleItemChange(itemIndex, 'note', e.target.value)}
                      placeholder="Ex: remover cebola, sem sal..."
                      rows={3}
                    />
                  </S.FieldGroup>
                </S.ItemSection>
                {isCombo && combo?.items && combo.items.length > 0 && (
                  <S.ItemSection>
                    <S.SectionTitle>Itens incluídos no combo</S.SectionTitle>
                    <ComboItemsList items={combo.items} />
                  </S.ItemSection>
                )}
                {!isCombo && menuItem?.optionals && menuItem.optionals.length > 0 && (
                  <S.ItemSection>
                    <S.SectionTitle>Opcionais</S.SectionTitle>
                    {menuItem.optionals.map((menuOptional) => {
                      const currentQuantity = getOptionalQuantity(itemIndex, menuOptional.name)
                      const maxQuantity = menuOptional.maxQuantity || 10
                      return (
                        <S.OptionalCard key={menuOptional.name}>
                          <S.OptionalHeader>
                            <S.OptionalTitle>{menuOptional.name}</S.OptionalTitle>
                            <S.OptionalPrice>R$ {menuOptional.price.toFixed(2).replace('.', ',')}</S.OptionalPrice>
                          </S.OptionalHeader>
                          <S.OptionalControls>
                            <S.QuantityButton
                              onClick={() => handleOptionalQuantityChange(itemIndex, menuOptional.name, false)}
                              disabled={currentQuantity <= 0}
                            >
                              <MinusIcon size={16} />
                            </S.QuantityButton>
                            <S.QuantityDisplay>{currentQuantity}</S.QuantityDisplay>
                            <S.QuantityButton
                              onClick={() => handleOptionalQuantityChange(itemIndex, menuOptional.name, true)}
                              disabled={currentQuantity >= maxQuantity}
                            >
                              <PlusIcon size={16} />
                            </S.QuantityButton>
                          </S.OptionalControls>
                        </S.OptionalCard>
                      )
                    })}
                  </S.ItemSection>
                )}
              </S.TabContent>
            ))}
          </S.TabsContainer>
        </S.DialogBody>
        <S.DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!hasChanges()}
            style={{
              backgroundColor: hasChanges() ? '#3B82F6' : '#9CA3AF',
              cursor: hasChanges() ? 'pointer' : 'not-allowed'
            }}
          >
            {hasChanges() ? 'Salvar Alterações' : 'Nenhuma Alteração'}
          </Button>
        </S.DialogFooter>
      </S.DialogContent>
    </Dialog>
  )
}
