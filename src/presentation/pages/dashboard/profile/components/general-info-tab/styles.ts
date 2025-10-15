import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 400px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
`

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
`

export const AvatarPreview = styled.div<{ $hasImage: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $hasImage }) => ($hasImage ? theme.colors.mx.white : theme.colors.mx.red)};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    font-family: ${({ theme }) => theme.typography.fonts.title};
    color: ${({ theme }) => theme.colors.mx.white};
  }
`

export const AvatarActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const AvatarHint = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  outline: none;
  transition: all ${({ theme }) => theme.animations.durations.fast} ${({ theme }) => theme.animations.easings.ease};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.6;
  }

  &:focus {
    box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.mx.black}10;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:read-only {
    background: ${({ theme }) => theme.colors.mx.black}10;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.red};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const FieldHint = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.mx.black};
`
