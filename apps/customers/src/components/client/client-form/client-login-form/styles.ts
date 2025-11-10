import styled from 'styled-components'

export const FormContainer = styled.div`
  &.client-login-form {
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.mx.white};
    border: 3px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    padding: ${({ theme }) => theme.spacing.xl};
    box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.mx.black};
    max-width: 400px;
    width: 100%;
    transition: all 0.2s ease;
  }
`

export const Title = styled.h2`
  &.form-title {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    transition: color 0.2s ease;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const SwitchModeButton = styled.button`
  &.switch-mode-button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    text-decoration: underline;
    cursor: pointer;
    margin-top: ${({ theme }) => theme.spacing.md};
    transition: color 0.2s ease;
    width: 100%;
    text-align: center;

    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`
