import styled from 'styled-components'

export const SidebarContainer = styled.div`
  position: fixed;
  top: calc(5rem + 4px);
  left: 0;
  height: calc(100vh - 5rem - 4px);
  background-color: ${({ theme }) => theme.colors.primary};
  z-index: 10;
  flex-direction: column;
  display: none;

  @media ${({ theme }) => theme.breakpoints.md} {
    display: flex;
  }
`

export const ToggleButton = styled.button<{ $isOpen: boolean }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ $isOpen, theme }) => ($isOpen ? theme.spacing.md : '50%')};
  transform: ${({ $isOpen }) => ($isOpen ? 'none' : 'translateX(50%)')};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};
  z-index: 101;
  transition: all 0.2s;
  box-shadow: 1px 1px 0px ${({ theme }) => theme.colors.white};

  &:hover {
    transform: ${({ $isOpen }) => ($isOpen ? 'translate(-1px, -1px)' : 'translateX(50%) translate(-1px, -1px)')};
  }

  &:active {
    transform: ${({ $isOpen }) => ($isOpen ? 'translate(1px, 1px)' : 'translateX(50%) translate(1px, 1px)')};
  }
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  flex: 1;
`

export const MenuItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.secondary : theme.colors.white)};
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid ${({ theme, $isActive }) => ($isActive ? theme.colors.secondary : 'transparent')};
  box-shadow: ${({ theme, $isActive }) => ($isActive ? `2px 2px 0px ${theme.colors.highlight}` : 'none')};
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.secondary)};
    color: ${({ theme, $isActive }) => ($isActive ? 'none' : theme.colors.primary)};
    transform: ${({ $isActive }) => ($isActive ? 'none' : 'translate(-1px, -1px)')};
    box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.highlight};
  }
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
`

export const BottomSection = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: auto;
`

export const LogoutButton = styled(MenuItem)`
  color: ${({ theme }) => theme.colors.red};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.red};
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.highlight};
  }
`
