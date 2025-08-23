import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Input } from '@vbss-ui/input'

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

// To-Do: Recaftor styles

export function OptionalsSection({ optionals, setOptionals, disabled = false }: OptionalsSectionProps) {
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
      newOptionals[index] = {
        ...newOptionals[index],
        [field]: value === '' ? undefined : Number(value)
      }
    } else {
      newOptionals[index] = {
        ...newOptionals[index],
        [field]: field === 'price' ? Number(value) : value
      }
    }
    setOptionals(newOptionals)
  }

  return (
    <S.Container>
      <S.SectionTitle>Opcionais/Incrementos</S.SectionTitle>
      <S.Description>
        Adicione opcionais que podem ser selecionados pelos clientes (ex: queijo extra, bacon, etc.)
      </S.Description>
      {optionals.map((optional, index) => (
        <S.OptionalContainer key={index}>
          <S.OptionalGrid>
            <S.InputGroup>
              <S.Label>Nome do Opcional *</S.Label>
              <Input
                placeholder="Ex: Queijo Extra"
                value={optional.name}
                onChange={(e) => updateOptional(index, 'name', e.target.value)}
                disabled={disabled}
                fontSize="sm"
              />
            </S.InputGroup>
            <S.InputGroup>
              <S.Label>Quantidade Máxima</S.Label>
              <Input
                type="number"
                placeholder="Deixe vazio para ilimitado"
                value={optional.maxQuantity || ''}
                onChange={(e) => updateOptional(index, 'maxQuantity', e.target.value)}
                disabled={disabled}
                fontSize="sm"
                min="0"
              />
            </S.InputGroup>
            <S.InputGroup>
              <S.Label>Preço *</S.Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={optional.price}
                onChange={(e) => updateOptional(index, 'price', e.target.value)}
                disabled={disabled}
                fontSize="sm"
                min="0"
              />
            </S.InputGroup>
            <S.RemoveButtonContainer>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeOptional(index)}
                disabled={disabled}
                icon={<MinusIcon size={16} />}
              >
                Remover
              </Button>
            </S.RemoveButtonContainer>
          </S.OptionalGrid>
        </S.OptionalContainer>
      ))}
      <S.AddButtonContainer>
        <Button type="button" variant="outlineSolid" size="md" onClick={addOptional} disabled={disabled}>
          <PlusIcon size={16} /> Adicionar Opcional
        </Button>
      </S.AddButtonContainer>
    </S.Container>
  )
}
