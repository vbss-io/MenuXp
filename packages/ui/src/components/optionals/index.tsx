import { PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Button, FormInput } from '@menuxp/ui'

import * as S from './styles'

export interface MenuItemOptional {
  name: string
  maxQuantity?: number
  price: number
}

interface OptionalsSectionProps {
  optionals: MenuItemOptional[]
  setOptionals: (optionals: MenuItemOptional[]) => void
  disabled?: boolean
}

const OPTIONAL_NAME_MAX_LENGTH = 50
const OPTIONAL_MAX_QUANTITY_LIMIT = 999

export function OptionalsSection({ optionals, setOptionals, disabled = false }: OptionalsSectionProps) {
  const currency = useMemo(() => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }), [])
  const [priceDisplays, setPriceDisplays] = useState<string[]>([])
  useEffect(() => {
    setPriceDisplays(optionals.map(opt => currency.format(opt.price)))
  }, [optionals, currency])

  const addOptional = () => {
    setOptionals([...optionals, { name: '', price: 0 }])
  }

  const removeOptional = (index: number) => {
    const newOptionals = optionals.filter((_, i) => i !== index)
    setOptionals(newOptionals)
  }

  const updateOptional = (index: number, field: keyof MenuItemOptional, value: string | number) => {
    const newOptionals = [...optionals]
    if (field === 'maxQuantity') {
      // Validar limite máximo
      let numValue = value === '' ? undefined : Number(value)
      if (numValue !== undefined && numValue > OPTIONAL_MAX_QUANTITY_LIMIT) {
        numValue = OPTIONAL_MAX_QUANTITY_LIMIT
      }
      newOptionals[index] = {
        ...newOptionals[index],
        [field]: numValue
      }
    } else if (field === 'name') {
      // Validar comprimento máximo do nome
      const stringValue = String(value).slice(0, OPTIONAL_NAME_MAX_LENGTH)
      newOptionals[index] = {
        ...newOptionals[index],
        [field]: stringValue
      }
    } else if (field === 'price') {
      newOptionals[index] = {
        ...newOptionals[index],
        [field]: Number(value)
      }
    }
    setOptionals(newOptionals)
  }

  const handlePriceChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value || ''
      const digitsOnly = raw.replace(/\D/g, '')
      let cents = digitsOnly === '' ? 0 : parseInt(digitsOnly, 10)
      const MAX_CENTS = 99999999
      if (cents > MAX_CENTS) cents = MAX_CENTS
      const value = cents / 100
      updateOptional(index, 'price', value)
      const newDisplays = [...priceDisplays]
      newDisplays[index] = currency.format(value)
      setPriceDisplays(newDisplays)
    },
    [updateOptional, priceDisplays, currency]
  )

  return (
    <S.Container>
      <S.Header>
        <S.Label>Opcionais/Incrementos</S.Label>
        <S.Subtitle>Crie opções como bacon, queijo, molhos. O preço é adicional ao item.</S.Subtitle>
        {optionals.length === 0 && (
          <S.ChipsContainer>
            <S.Chip>Ex.: Queijo Extra</S.Chip>
            <S.Chip>Ex.: Molho Barbecue</S.Chip>
          </S.ChipsContainer>
        )}
      </S.Header>
      {optionals.map((optional, index) => (
        <S.OptionalCard key={index}>
          <S.RemoveButton
            type="button"
            onClick={() => removeOptional(index)}
            disabled={disabled}
            title="Remover opcional"
          >
            <TrashIcon size={16} />
          </S.RemoveButton>
          <S.OptionalGrid>
            <S.InputGroup>
              <FormInput
                id={`optional-name-${index}`}
                label="Nome do opcional *"
                placeholder="Ex.: Queijo Extra"
                value={optional.name}
                onChange={(e) => updateOptional(index, 'name', e.target.value)}
                disabled={disabled}
                fontSize="sm"
                maxLength={OPTIONAL_NAME_MAX_LENGTH}
              />
            </S.InputGroup>
            <S.InputGroup>
              <FormInput
                id={`optional-price-${index}`}
                label="Preço adicional (R$) *"
                type="text"
                placeholder="R$ 0,00"
                value={priceDisplays[index] || 'R$ 0,00'}
                onChange={(e) => handlePriceChange(index, e)}
                disabled={disabled}
                fontSize="sm"
              />
            </S.InputGroup>
            <S.InputGroup>
              <FormInput
                id={`optional-max-${index}`}
                label="Qtd. máx. por item"
                type="number"
                placeholder="Deixe vazio para ilimitado"
                value={optional.maxQuantity?.toString() || ''}
                onChange={(e) => updateOptional(index, 'maxQuantity', e.target.value)}
                disabled={disabled}
                fontSize="sm"
                min="0"
                max={OPTIONAL_MAX_QUANTITY_LIMIT}
              />
            </S.InputGroup>
          </S.OptionalGrid>
        </S.OptionalCard>
      ))}
      <S.AddButtonContainer>
        <Button
          type="button"
          variant="white"
          size="sm"
          onClick={addOptional}
          disabled={disabled}
          leftIcon={<PlusIcon size={16} weight="bold" />}
        >
          Adicionar Opcional
        </Button>
      </S.AddButtonContainer>
    </S.Container>
  )
}
