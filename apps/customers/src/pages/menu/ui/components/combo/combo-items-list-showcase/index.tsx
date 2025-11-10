import { ComboItemsList } from '@/components/combo/combo-items-list'
import type { ComboItem } from '@/types/combo'

import * as S from '../../styles'

const mockComboItems2Items: ComboItem[] = [
  {
    menuItemId: '1',
    name: 'Hambúrguer Artesanal',
    quantity: 1,
    price: 24.9
  },
  {
    menuItemId: '2',
    name: 'Batata Frita Grande',
    quantity: 1,
    price: 12.0
  }
]

const mockComboItems3Items: ComboItem[] = [
  {
    menuItemId: '3',
    name: 'Pizza Grande Calabresa',
    quantity: 1,
    price: 45.0
  },
  {
    menuItemId: '4',
    name: 'Refrigerante 2L',
    quantity: 1,
    price: 10.0
  },
  {
    menuItemId: '5',
    name: 'Sobremesa do Dia',
    quantity: 1,
    price: 8.5
  }
]

const mockComboItems4Items: ComboItem[] = [
  {
    menuItemId: '6',
    name: 'Prato Principal',
    quantity: 1,
    price: 22.0
  },
  {
    menuItemId: '7',
    name: 'Arroz e Feijão',
    quantity: 1,
    price: 8.0
  },
  {
    menuItemId: '8',
    name: 'Salada',
    quantity: 1,
    price: 6.0
  },
  {
    menuItemId: '9',
    name: 'Suco Natural',
    quantity: 1,
    price: 5.0
  }
]

const mockComboItemsWithMultipleQuantities: ComboItem[] = [
  {
    menuItemId: '10',
    name: 'Sushi Sortido',
    quantity: 30,
    price: 3.0
  },
  {
    menuItemId: '11',
    name: 'Temaki Salmão',
    quantity: 2,
    price: 12.0
  },
  {
    menuItemId: '12',
    name: 'Yakisoba',
    quantity: 1,
    price: 18.0
  }
]

const mockComboItemsLongNames: ComboItem[] = [
  {
    menuItemId: '13',
    name: 'Pizza Especial da Casa com Borda Recheada de Catupiry e Bacon',
    quantity: 1,
    price: 52.0
  },
  {
    menuItemId: '14',
    name: 'Refrigerante Guaraná Antarctica Zero Açúcar Lata 350ml',
    quantity: 2,
    price: 5.5
  }
]

const mockComboItemsBreakfast: ComboItem[] = [
  {
    menuItemId: '15',
    name: 'Café Expresso',
    quantity: 1,
    price: 5.0
  },
  {
    menuItemId: '16',
    name: 'Pão na Chapa com Manteiga',
    quantity: 2,
    price: 4.0
  },
  {
    menuItemId: '17',
    name: 'Suco de Laranja Natural',
    quantity: 1,
    price: 6.0
  },
  {
    menuItemId: '18',
    name: 'Frutas da Estação',
    quantity: 1,
    price: 7.0
  }
]

export const ComboItemsListShowcase: React.FC = () => {
  return (
    <S.ShowcaseContainer>
      <S.Label>ComboItemsList</S.Label>
      <S.ShowcaseGrid>
        <S.ShowcaseItem>
          <ComboItemsList items={mockComboItems2Items} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ComboItemsList items={mockComboItems3Items} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ComboItemsList items={mockComboItems4Items} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ComboItemsList items={mockComboItemsWithMultipleQuantities} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ComboItemsList items={mockComboItemsLongNames} />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <ComboItemsList items={mockComboItemsBreakfast} />
        </S.ShowcaseItem>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
