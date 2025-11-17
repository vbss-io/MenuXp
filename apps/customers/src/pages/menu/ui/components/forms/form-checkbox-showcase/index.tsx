import { FormCheckbox } from '@menuxp/ui'
import React, { useState } from 'react'

import * as S from '../../styles'

export const FormCheckboxShowcase: React.FC = () => {
  const [checkbox1, setCheckbox1] = useState(false)
  const [checkbox2, setCheckbox2] = useState(true)
  const [checkbox3, setCheckbox3] = useState(false)

  return (
    <S.ShowcaseGrid>
      <S.ShowcaseItem>
        <S.Label>Checkbox Padrão</S.Label>
        <FormCheckbox
          id="checkbox-1"
          label="Aceito os termos e condições"
          checked={checkbox1}
          onCheckedChange={setCheckbox1}
        />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Checkbox Marcado</S.Label>
        <FormCheckbox
          id="checkbox-2"
          label="Receber notificações por email"
          checked={checkbox2}
          onCheckedChange={setCheckbox2}
        />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Checkbox Desabilitado</S.Label>
        <FormCheckbox id="checkbox-3" label="Opção desabilitada" checked={true} disabled />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Checkbox Desabilitado (Desmarcado)</S.Label>
        <FormCheckbox id="checkbox-4" label="Opção desabilitada e desmarcada" checked={false} disabled />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Checkbox com Ícone Personalizado</S.Label>
        <FormCheckbox
          id="checkbox-custom-icon"
          label="Checkbox com ícone personalizado"
          checked={checkbox3}
          onCheckedChange={setCheckbox3}
          icon="✓"
        />
      </S.ShowcaseItem>
    </S.ShowcaseGrid>
  )
}
