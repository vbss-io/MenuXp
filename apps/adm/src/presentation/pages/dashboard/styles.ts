import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  overflow: hidden;
`

export const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.black};
  overflow-x: auto;
`

export const TabButton = styled.button<{ $isActive: boolean }>`
  background: ${({ theme, $isActive }) => $isActive && theme.colors.mx.red};
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

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.mx.black};
    outline-offset: 2px;
  }

  &:last-child {
    border-right: none;
  }

  .tab-icon {
    display: inline-flex;
    align-items: center;

    @media (max-width: 768px) {
      display: none;
    }
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
  gap: ${({ theme }) => theme.spacing.md};
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

  input:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.mx.black};
    outline-offset: 2px;
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

  button:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.mx.black};
    outline-offset: 2px;
  }

  .button {
    min-width: 200px;

    @media (max-width: 768px) {
      min-width: auto;
      width: 100%;
    }
  }

  .button.icon-only {
    min-width: auto;
    width: auto;
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
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

export const EmptyStateIcon = styled.div`
  justify-self: center;
  color: ${({ theme }) => theme.colors.mx.gray[500]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
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

export const TabSubtitle = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.mx.yellow}10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.gray[600]};
  text-align: center;
  opacity: 0.9;
`

export const EmptyStateChecklist = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
`

export const ChecklistItem = styled.li`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.gray[600]};
`

export const EmptyStateHelp = styled.button`
  margin-top: ${({ theme }) => theme.spacing.md};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.mx.blue};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.mx.black};
    outline-offset: 2px;
  }
`

export const HelpIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-left: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.mx.gray[600]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
    border-color: ${({ theme }) => theme.colors.mx.black};
    color: ${({ theme }) => theme.colors.mx.black};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.mx.black};
    outline-offset: 2px;
  }
`

export const HelpPopoverContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 300px;
`

export const HelpTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

export const HelpList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  li {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    color: ${({ theme }) => theme.colors.mx.gray[700]};
    line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
    padding-left: ${({ theme }) => theme.spacing.md};
    position: relative;

    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.mx.gray[500]};
    }
  }
`

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
  flex: 1;
`

export const SearchLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.gray[700]};
  opacity: 0.85;
`

export const EmptyStateButton = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  max-width: 280px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  button {
    width: 100%;
  }
`
