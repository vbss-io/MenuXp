import { styled } from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`

export const TimeInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.mx.red : theme.colors.mx.black)};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  outline: none;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};

  &::placeholder {
    color: ${({ theme }) => theme.colors.mx.gray[400]};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.mx.red : theme.colors.mx.blue)};
    box-shadow: 0 0 0 2px
      ${({ theme, $hasError }) => ($hasError ? `${theme.colors.mx.red}20` : `${theme.colors.mx.blue}20`)};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
    color: ${({ theme }) => theme.colors.mx.gray[500]};
    cursor: not-allowed;
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
  }

  &::-moz-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
  }
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.red};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`