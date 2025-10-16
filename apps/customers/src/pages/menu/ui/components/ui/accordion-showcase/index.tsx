import React from 'react'

import { Accordion } from '@menuxp/ui'

import * as S from '../../styles'

export const AccordionShowcase: React.FC = () => {
  const accordionItems = [
    {
      title: 'Informações Básicas',
      content: (
        <div>
          <p>
            Este é o conteúdo do primeiro item do accordion. Aqui você pode colocar qualquer tipo de conteúdo, incluindo
            texto, imagens, formulários ou outros componentes.
          </p>
          <p>O accordion se adapta automaticamente ao layout selecionado, aplicando as cores e estilos apropriados.</p>
        </div>
      )
    },
    {
      title: 'Configurações Avançadas',
      content: (
        <div>
          <p>Segundo item do accordion com configurações mais complexas.</p>
          <ul>
            <li>Item de lista 1</li>
            <li>Item de lista 2</li>
            <li>Item de lista 3</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Sobre o Sistema',
      content: (
        <div>
          <p>Terceiro item do accordion com configurações mais complexas.</p>
          <ul>
            <li>Item de lista 1</li>
            <li>Item de lista 2</li>
            <li>Item de lista 3</li>
          </ul>
        </div>
      )
    }
  ]

  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>Accordion</S.Label>
        <Accordion items={accordionItems} allowMultiple={true} />
      </S.ShowcaseItem>
    </S.ShowcaseContainer>
  )
}
