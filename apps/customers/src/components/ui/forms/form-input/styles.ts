import styled from 'styled-components'

export const StyledInputContainer = styled.div`
  &.form-input {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};

    .inputRoot {
      .inputLabel {
        font-size: ${({ theme }) => theme.typography.fontSizes.xs};
        font-family: ${({ theme }) => theme.typography.fonts.title};
        color: ${({ theme }) => theme.colors.mx.black};
        margin-bottom: ${({ theme }) => theme.spacing.xs};
        transition: color ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};

        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }

      .inputContainer {
        .inputContent {
          .input {
            background-color: ${({ theme }) => theme.colors.mx.white};
            color: ${({ theme }) => theme.colors.mx.black};
            transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};

            &::placeholder {
              color: ${({ theme }) => theme.colors.mx.gray[500]};
            }

            &:focus {
              border-color: ${({ theme }) => theme.colors.primary};
              box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
            }
          }
        }
      }

      .inputError {
        color: ${({ theme }) => theme.colors.error};
        font-size: ${({ theme }) => theme.typography.fontSizes.xs};
        font-family: ${({ theme }) => theme.typography.fonts.body};
      }
    }
  }
`
