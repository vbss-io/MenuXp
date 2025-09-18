import styled from 'styled-components'

export const SidebarContainer = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.mx.red};
  flex-direction: column;
  display: none;
  position: relative;

  @media ${({ theme }) => theme.breakpoints.md} {
    display: flex;
  }
`

export const HeaderSection = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'center')};
  flex-direction: ${({ $isOpen }) => ($isOpen ? 'row' : 'column')};
  gap: ${({ $isOpen, theme }) => ($isOpen ? theme.spacing.md : theme.spacing.sm)};
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  min-height: ${({ $isOpen }) => ($isOpen ? '80px' : '60px')};
  flex-shrink: 0;

  > *:nth-child(2) {
    order: ${({ $isOpen }) => ($isOpen ? '2' : '1')};
  }

  > *:nth-child(1) {
    order: ${({ $isOpen }) => ($isOpen ? '1' : '2')};
  }

  /* Linha separadora entre logo e menus */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 20%,
      rgba(0, 0, 0, 0.15) 50%,
      rgba(0, 0, 0, 0.1) 80%,
      transparent 100%
    );
    box-shadow: 
      0 1px 0 rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(0, 0, 0, 0.05);
  }

  /* Garantir que o botão toggle mantenha sua forma circular */
  button {
    flex-shrink: 0;
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
    min-height: 40px !important;
    max-width: 40px !important;
    max-height: 40px !important;
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
  }

  &:active {
    transform: scale(1.02);
  }
`

export const ToggleButton = styled.button<{ $isOpen: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mx.black};
  transition: all 0.2s ease;
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  flex-shrink: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
    background-color: ${({ theme }) => theme.colors.mx.yellow};
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 1px 1px 0px ${({ theme }) => theme.colors.mx.black};
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.mx.red};
    outline-offset: 1px;
  }

  &:focus:not(:focus-visible) {
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
  overflow-y: scroll; /* Força o scroll a aparecer */
  overflow-x: hidden;
  min-height: 0; /* Permite que o flex funcione corretamente */

  /* Estilização do scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
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
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  position: relative;

  /* Ajuste quando fechado - centraliza perfeitamente */
  ${({ $isOpen }) =>
    !$isOpen &&
    `
    padding: 0;
    gap: 0;
    justify-content: center;
  `}

  /* Estilo para item ativo */
  ${({ $isActive, theme }) =>
    $isActive &&
    `
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid ${theme.colors.mx.white};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: ${theme.colors.mx.white};
  `}

  &:hover {
    ${({ $isActive }) =>
      !$isActive &&
      `
      background-color: rgba(255, 255, 255, 0.08);
      transform: translateX(1px);
    `}
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.mx.white};
    outline-offset: 1px;
  }

  &:active {
    transform: scale(0.98);
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
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  flex-shrink: 0; /* Fixa o logout */

  /* Ajuste de espaçamento quando fechado - igual ao MenuContainer */
  .sidebar-closed & {
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`

export const LogoutButton = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ $isOpen, theme }) => ($isOpen ? `${theme.spacing.sm} ${theme.spacing.lg}` : `${theme.spacing.sm} ${theme.spacing.md}`)};
  color: ${({ theme }) => theme.colors.mx.black};
  background-color: ${({ theme }) => theme.colors.mx.white};
  white-space: nowrap;
  overflow: hidden;
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: 'Tanker', ${({ theme }) => theme.typography.fonts.title};
  font-size: calc(${({ theme }) => theme.typography.fontSizes.sm} + 4px);
  letter-spacing: 0.5px;
  height: 40px;
  min-height: 40px;
  box-sizing: border-box;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  position: relative;
  overflow: hidden;
  line-height: 1.2;

  /* Ajuste quando fechado - mesmo comportamento dos outros itens */
  ${({ $isOpen }) =>
    !$isOpen &&
    `
    padding: 0;
    gap: 0;
    justify-content: center;
  `}

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #f0f0f0;
    border-color: ${({ theme }) => theme.colors.mx.black};
    transform: translateY(-2px);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }

  &:hover::after {
    transform: translateX(0);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 1px 1px 0px ${({ theme }) => theme.colors.mx.black};
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.mx.red};
    outline-offset: 1px;
  }
`

// Componentes para badges de notificação

export const Badge = styled.span`
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  color: ${({ theme }) => theme.colors.mx.black};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  border: 1px solid ${({ theme }) => theme.colors.mx.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

