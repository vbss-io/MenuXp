import { CategoriesSection } from '@/components/menu-layout-sections/categories-section'
import type { Category } from '@/types/category'
import { MenuSectionType, type MenuSection } from '@/types/menu-layout'

import * as S from '../../styles'

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Pizzas',
    description: 'Pizzas artesanais',
    icon: 'pizza',
    isActive: true,
    optionals: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Hambúrgueres',
    description: 'Hambúrgueres gourmet',
    icon: 'hamburger',
    isActive: true,
    optionals: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Bebidas',
    description: 'Refrigerantes e sucos',
    icon: 'drink',
    isActive: true,
    optionals: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Sobremesas',
    description: 'Doces e sorvetes',
    icon: 'dessert',
    isActive: true,
    optionals: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Saladas',
    description: 'Saladas frescas',
    icon: 'salad',
    isActive: true,
    optionals: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Massas',
    description: 'Massas italianas',
    icon: 'pasta',
    isActive: true,
    optionals: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    name: 'Carnes',
    description: 'Carnes grelhadas',
    icon: 'steak',
    isActive: true,
    optionals: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    name: 'Peixes',
    description: 'Peixes frescos',
    icon: 'fish',
    isActive: true,
    optionals: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const CategoriesSectionWithMockData: React.FC = () => {
  const mockSection: MenuSection = {
    id: 'categories-showcase',
    type: MenuSectionType.CATEGORIES,
    config: {
      categoryIds: mockCategories.map((cat) => cat.id)
    }
  }

  return <CategoriesSection section={mockSection} mockCategories={mockCategories} />
}

export const CategoriesSectionShowcase: React.FC = () => {
  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>Categories Section</S.Label>
        <CategoriesSectionWithMockData />
      </S.ShowcaseItem>
    </S.ShowcaseContainer>
  )
}
