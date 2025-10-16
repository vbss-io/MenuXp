import styled from 'styled-components'

export const CheckboxContainer = styled.div`
  &.form-checkbox {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};

    .checkboxContainer {
      .checkboxRoot {
        background-color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
        transition: all ${({ theme }) => theme.animations.durations.normal}
          ${({ theme }) => theme.animations.easings.ease};

        &:checked {
          background-color: ${({ theme }) => theme.colors.primary};
          border-color: ${({ theme }) => theme.colors.primary};

          .checkboxIconContainer {
            color: ${({ theme }) => theme.colors.mx.white};
            filter: invert(1);
          }
        }

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.secondary};
          border-color: ${({ theme }) => theme.colors.secondary};

          .checkboxIconContainer {
            color: ${({ theme }) => theme.colors.mx.white};
            filter: invert(1);
          }
        }
      }

      .checkboxLabel {
        font-family: ${({ theme }) => theme.typography.fonts.title};
        font-size: ${({ theme }) => theme.typography.fontSizes.sm};
        color: ${({ theme }) => theme.colors.mx.black};
        transition: color ${({ theme }) => theme.animations.durations.normal}
          ${({ theme }) => theme.animations.easings.ease};

        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`
