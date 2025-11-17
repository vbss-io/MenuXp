import { MenuItemCard } from '@/components/menu-item/menu-item-card'
import type { MenuItem } from '@/types/menu-item'

import * as S from '../../styles'

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Hambúrguer Clássico',
    description: 'Pão brioche, carne bovina 180g, queijo cheddar, alface, tomate e molho especial',
    price: 24.9,
    discount: 15,
    medias: ['https://picsum.photos/400/300?random=1'],
    categoryId: '1',
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    useCategoryOptionals: false,
    optionals: [],
    stock: 10
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    description: 'Massa artesanal, molho de tomate, mussarela de búfala, manjericão fresco e azeite extra virgem',
    price: 32.5,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=2'],
    categoryId: '2',
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    useCategoryOptionals: false,
    optionals: [],
    stock: 10
  },
  {
    id: '3',
    name: 'Salada Caesar',
    description: 'Alface romana, croutons, parmesão, molho caesar caseiro e frango grelhado',
    price: 18.9,
    discount: 20,
    medias: ['https://picsum.photos/400/300?random=3'],
    categoryId: '3',
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    useCategoryOptionals: false,
    optionals: [],
    stock: 10
  },
  {
    id: '4',
    name: 'Sushi Combo',
    description: '8 peças de sushi variado, sashimi de salmão, temaki de atum e wasabi',
    price: 45.0,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=4'],
    categoryId: '4',
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    useCategoryOptionals: false,
    optionals: [],
    stock: 10
  },
  {
    id: '5',
    name: 'Pasta Carbonara',
    description: 'Espaguete, bacon, ovos, queijo parmesão, pimenta preta e azeite',
    price: 28.9,
    discount: 10,
    medias: ['https://picsum.photos/400/300?random=5'],
    categoryId: '5',
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    useCategoryOptionals: false,
    optionals: [],
    stock: 10
  },
  {
    id: '6',
    name: 'Tacos Mexicanos',
    description: '3 tacos de carne, cebola, coentro, molho picante e limão',
    price: 22.5,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=6'],
    categoryId: '6',
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    useCategoryOptionals: false,
    optionals: [],
    stock: 10
  }
]

export const MenuItemCardShowcase: React.FC = () => {
  const handleItemClick = (_item: MenuItem) => {}

  return (
    <S.ShowcaseContainer>
      <S.Label>MenuItemCard</S.Label>
      <S.ShowcaseGrid>
        {mockMenuItems.map((item) => (
          <S.ShowcaseItem key={item.id}>
            <MenuItemCard item={item} onClick={handleItemClick} />
          </S.ShowcaseItem>
        ))}
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
