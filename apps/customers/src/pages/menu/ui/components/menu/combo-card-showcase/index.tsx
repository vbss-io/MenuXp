import { ComboCard } from '@/components/combo/combo-card'
import type { Combo } from '@/types/combo'

import * as S from '../../styles'

const mockCombos: Combo[] = [
  {
    id: '1',
    name: 'Combo Família',
    description: '2 pizzas grandes, 1 refrigerante 2L e 1 sobremesa',
    categoryId: 'combos',
    price: 89.9,
    discount: 15,
    medias: ['https://picsum.photos/400/300?random=101'],
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        menuItemId: '1',
        quantity: 2,
        name: 'Pizza Grande',
        price: 35.0
      },
      {
        menuItemId: '2',
        quantity: 1,
        name: 'Refrigerante 2L',
        price: 12.0
      },
      {
        menuItemId: '3',
        quantity: 1,
        name: 'Sobremesa',
        price: 10.0
      }
    ]
  },
  {
    id: '2',
    name: 'Combo Lanche Completo',
    description: 'Hambúrguer artesanal, batata frita grande e refrigerante',
    categoryId: 'combos',
    price: 35.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=102'],
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        menuItemId: '4',
        quantity: 1,
        name: 'Hambúrguer Artesanal',
        price: 24.9
      },
      {
        menuItemId: '5',
        quantity: 1,
        name: 'Batata Frita Grande',
        price: 12.0
      },
      {
        menuItemId: '6',
        quantity: 1,
        name: 'Refrigerante',
        price: 6.0
      }
    ]
  },
  {
    id: '3',
    name: 'Combo Executivo',
    description: 'Prato principal, acompanhamento, sobremesa e suco natural',
    categoryId: 'combos',
    price: 28.5,
    discount: 20,
    medias: ['https://picsum.photos/400/300?random=103'],
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        menuItemId: '7',
        quantity: 1,
        name: 'Prato Principal',
        price: 22.0
      },
      {
        menuItemId: '8',
        quantity: 1,
        name: 'Acompanhamento',
        price: 8.0
      },
      {
        menuItemId: '9',
        quantity: 1,
        name: 'Sobremesa',
        price: 7.0
      },
      {
        menuItemId: '10',
        quantity: 1,
        name: 'Suco Natural',
        price: 5.0
      }
    ]
  },
  {
    id: '4',
    name: 'Combo Sushi Premium',
    description: '30 peças sortidas, hossomaki, temaki e yakisoba',
    categoryId: 'combos',
    price: 95.0,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=104'],
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        menuItemId: '11',
        quantity: 30,
        name: 'Sushi Sortido',
        price: 3.0
      },
      {
        menuItemId: '12',
        quantity: 1,
        name: 'Yakisoba',
        price: 18.0
      },
      {
        menuItemId: '13',
        quantity: 2,
        name: 'Temaki',
        price: 12.0
      }
    ]
  },
  {
    id: '5',
    name: 'Combo Café da Manhã',
    description: 'Café, pão na chapa, suco de laranja e frutas',
    categoryId: 'combos',
    price: 18.9,
    discount: 10,
    medias: ['https://picsum.photos/400/300?random=105'],
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        menuItemId: '14',
        quantity: 1,
        name: 'Café',
        price: 5.0
      },
      {
        menuItemId: '15',
        quantity: 1,
        name: 'Pão na Chapa',
        price: 8.0
      },
      {
        menuItemId: '16',
        quantity: 1,
        name: 'Suco de Laranja',
        price: 6.0
      },
      {
        menuItemId: '17',
        quantity: 1,
        name: 'Frutas',
        price: 4.0
      }
    ]
  },
  {
    id: '6',
    name: 'Combo Happy Hour',
    description: '10 petiscos variados e 4 cervejas ou refrigerantes',
    categoryId: 'combos',
    price: 65.0,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=106'],
    restaurantId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        menuItemId: '18',
        quantity: 10,
        name: 'Petiscos Variados',
        price: 5.0
      },
      {
        menuItemId: '19',
        quantity: 4,
        name: 'Bebidas',
        price: 8.0
      }
    ]
  }
]

export const ComboCardShowcase: React.FC = () => {
  const handleComboClick = (combo: Combo) => {
    console.log('Combo clicked:', combo.name)
  }

  return (
    <S.ShowcaseContainer>
      <S.Label>ComboCard</S.Label>
      <S.ShowcaseGrid>
        {mockCombos.map((combo) => (
          <S.ShowcaseItem key={combo.id}>
            <ComboCard item={combo} onClick={handleComboClick} />
          </S.ShowcaseItem>
        ))}
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
