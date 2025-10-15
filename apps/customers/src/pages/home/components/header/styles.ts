import { motion } from 'framer-motion'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.mx.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
  z-index: ${({ theme }) => theme.zIndex.sticky};
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

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  border: 1px solid transparent;
  transition: all 0.2s ease;

  img {
    width: 120px;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    transition: all 0.2s ease;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.02);
  }
`

export const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  .user-menu-trigger {
    background: transparent;
    border: none;
    padding: 0;

    &:hover {
      background: transparent;
    }
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

export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.mx.black};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
    background-color: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:active {
    transform: translateY(0px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:focus {
    outline: none;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    display: none;
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

export const UserMenuWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const MobileButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const MobileUserSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
`

export const UserMenuSection = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
`

export const MobileMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const MobileMenuItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.mx.white};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  font-weight: ${({ theme, $isActive }) =>
    $isActive ? theme.typography.fontWeights.bold : theme.typography.fontWeights.medium};
  justify-content: flex-start;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  height: 40px;
  box-sizing: border-box;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    background-color: ${theme.colors.mx.yellow};
    border: 2px solid ${theme.colors.mx.white};
    box-shadow: ${theme.shadows.brutalist};
    color: ${theme.colors.mx.black};
  `}

  &:hover {
    ${({ $isActive, theme }) =>
      !$isActive &&
      `
      background-color: ${theme.colors.mx.white};
      color: ${theme.colors.mx.black};
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.brutalist};
    `}
  }

  &:active {
    ${({ $isActive, theme }) =>
      !$isActive &&
      `
      transform: translateY(0px);
      box-shadow: ${theme.shadows.sm};
    `}
  }
`

export const MobileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
  color: inherit;
`

export const HomeNavSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const HomeNavTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.mx.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const HomeNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const HomeNavLink = styled.a`
  display: block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.white};
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.colors.mx.black};
    background-color: ${({ theme }) => theme.colors.mx.white};
    border-color: ${({ theme }) => theme.colors.mx.white};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.brutalist};
  }

  &:focus {
    outline: none;
  }
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
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.red};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`

export const UserEmail = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  opacity: 0.8;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const MobileContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.mx.red};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.mx.black};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
    background-color: ${({ theme }) => theme.colors.mx.gray[100]};
  }

  &:active {
    transform: translateY(0px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:focus {
    outline: none;
  }
`

export const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: flex-start;
  padding-top: 5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.mx.white};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.mx.gray[300]};
  }
`

export const MobileHeaderSection = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const MobileLogo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  border: 1px solid transparent;
  transition: all 0.2s ease;

  img {
    width: 120px;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    transition: all 0.2s ease;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.mx.black};
  width: 100%;
`

export const MobileNavLink = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  text-decoration: none;
  transition: color 0.2s;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.mx.red};
  }
`

export const MenuItem = styled.div<{ $isActive?: boolean; $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.black : theme.colors.mx.white)};
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.white : 'transparent')};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.white : 'transparent')};
  box-shadow: ${({ $isActive }) => ($isActive ? '2px 2px 0 #000000' : 'none')};
  white-space: nowrap;
  overflow: hidden;
  font-weight: ${({ theme, $isActive }) =>
    $isActive ? theme.typography.fontWeights.medium : theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  justify-content: flex-start;

  &:hover {
    background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.white : 'rgba(255, 255, 255, 0.1)')};
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.black : theme.colors.mx.white)};
    transform: ${({ $isActive }) => ($isActive ? 'none' : 'translateY(-1px)')};
    box-shadow: ${({ $isActive }) => ($isActive ? '2px 2px 0 #000000' : '1px 1px 0 #000000')};
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
  color: ${({ theme }) => theme.colors.mx.red};
  background-color: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.red};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.red};
    color: ${({ theme }) => theme.colors.mx.white};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0px);
  }
`
