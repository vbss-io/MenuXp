import React, { useState } from 'react'

import { Combobox, type ComboboxOption } from '@menuxp/ui'

import * as S from '../../styles'

export const ComboboxShowcase: React.FC = () => {
  const [value, setValue] = useState('')

  const mockOptions: ComboboxOption[] = [
    { label: 'Opção 1', value: 'option1', displayLabel: 'Primeira Opção' },
    { label: 'Opção 2', value: 'option2', displayLabel: 'Segunda Opção' },
    { label: 'Opção 3', value: 'option3', displayLabel: 'Terceira Opção' },
    { label: 'Opção 4', value: 'option4', displayLabel: 'Quarta Opção' },
    { label: 'Opção 5', value: 'option5', displayLabel: 'Quinta Opção' }
  ]

  const handleSearch = async (searchTerm: string): Promise<ComboboxOption[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (!searchTerm) {
      return mockOptions
    }

    return mockOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.displayLabel?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <S.ShowcaseGrid>
      <S.ShowcaseItem>
        <S.Label>Combobox</S.Label>
        <Combobox
          label="Selecione uma opção"
          placeholder="Digite para buscar..."
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
        />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Combobox com Erro</S.Label>
        <Combobox
          label="Combobox com erro"
          placeholder="Digite para buscar..."
          error="Este campo é obrigatório"
          value=""
          onChange={() => {}}
          onSearch={handleSearch}
        />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Combobox Desabilitado</S.Label>
        <Combobox
          label="Combobox desabilitado"
          placeholder="Desabilitado"
          value="option1"
          onChange={() => {}}
          onSearch={handleSearch}
          disabled
        />
      </S.ShowcaseItem>
    </S.ShowcaseGrid>
  )
}
