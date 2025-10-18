import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  letter-spacing: 0.2px;
  display: block;
  margin: 0;
`

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.gray[500]};
  margin: 0 !important;
  margin-bottom: 0 !important;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  opacity: 0.85;
`

export const ChipsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: 0;
`

export const Chip = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.gray[600]};
  border: 1px dashed ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.spacing.xxs} ${({ theme }) => theme.spacing.sm};
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.mx.white};
`

export const OptionalCard = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.black};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`


export const RemoveButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  color: ${({ theme }) => theme.colors.mx.gray[500]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.mx.red}10;
    border-color: ${({ theme }) => theme.colors.mx.red};
    color: ${({ theme }) => theme.colors.mx.red};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mx.red};
    outline-offset: 1px;
  }
`

export const OptionalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.sm};

  @media ${({ theme }) => theme.breakpoints.md} {
    grid-template-columns: 2fr 1.2fr 1.2fr;
    align-items: start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.xs};

  .button {
    width: fit-content !important;
    min-width: 200px;
    
    &.white:hover {
      background: ${({ theme }) => theme.colors.mx.yellow} !important;
      border-color: ${({ theme }) => theme.colors.mx.black} !important;
    }
  }
`

