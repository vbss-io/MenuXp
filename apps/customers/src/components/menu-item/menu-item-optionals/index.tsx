import { Button, useLayout } from '@menuxp/ui'
import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'
import { useTranslator } from 'vbss-translator'

import type { MenuItemOptional } from '@/types/menu-item'

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
  const { t } = useTranslator()
  const { layout } = useLayout()

  if (!optionals || optionals.length === 0) return null

  return (
    <S.OptionalsContainer className={`menu-item-optionals layout-${layout} ${className || ''}`}>
      <S.OptionalsTitle className="optionals-title">{t('Opcionais')}</S.OptionalsTitle>
      <S.OptionalsList className="optionals-list">
        {optionals.map((optional) => (
          <S.OptionalItem key={optional.name} className="optional-item">
            <S.OptionalInfo className="optional-info">
              <S.OptionalName className="optional-name">
                {t(optional.name, { preferExternal: true, sourceLanguage: 'pt' })}
              </S.OptionalName>
              <S.OptionalPrice className="optional-price">+ R$ {optional.price.toFixed(2)}</S.OptionalPrice>
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
              <S.QuantityDisplay className="quantity-display">
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
