import styled from 'styled-components'

export const Container = styled.div`
  &.verification-step {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px 0;
  }
`

export const Title = styled.h3`
  &.verification-title {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }
`

export const Description = styled.p`
  &.verification-description {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
    line-height: 1.5;
  }
`

export const CodeInputContainer = styled.div`
  &.code-input-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`

export const CodeInputLabel = styled.label`
  &.code-input-label {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const CodeInput = styled.input`
  &.code-input {
    width: 100%;
    padding: 12px 16px;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 8px;
    text-align: center;
    border: 2px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 0;
    background: ${({ theme }) => theme.colors.mx.white};
    color: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 2px 2px 0 ${({ theme }) => theme.colors.mx.black};
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--restaurant-primary-color);
      box-shadow: 3px 3px 0 var(--restaurant-primary-color);
    }

    &::placeholder {
      letter-spacing: normal;
      font-size: 14px;
      font-weight: 400;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &.code-input.error {
    border-color: ${({ theme }) => theme.colors.error};
    box-shadow: 2px 2px 0 ${({ theme }) => theme.colors.error};
  }

  &.code-input.success {
    border-color: ${({ theme }) => theme.colors.success};
    box-shadow: 2px 2px 0 ${({ theme }) => theme.colors.success};
  }
`

export const TimerContainer = styled.div`
  &.timer-container {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: ${({ theme }) => theme.colors.mx.gray[100]};
    border-left: 3px solid var(--restaurant-primary-color);
  }
`

export const TimerText = styled.p`
  &.timer-text {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`

export const TimerValue = styled.span`
  &.timer-value {
    font-weight: 600;
    color: var(--restaurant-primary-color);
  }
`

export const ResendContainer = styled.div`
  &.resend-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
`

export const ResendText = styled.p`
  &.resend-text {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`

export const ResendButton = styled.button`
  &.resend-button {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    color: var(--restaurant-primary-color);
    background: transparent;
    border: 2px solid var(--restaurant-primary-color);
    border-radius: 0;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: var(--restaurant-primary-color);
      color: ${({ theme }) => theme.colors.mx.white};
      box-shadow: 2px 2px 0 ${({ theme }) => theme.colors.mx.black};
      transform: translate(-2px, -2px);
    }

    &:active:not(:disabled) {
      transform: translate(0, 0);
      box-shadow: 0 0 0 ${({ theme }) => theme.colors.mx.black};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

export const ErrorMessage = styled.p`
  &.error-message {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.error};
    margin: 0;
    text-align: center;
  }
`

export const SuccessMessage = styled.p`
  &.success-message {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.success};
    margin: 0;
    text-align: center;
    font-weight: 600;
  }
`
