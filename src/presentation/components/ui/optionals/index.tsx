import { MinusIcon, PlusIcon } from '@phosphor-icons/react'

import { Button } from '@/presentation/components/ui/button'
import { FormInput } from '@/presentation/components/ui/form-input'

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
              <FormInput
                id={`optional-name-${index}`}
                label="Nome do Opcional *"
                placeholder="Ex: Queijo Extra"
                value={optional.name}
                onChange={(e) => updateOptional(index, 'name', e.target.value)}
                disabled={disabled}
                fontSize="sm"
              />
            </S.InputGroup>
            <S.InputGroup>
              <FormInput
                id={`optional-max-${index}`}
                label="Quantidade Máxima"
                type="number"
                placeholder="Deixe vazio para ilimitado"
                value={optional.maxQuantity?.toString() || ''}
                onChange={(e) => updateOptional(index, 'maxQuantity', e.target.value)}
                disabled={disabled}
                fontSize="sm"
                min="0"
              />
            </S.InputGroup>
            <S.InputGroup>
              <FormInput
                id={`optional-price-${index}`}
                label="Preço *"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={optional.price.toString()}
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
                leftIcon={<MinusIcon size={16} />}
              >
                Remover
              </Button>
            </S.RemoveButtonContainer>
          </S.OptionalGrid>
        </S.OptionalContainer>
      ))}
      <S.AddButtonContainer>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={addOptional}
          disabled={disabled}
          leftIcon={<PlusIcon size={16} />}
        >
          Adicionar Opcional
        </Button>
      </S.AddButtonContainer>
    </S.Container>
  )
}
