import styled from 'styled-components'

export const FormContainer = styled.div`
  &.client-address-form {
    width: 100%;
  }
`

export const Form = styled.form`
  &.form-container {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

export const SaveAddressOption = styled.div`
  &.save-address-option {
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.mx.gray[50]};
    border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`
