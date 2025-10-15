import { useState } from 'react'

import { MenuItemOptionals } from '@/components/menu-item/menu-item-optionals'
import type { MenuItemOptional } from '@/types/menu-item'

import * as S from '../../styles'

const mockOptionals: MenuItemOptional[] = [
  {
    name: 'Queijo Extra',
    price: 3.5,
    maxQuantity: 3
  },
  {
    name: 'Bacon',
    price: 4.0,
    maxQuantity: 2
  },
  {
    name: 'Cebola Caramelizada',
    price: 2.5
  },
  {
    name: 'Molho Especial',
    price: 1.5,
    maxQuantity: 5
  },
  {
    name: 'Ovo',
    price: 2.0,
    maxQuantity: 2
  },
  {
    name: 'Picles',
    price: 1.0
  }
]

export const MenuItemOptionalsShowcase = () => {
  const [selectedOptionals, setSelectedOptionals] = useState<Record<string, number>>({})

  const handleOptionalChange = (optionalName: string, increment: boolean) => {
    setSelectedOptionals((prev) => {
      const currentQuantity = prev[optionalName] || 0
      const optional = mockOptionals.find((opt) => opt.name === optionalName)
      const maxQuantity = optional?.maxQuantity
      if (increment) {
        if (!maxQuantity || currentQuantity < maxQuantity) {
          return { ...prev, [optionalName]: currentQuantity + 1 }
        }
      } else if (currentQuantity > 0) {
        return { ...prev, [optionalName]: currentQuantity - 1 }
      }
      return prev
    })
  }

  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>MenuItemOptionals</S.Label>
        <MenuItemOptionals
          optionals={mockOptionals}
          selectedOptionals={selectedOptionals}
          onOptionalChange={handleOptionalChange}
        />
      </S.ShowcaseItem>
    </S.ShowcaseContainer>
  )
}

MenuItemOptionalsShowcase.displayName = 'MenuItemOptionalsShowcase'

export default MenuItemOptionalsShowcase
