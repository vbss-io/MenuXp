import styled from 'styled-components'

export const FeatureListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;
  justify-items: center;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }

  @media (min-width: 1024px) {
    justify-items: start;
  }
`

export const FeatureItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`

export const FeatureIconContainer = styled.div<{ $color?: string }>`
  width: 2rem;
  height: 2rem;
  background-color: ${({ $color, theme }) => $color || theme.colors.mx.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.mx.white};
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
`

export const FeatureTextContainer = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  line-height: 1.4;
`
