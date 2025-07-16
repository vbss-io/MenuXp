import styled from 'styled-components'

export const SidebarContainer = styled.div`
  height: calc(100vh - 5rem - 4px);
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: column;
  display: none;
  border-radius: 0 ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);

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
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};
  z-index: 101;
  transition: all 0.2s ease;
  box-shadow: 1px 1px 0px ${({ theme }) => theme.colors.white};
  width: 32px;
  height: 32px;

  &:hover {
    transform: ${({ $isOpen }) => ($isOpen ? 'translate(-1px, -1px)' : 'translateX(50%) translate(-1px, -1px)')};
    box-shadow: 2px 2px 0px ${({ theme }) => theme.colors.white};
  }

  &:active {
    transform: ${({ $isOpen }) => ($isOpen ? 'translate(1px, 1px)' : 'translateX(50%) translate(1px, 1px)')};
    box-shadow: 0px 0px 0px ${({ theme }) => theme.colors.white};
  }
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  flex: 1;
`

export const MenuItem = styled.div<{ $isActive?: boolean; $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.white)};
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme, $isActive }) => ($isActive ? theme.colors.white : 'transparent')};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.white : 'transparent')};
  box-shadow: ${({ $isActive }) => ($isActive ? `0 2px 4px rgba(0,0,0,0.1)` : 'none')};
  white-space: nowrap;
  overflow: hidden;
  font-weight: ${({ theme, $isActive }) => ($isActive ? theme.fontWeights.medium : theme.fontWeights.normal)};
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};

  &:hover {
    background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.white : 'rgba(255, 255, 255, 0.1)')};
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.white)};
    transform: ${({ $isActive }) => ($isActive ? 'none' : 'translateY(-1px)')};
    box-shadow: ${({ $isActive }) => ($isActive ? `0 4px 8px rgba(0,0,0,0.15)` : `0 2px 4px rgba(0,0,0,0.1)`)};
  }

  &:active {
    transform: translateY(0px);
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
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: auto;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.md} 0;
`

export const LogoutButton = styled(MenuItem)`
  color: ${({ theme }) => theme.colors.red};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.red};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0px);
  }
`
