import { useState } from 'react'

import { MenuItemDialog } from '@/components/menu-item/menu-item-dialog'
import { Button } from '@/components/ui/button'
import type { MenuItem } from '@/types/menu-item'

import * as S from '../../styles'

const mockMenuItem: MenuItem = {
  id: '1',
  name: 'Hambúrguer Artesanal Premium com Muitos Opcionais',
  description:
    'Pão brioche artesanal, carne 180g de angus, queijo cheddar, alface crocante, tomate fresco, cebola roxa e molho especial da casa. Um hambúrguer completo com ingredientes selecionados e preparado com muito cuidado para garantir o melhor sabor.',
  price: 45.9,
  discount: 20,
  medias: ['https://picsum.photos/400/300?random=1'],
  categoryId: '1',
  restaurantId: '1',
  isActive: true,
  stock: 100,
  optionals: [
    {
      name: 'Bacon Crocante',
      price: 4.5,
      maxQuantity: 2
    },
    {
      name: 'Queijo Extra',
      price: 3.0,
      maxQuantity: 3
    },
    {
      name: 'Cebola Caramelizada',
      price: 2.5,
      maxQuantity: 1
    },
    {
      name: 'Cogumelos Salteados',
      price: 3.5,
      maxQuantity: 1
    },
    {
      name: 'Molho Barbecue',
      price: 1.5,
      maxQuantity: 1
    },
    {
      name: 'Abacate Fresco',
      price: 2.0,
      maxQuantity: 1
    }
  ],
  useCategoryOptionals: false,
  createdAt: new Date(),
  updatedAt: new Date()
}

export const MenuItemDialogShowcase: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>MenuItemDialog</S.Label>
        <Button variant="primary" onClick={handleOpenDialog}>
          MenuItemDialog
        </Button>
      </S.ShowcaseItem>
      <MenuItemDialog isOpen={isDialogOpen} onClose={handleCloseDialog} item={mockMenuItem} />
    </S.ShowcaseContainer>
  )
}
