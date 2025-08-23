import styled from 'styled-components'

export const SidebarContainer = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.mx.white};
  flex-direction: column;
  display: none;
  border-right: 2px solid ${({ theme }) => theme.colors.mx.black};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  position: relative;

  @media ${({ theme }) => theme.breakpoints.md} {
    display: flex;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.mx.yellow} 0%,
      ${({ theme }) => theme.colors.mx.red} 100%
    );
    opacity: 0.05;
    pointer-events: none;
  }
`

export const HeaderSection = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'center')};
  flex-direction: ${({ $isOpen }) => ($isOpen ? 'row' : 'column')};
  gap: ${({ $isOpen, theme }) => ($isOpen ? theme.spacing.md : theme.spacing.sm)};
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
  position: relative;
  min-height: ${({ $isOpen }) => ($isOpen ? '80px' : '60px')};
  background-color: ${({ theme }) => theme.colors.mx.white};
  flex-shrink: 0;

  > *:nth-child(2) {
    order: ${({ $isOpen }) => ($isOpen ? '2' : '1')};
  }

  > *:nth-child(1) {
    order: ${({ $isOpen }) => ($isOpen ? '1' : '2')};
  }
`

export const Logo = styled.div<{ $isOpen: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  transition: all 0.2s ease;
  flex: ${({ $isOpen }) => ($isOpen ? '1' : 'none')};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  border: 1px solid transparent;

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    transition: all 0.2s ease;
  }

  &:hover {
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.colors.mx.black};
    box-shadow: ${({ theme }) => theme.shadows.brutalist};
  }

  &:active {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

export const ToggleButton = styled.button<{ $isOpen: boolean }>`
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mx.black};
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
    background-color: ${({ theme }) => theme.colors.mx.yellow};
  }

  &:active {
    transform: translateY(0px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  /* Remove focus outline */
  &:focus {
    outline: none;
  }
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  background-color: ${({ theme }) => theme.colors.mx.white};
  overflow-y: scroll; /* Força o scroll a aparecer */
  overflow-x: hidden;
  min-height: 0; /* Permite que o flex funcione corretamente */

  /* Estilização do scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.mx.black};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.mx.gray[700]};
  }

  .sidebar-closed & {
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`

export const MenuItem = styled.div<{ $isActive?: boolean; $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.mx.black};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  font-weight: ${({ theme, $isActive }) =>
    $isActive ? theme.typography.fontWeights.bold : theme.typography.fontWeights.medium};
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  height: 40px;
  box-sizing: border-box;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  /* Ajuste quando fechado - centraliza perfeitamente */
  ${({ $isOpen }) =>
    !$isOpen &&
    `
    padding: 0;
    gap: 0;
    justify-content: center;
  `}

  /* Estilo para item ativo - apenas bordas e background no ativo */
  ${({ $isActive, theme }) =>
    $isActive &&
    `
    background-color: ${theme.colors.mx.yellow};
    border: 2px solid ${theme.colors.mx.black};
    box-shadow: ${theme.shadows.brutalist};
  `}

  &:hover {
    ${({ $isActive, theme }) =>
      !$isActive &&
      `
      background-color: ${theme.colors.mx.gray[100]};
    `}
  }
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
  color: inherit;

  .sidebar-closed & {
    min-width: auto;
  }
`

export const BottomSection = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 2px solid ${({ theme }) => theme.colors.mx.black};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.mx.white};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.brutalist} 0;
  position: relative;
  flex-shrink: 0; /* Fixa o logout */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, ${({ theme }) => theme.colors.mx.black} 50%, transparent 100%);
  }

  /* Ajuste de espaçamento quando fechado - igual ao MenuContainer */
  .sidebar-closed & {
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`

export const LogoutButton = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.mx.white};
  background-color: ${({ theme }) => theme.colors.mx.red};
  white-space: nowrap;
  overflow: hidden;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  height: 40px;
  box-sizing: border-box;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  /* Ajuste quando fechado - mesmo comportamento dos outros itens */
  ${({ $isOpen }) =>
    !$isOpen &&
    `
    padding: 0;
    gap: 0;
    justify-content: center;
  `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }

  &:active {
    transform: translateY(0px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`
