import { Button } from '@menuxp/ui'
import { useState } from 'react'

import { EditCartItemDialog } from '@/components/cart/edit-cart-item-dialog'
import type { CartItem } from '@/types/cart'

import * as S from '../../styles'

const mockCartItems: CartItem[] = [
  {
    itemId: '1',
    itemType: 'menu-item',
    name: 'Hambúrguer Artesanal',
    price: 32.9,
    quantity: 2,
    note: 'Sem cebola',
    optionals: [
      { name: 'Bacon', price: 4.5, quantity: 1 },
      { name: 'Queijo Extra', price: 3.0, quantity: 2 }
    ]
  },
  {
    itemId: '2',
    itemType: 'menu-item',
    name: 'Pizza Margherita',
    price: 48.0,
    quantity: 1,
    note: '',
    optionals: []
  },
  {
    itemId: '3',
    itemType: 'combo',
    name: 'Combo Executivo',
    price: 39.9,
    quantity: 3,
    note: 'Refrigerante sem gelo',
    optionals: []
  },
  {
    itemId: '4',
    itemType: 'menu-item',
    name: 'Salada Caesar com Frango Grelhado e Molho Especial',
    price: 28.5,
    quantity: 1,
    note: 'Molho à parte, por favor',
    optionals: [
      { name: 'Croutons Extra', price: 2.0, quantity: 1 },
      { name: 'Parmesão Ralado', price: 1.5, quantity: 1 }
    ]
  },
  {
    itemId: '5',
    itemType: 'menu-item',
    name: 'Sushi Mix',
    price: 65.0,
    quantity: 1,
    note: '',
    optionals: [
      { name: 'Gengibre Extra', price: 1.0, quantity: 1 },
      { name: 'Shoyu Premium', price: 2.5, quantity: 1 },
      { name: 'Wasabi Extra', price: 1.5, quantity: 2 }
    ]
  },
  {
    itemId: '6',
    itemType: 'combo',
    name: 'Combo Família',
    price: 89.9,
    quantity: 1,
    note: 'Entregar com tudo separado em embalagens individuais',
    optionals: []
  }
]

export const EditCartItemDialogShowcase: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null)

  const handleOpenDialog = (item: CartItem) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedItem(null)
  }

  const handleSave = (_editedItems: CartItem[]) => {}

  return (
    <S.ShowcaseContainer>
      <S.Label>EditCartItemDialog</S.Label>
      <S.ShowcaseGrid>
        {mockCartItems.map((item, index) => (
          <S.ShowcaseItem key={index}>
            <Button variant="primary" onClick={() => handleOpenDialog(item)}>
              {item.name} (x{item.quantity})
            </Button>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>
              {item.itemType === 'combo' ? 'Combo' : 'Item'}
              {item.optionals && item.optionals.length > 0 && ` - ${item.optionals.length} opcionais`}
            </div>
          </S.ShowcaseItem>
        ))}
      </S.ShowcaseGrid>
      {selectedItem && (
        <EditCartItemDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSave}
          item={selectedItem}
          restaurantId="1"
        />
      )}
    </S.ShowcaseContainer>
  )
}
