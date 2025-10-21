import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  overflow: hidden;
`

export const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.white};
  overflow-x: auto;
`

export const TabButton = styled.button<{ $isActive: boolean }>`
  background: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.red : theme.colors.mx.white)};
  border: none;
  border-right: 1px solid ${({ theme }) => theme.colors.mx.black};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.white : theme.colors.mx.black)};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  white-space: nowrap;
  position: relative;

  &:hover {
    background: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.red : theme.colors.mx.red)}20;
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.white : theme.colors.mx.red)};
    transform: translateY(-2px);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.red};
  }

  &:last-child {
    border-right: none;
  }
`

export const TabContent = styled.div`
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.mx.white};
`

export const TabPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`

export const TabPlaceholderIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.mx.black};
`

export const TabPlaceholderTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const TabPlaceholderText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  margin: 0;
  max-width: 300px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.mx.black};
  opacity: 0.8;
`

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  > div:not(:last-child) {
    width: 100%;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-direction: row;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing.lg};

    > div:not(:last-child) {
      flex: 1;
      min-width: 0;
    }
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

export const ActionsRowButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  > * {
    width: 100%;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-direction: row;
    width: auto;
    flex-shrink: 0;

    > * {
      width: auto;
    }
  }

  .popoverTrigger {
    width: 100%;

    @media ${({ theme }) => theme.breakpoints.lg} {
      width: auto;
    }
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  text-transform: uppercase;
`

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const EmptyState = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.mx.yellow} 0%,
      ${({ theme }) => theme.colors.mx.red} 100%
    );
    opacity: 0.02;
    pointer-events: none;
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  }
`

export const EmptyStateIcon = styled.div`
  justify-self: center;
  color: ${({ theme }) => theme.colors.mx.gray[400]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const EmptyStateTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const EmptyStateDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`
