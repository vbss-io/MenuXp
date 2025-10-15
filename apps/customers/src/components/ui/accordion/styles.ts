import styled from 'styled-components'

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`

export const AccordionItemContainer = styled.div`
  &.accordion-item {
    background-color: ${({ theme }) => theme.colors.mx.white};
    border: 2px solid ${({ theme }) => theme.colors.mx.black};
    overflow: hidden;
    transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
    width: 100%;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: transform, box-shadow;
  }
`

export const AccordionTrigger = styled.button`
  &.accordion-trigger {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.lg};
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
    text-align: left;

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &.open {
      box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary};
    }
  }
`

export const AccordionTitle = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.mx.black};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.md};
`

export const AccordionIcon = styled.div`
  &.accordion-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.mx.black};
    transition: transform 0.2s ease;
    transform: rotate(0deg);
    flex-shrink: 0;

    &.open {
      transform: rotate(180deg);
    }
  }
`

export const AccordionContent = styled.div`
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.mx.black};
`

export const AccordionContentInner = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`
