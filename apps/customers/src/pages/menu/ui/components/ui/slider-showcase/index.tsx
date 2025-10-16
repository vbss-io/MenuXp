import { GearIcon } from '@phosphor-icons/react'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, FormInput, Slider } from '@menuxp/ui'

import * as S from '../../styles'

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

export const DemoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  }

  p {
    margin: 0;
    line-height: 1.6;
  }
`

export const SliderShowcase: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenWithoutHeader, setIsOpenWithoutHeader] = useState(false)

  return (
    <S.ShowcaseContainer>
      <S.ShowcaseItem>
        <S.Label>Slider Component</S.Label>
        <ButtonGrid>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            Slider Padrão
          </Button>
          <Button variant="secondary" onClick={() => setIsOpenWithoutHeader(true)}>
            Sem Header
          </Button>
        </ButtonGrid>
      </S.ShowcaseItem>
      <Slider isOpen={isOpen} onClose={() => setIsOpen(false)} title="Configurações" icon={<GearIcon size={24} />}>
        <DemoContent>
          <h3>Slider Padrão</h3>
          <p>Este é um slider lateral que desliza da direita com header completo.</p>
          <FormInput id="example" label="Campo de exemplo" placeholder="Digite algo..." />
          <p>Perfeito para formulários, configurações e informações detalhadas.</p>
        </DemoContent>
      </Slider>
      <Slider isOpen={isOpenWithoutHeader} onClose={() => setIsOpenWithoutHeader(false)} showHeader={false}>
        <DemoContent>
          <h3>Slider Sem Header</h3>
          <p>Este slider não possui header, oferecendo mais espaço para o conteúdo.</p>
          <p>Útil quando você quer controlar totalmente o layout interno.</p>
          <Button variant="primary" onClick={() => setIsOpenWithoutHeader(false)}>
            Fechar
          </Button>
        </DemoContent>
      </Slider>
    </S.ShowcaseContainer>
  )
}

SliderShowcase.displayName = 'SliderShowcase'

export default SliderShowcase
