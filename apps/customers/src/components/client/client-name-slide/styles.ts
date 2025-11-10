import styled from 'styled-components'

export const Form = styled.form`
  &.name-form {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`
