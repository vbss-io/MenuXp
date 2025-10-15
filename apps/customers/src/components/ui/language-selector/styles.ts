import styled from 'styled-components'

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const LanguageTrigger = styled.button`
  &.language-trigger {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    padding: 4px 8px;
    background: ${({ theme }) => theme.colors.mx.white};
    border: 2px solid ${({ theme }) => theme.colors.mx.gray[200]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text.primary};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: transform, border-color, background-color;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
      background: rgba(0, 0, 0, 0.1);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.3);
    }
  }
`

export const LanguageCircle = styled.div`
  &.language-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.mx.gray[100]};
    border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
    transition: all 0.2s ease;
    flex-shrink: 0;

    &.active {
      background: rgba(0, 0, 0, 0.2);
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const LanguageFlag = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 1px;
`

export const LanguageCode = styled.span`
  &.language-code {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 0.5px;
    line-height: 1;
  }
`

export const LanguageList = styled.div`
  &.language-list {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
    min-width: 180px;
    padding: 0;
  }
`

export const LanguageOption = styled.button`
  &.language-option {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.mx.white};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    color: ${({ theme }) => theme.colors.text.primary};
    width: 100%;
    text-align: left;

    &:hover {
      background: rgba(0, 0, 0, 0.15);

      .language-circle {
        border-color: ${({ theme }) => theme.colors.primary};
        background: rgba(0, 0, 0, 0.2);
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.4);
    }

    &.active {
      background: rgba(0, 0, 0, 0.1);
      font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const LanguageName = styled.span`
  flex: 1;
`
