import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'

import { useRestaurant } from '@/hooks/use-restaurant'
import type { MenuItemOptional } from '@/types/menu-item'
import { Button } from '@menuxp/ui'

import * as S from './styles'

interface MenuItemOptionalsProps {
  optionals: MenuItemOptional[]
  selectedOptionals: Record<string, number>
  onOptionalChange: (optionalName: string, increment: boolean) => void
  className?: string
}

export const MenuItemOptionals: React.FC<MenuItemOptionalsProps> = ({
  optionals,
  selectedOptionals,
  onOptionalChange,
  className
}) => {
  const { primaryColor, secondaryColor, layout } = useRestaurant()

  if (!optionals || optionals.length === 0) return null

  return (
    <S.OptionalsContainer
      $layout={layout}
      $primaryColor={primaryColor}
      $secondaryColor={secondaryColor}
      className={className}
      style={
        {
          '--primary': primaryColor,
          '--secondary': secondaryColor
        } as React.CSSProperties
      }
    >
      <S.OptionalsTitle
        $layout={layout}
        $primaryColor={primaryColor}
        $secondaryColor={secondaryColor}
        className="optionals-title"
      >
        Opcionais
      </S.OptionalsTitle>
      <S.OptionalsList $layout={layout} className="optionals-list">
        {optionals.map((optional) => (
          <S.OptionalItem
            key={optional.name}
            $layout={layout}
            $primaryColor={primaryColor}
            $secondaryColor={secondaryColor}
            className="optional-item"
          >
            <S.OptionalInfo className="optional-info">
              <S.OptionalName
                $layout={layout}
                $primaryColor={primaryColor}
                $secondaryColor={secondaryColor}
                className="optional-name"
              >
                {optional.name}
              </S.OptionalName>
              <S.OptionalPrice
                $layout={layout}
                $primaryColor={primaryColor}
                $secondaryColor={secondaryColor}
                className="optional-price"
              >
                + R$ {optional.price.toFixed(2)}
              </S.OptionalPrice>
            </S.OptionalInfo>
            <S.OptionalControls className="optional-controls">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOptionalChange(optional.name, false)}
                disabled={!selectedOptionals[optional.name] || selectedOptionals[optional.name] === 0}
              >
                <MinusIcon size={16} />
              </Button>
              <S.QuantityDisplay
                $layout={layout}
                $primaryColor={primaryColor}
                $secondaryColor={secondaryColor}
                className="quantity-display"
              >
                {selectedOptionals[optional.name] || 0}
              </S.QuantityDisplay>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOptionalChange(optional.name, true)}
                disabled={
                  optional.maxQuantity ? (selectedOptionals[optional.name] || 0) >= optional.maxQuantity : false
                }
              >
                <PlusIcon size={16} />
              </Button>
            </S.OptionalControls>
          </S.OptionalItem>
        ))}
      </S.OptionalsList>
    </S.OptionalsContainer>
  )
}

MenuItemOptionals.displayName = 'MenuItemOptionals'
