import { FormInput } from '@menuxp/ui'
import React, { useState } from 'react'

import * as S from '../../styles'

export const FormInputShowcase: React.FC = () => {
  const [textValue, setTextValue] = useState('')

  return (
    <S.ShowcaseGrid>
      <S.ShowcaseItem>
        <S.Label>Input Padrão</S.Label>
        <FormInput
          id="input-default"
          label="Nome"
          placeholder="Digite seu nome"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Input com Erro</S.Label>
        <FormInput id="input-error" label="Campo" placeholder="Digite algo" error="Campo obrigatório" />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Input Desabilitado</S.Label>
        <FormInput id="input-disabled" label="Campo" placeholder="Desabilitado" disabled />
      </S.ShowcaseItem>
    </S.ShowcaseGrid>
  )
}
