import { motion } from 'framer-motion'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 10;
`

export const HeaderContent = styled.div`
  height: 5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  img {
    width: 200px;
    height: auto;
  }
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  .avatar-wrapper {
    display: none;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    .menu {
      display: none !important;
    }

    .avatar-wrapper {
      display: flex;
    }
  }
`

export const ButtonsContainer = styled.div`
  display: none;
  gap: ${({ theme }) => theme.spacing.sm};

  @media ${({ theme }) => theme.breakpoints.md} {
    display: flex;
    align-items: center;
  }
`

export const MobileButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const UserActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 200px;
  padding: ${({ theme }) => theme.spacing.sm};
`

export const UserInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
`

export const UserEmail = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.8;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const MobileContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  z-index: 1000;
  display: flex;
  flex-direction: column;

  .close-menu {
    position: absolute;
    max-width: ${({ theme }) => theme.spacing.xl};
    height: ${({ theme }) => theme.spacing.xl};
    justify-self: flex-end;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    z-index: 1;
  }
`

export const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  overflow-y: auto;
  justify-content: center;
`

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
`

export const MobileNavLink = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-decoration: none;
  transition: color 0.2s;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
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
  justify-content: flex-start;

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
