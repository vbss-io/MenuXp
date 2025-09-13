import styled from 'styled-components'

export const UserMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  position: relative;
`

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.white};
  position: relative;
  flex-shrink: 0;
  min-height: 80px;

  .avatar-wrapper {
    svg {
      color: ${({ theme }) => theme.colors.mx.yellow};
    }

    span {
      color: ${({ theme }) => theme.colors.mx.yellow};
    }
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;

  .avatar-wrapper {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

export const UserEmail = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mx.white};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0; /* Permite que o flex funcione corretamente */

  /* Estilização do scrollbar - aparece apenas quando necessário */
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
  color: ${({ theme }) => theme.colors.mx.white};
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
  border-top: 2px solid ${({ theme }) => theme.colors.mx.white};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
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
  color: ${({ theme }) => theme.colors.mx.black};
  background-color: ${({ theme }) => theme.colors.mx.yellow};
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
