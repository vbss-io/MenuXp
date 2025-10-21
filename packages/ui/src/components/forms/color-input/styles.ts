import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }
`

export const ColorPreview = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  background: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }
`

export const HiddenColorInput = styled.input`
  display: none;
`

export const HexInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  color: ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  outline: none;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  text-transform: uppercase;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mx.gray[400]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.blue}20;
  }
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.red};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`
