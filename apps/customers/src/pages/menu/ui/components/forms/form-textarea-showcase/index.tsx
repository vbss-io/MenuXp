import React, { useState } from 'react'

import { FormTextarea } from '@/components/ui/forms/form-textarea'

import * as S from '../../styles'

export const FormTextareaShowcase: React.FC = () => {
  const [textValue, setTextValue] = useState('')

  return (
    <S.ShowcaseGrid>
      <S.ShowcaseItem>
        <S.Label>Textarea Padrão</S.Label>
        <FormTextarea
          id="textarea-default"
          label="Mensagem"
          placeholder="Digite sua mensagem"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Textarea com Erro</S.Label>
        <FormTextarea id="textarea-error" label="Campo" placeholder="Digite algo" error="Campo obrigatório" />
      </S.ShowcaseItem>
      <S.ShowcaseItem>
        <S.Label>Textarea Desabilitado</S.Label>
        <FormTextarea id="textarea-disabled" label="Campo" placeholder="Desabilitado" disabled />
      </S.ShowcaseItem>
    </S.ShowcaseGrid>
  )
}
