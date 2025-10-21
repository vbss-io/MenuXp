import styled from 'styled-components'

export const StyledTextareaContainer = styled.div`
  &.form-textarea {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};

    .textareaContainer {
      .textareaLabel {
        font-size: ${({ theme }) => theme.typography.fontSizes.xs};
        font-family: ${({ theme }) => theme.typography.fonts.body};
        color: ${({ theme }) => theme.colors.mx.black};
        margin-bottom: ${({ theme }) => theme.spacing.xs};
        transition: color ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
      }

      .textarea {
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
`
