import { CombosSection } from '@/components/menu-layout-sections/combos-section'
import type { Combo } from '@/types/combo'
import { MenuSectionType, type CombosConfig, type MenuSection } from '@/types/menu-layout'

import * as S from '../../styles'

const mockBestSellersCombos: Combo[] = [
  {
    id: '1',
    name: 'Combo Família',
    description: '2 hambúrgueres, 2 batatas fritas, 2 refrigerantes e 1 sobremesa',
    price: 89.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=16'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Combo Executivo',
    description: '1 prato principal, 1 salada, 1 bebida e 1 sobremesa',
    price: 45.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=17'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Combo Casal',
    description: '2 pratos principais, 1 entrada para compartilhar e 2 bebidas',
    price: 75.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=18'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Combo Kids',
    description: 'Hambúrguer pequeno, batata frita, refrigerante e brinde',
    price: 25.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=19'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const mockCustomCombos: Combo[] = [
  {
    id: '5',
    name: 'Combo Gourmet',
    description: 'Pratos selecionados pelo chef com ingredientes premium',
    price: 125.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=20'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Combo Vegetariano',
    description: 'Seleção de pratos vegetarianos e veganos',
    price: 55.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=21'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    name: 'Combo Fitness',
    description: 'Pratos balanceados com foco em proteínas e vegetais',
    price: 65.9,
    discount: 0,
    medias: ['https://picsum.photos/400/300?random=22'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const mockDiscountCombos: Combo[] = [
  {
    id: '8',
    name: 'Combo Promocional',
    description: 'Hambúrguer + batata + refrigerante com desconto especial',
    price: 35.9,
    discount: 25,
    medias: ['https://picsum.photos/400/300?random=23'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '9',
    name: 'Combo Happy Hour',
    description: 'Pizza média + 2 bebidas com desconto de happy hour',
    price: 42.9,
    discount: 30,
    medias: ['https://picsum.photos/400/300?random=24'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '10',
    name: 'Combo Black Friday',
    description: 'Combo especial com desconto de Black Friday',
    price: 55.9,
    discount: 40,
    medias: ['https://picsum.photos/400/300?random=25'],
    restaurantId: '1',
    categoryId: '1',
    isActive: true,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const CombosSectionWithMockData: React.FC<{
  title: string
  combos: Combo[]
  sectionType: 'best-sellers' | 'custom' | 'discount'
}> = ({ title, combos, sectionType }) => {
  const mockSection: MenuSection = {
    id: sectionType,
    type: MenuSectionType.COMBOS,
    config: {
      type: (() => {
        if (sectionType === 'best-sellers') return 'best_sellers'
        if (sectionType === 'custom') return 'custom'
        return 'discounts'
      })(),
      title,
      comboIds: combos.map((combo) => combo.id)
    } as CombosConfig
  }

  return <CombosSection section={mockSection} mockCombos={combos} />
}

export const CombosSectionShowcase: React.FC = () => {
  return (
    <S.ShowcaseContainer>
      <S.ShowcaseGrid>
        <S.ShowcaseItem>
          <S.Label>Combos Mais Vendidos</S.Label>
          <CombosSectionWithMockData
            title="Combos Mais Vendidos"
            combos={mockBestSellersCombos}
            sectionType="best-sellers"
          />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <S.Label>Combos Especiais</S.Label>
          <CombosSectionWithMockData title="Combos Especiais" combos={mockCustomCombos} sectionType="custom" />
        </S.ShowcaseItem>
        <S.ShowcaseItem>
          <S.Label>Combos em Promoção</S.Label>
          <CombosSectionWithMockData title="Combos em Promoção" combos={mockDiscountCombos} sectionType="discount" />
        </S.ShowcaseItem>
      </S.ShowcaseGrid>
    </S.ShowcaseContainer>
  )
}
