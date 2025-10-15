import { MenuItemsSection } from '@/components/menu-layout-sections/menu-items-section'
import type { MenuItem } from '@/types/menu-item'
import { MenuSectionType, type MenuSection } from '@/types/menu-layout'

import * as S from '../../styles'

const mockBestSellersItems: MenuItem[] = [
  {
    id: '1',
    name: 'Hambúrguer Artesanal',
    description: 'Pão brioche, carne 180g, queijo cheddar, alface, tomate e molho especial',
    price: 24.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=1'],
    categoryId: '1',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
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
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Salada Caesar',
    description: 'Alface americana, croutons, queijo parmesão, molho caesar e tiras de frango grelhado',
    price: 18.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=3'],
    categoryId: '3',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Pasta Carbonara',
    description: 'Espaguete com molho carbonara, bacon, ovos, queijo parmesão e pimenta preta',
    price: 28.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=4'],
    categoryId: '4',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Sushi Combo',
    description: '8 peças de sushi variado: salmão, atum, camarão e pepino com wasabi e gengibre',
    price: 45.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=5'],
    categoryId: '5',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const mockCustomItems: MenuItem[] = [
  {
    id: '6',
    name: 'Risotto de Cogumelos',
    description: 'Arroz arbóreo com mix de cogumelos, queijo parmesão e trufa negra',
    price: 38.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=6'],
    categoryId: '6',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    name: 'Peixe Grelhado',
    description: 'Filé de salmão grelhado com legumes assados e molho de ervas',
    price: 42.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=7'],
    categoryId: '7',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    name: 'Cordeiro Assado',
    description: 'Pernil de cordeiro assado lentamente com ervas mediterrâneas',
    price: 55.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=8'],
    categoryId: '8',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '9',
    name: 'Lasanha Vegetariana',
    description: 'Camadas de massa com berinjela, abobrinha, ricota e molho de tomate',
    price: 32.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=9'],
    categoryId: '9',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '10',
    name: 'Tiramisu',
    description: 'Sobremesa italiana com café, mascarpone, biscoitos savoiardi e cacau',
    price: 16.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=10'],
    categoryId: '10',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const mockDiscountItems: MenuItem[] = [
  {
    id: '11',
    name: 'Combo Burger + Batata',
    description: 'Hambúrguer artesanal com batata frita e refrigerante',
    price: 35.9,
    discount: 20,
    medias: ['https://picsum.photos/400/300?random=11'],
    categoryId: '11',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '12',
    name: 'Pizza Família',
    description: 'Pizza grande com 4 sabores: margherita, pepperoni, portuguesa e calabresa',
    price: 55.0,
    discount: 25,
    medias: ['https://picsum.photos/400/300?random=12'],
    categoryId: '12',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '13',
    name: 'Pasta + Salada',
    description: 'Espaguete à bolonhesa com salada verde e molho de mostarda',
    price: 28.9,
    discount: 15,
    medias: ['https://picsum.photos/400/300?random=13'],
    categoryId: '13',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '14',
    name: 'Sushi + Temaki',
    description: '10 peças de sushi + 2 temakis de salmão com cream cheese',
    price: 48.9,
    discount: 30,
    medias: ['https://picsum.photos/400/300?random=14'],
    categoryId: '14',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '15',
    name: 'Sobremesa Dupla',
    description: 'Tiramisu + cheesecake de frutas vermelhas',
    price: 22.9,
    discount: 18,
    medias: ['https://picsum.photos/400/300?random=15'],
    categoryId: '15',
    restaurantId: '1',
    isActive: true,
    stock: 100,
    optionals: [],
    useCategoryOptionals: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const MenuItemsSectionWithMockData: React.FC<{
  title: string
  items: MenuItem[]
  sectionType: 'best-sellers' | 'custom' | 'discount'
}> = ({ title, items, sectionType }) => {
  const mockSection: MenuSection = {
    id: sectionType,
    type: MenuSectionType.MENU_ITEMS,
    config: {
      type: (() => {
        if (sectionType === 'best-sellers') return 'best_sellers'
        if (sectionType === 'custom') return 'custom'
        return 'discounts'
      })(),
      title,
      menuItemIds: items.map((item) => item.id)
    }
  }

  return <MenuItemsSection section={mockSection} mockItems={items} />
}

export const MenuItemsSectionShowcase: React.FC = () => {
  return (
    <S.ShowcaseContainer>
      <S.ShowcaseGrid>
        <S.ShowcaseItem>
          <S.Label>Mais Vendidos</S.Label>
          <MenuItemsSectionWithMockData title="Mais Vendidos" items={mockBestSellersItems} sectionType="best-sellers" />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <S.Label>Pratos Especiais</S.Label>
          <MenuItemsSectionWithMockData title="Pratos Especiais" items={mockCustomItems} sectionType="custom" />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <S.Label>Promoções</S.Label>
          <MenuItemsSectionWithMockData title="Promoções" items={mockDiscountItems} sectionType="discount" />
        </S.ShowcaseItem>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
