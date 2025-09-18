import styled from 'styled-components'

export const UserMenuTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.mx.black};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.gray[100]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &:focus {
    outline: none;
  }

  svg {
    color: ${({ theme }) => theme.colors.mx.black};
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateY(1px);
  }
`

export const UserMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
`

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[100]};
  position: relative;
  flex-shrink: 0;
  min-height: 60px;
  background: transparent;
  margin: -${({ theme }) => theme.spacing.lg} -${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md} -${({ theme }) => theme.spacing.lg};

  .avatar-wrapper {
    svg {
      color: ${({ theme }) => theme.colors.mx.blue};
    }

    span {
      color: ${({ theme }) => theme.colors.mx.black};
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
  color: ${({ theme }) => theme.colors.mx.gray[600]};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0;
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
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
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

  /* Estilo para item ativo */
  ${({ $isActive, theme }) =>
    $isActive &&
    `
    background-color: ${theme.colors.mx.blue};
    color: ${theme.colors.mx.white};
    border-radius: ${theme.borderRadius.sm};
  `}

  &:hover {
    ${({ $isActive, theme }) =>
      !$isActive &&
      `
      background-color: ${theme.colors.mx.gray[100]};
      color: ${theme.colors.mx.black};
    `}
  }

  &:active {
    ${({ $isActive, theme }) =>
      !$isActive &&
      `
      background-color: ${theme.colors.mx.gray[200]};
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
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.mx.gray[100]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  flex-shrink: 0;
  background: transparent;
  margin: ${({ theme }) => theme.spacing.md} -${({ theme }) => theme.spacing.lg} -${({ theme }) => theme.spacing.lg} -${({ theme }) => theme.spacing.lg};

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
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.mx.red};
  background-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  height: 40px;
  box-sizing: border-box;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  /* Ajuste quando fechado - mesmo comportamento dos outros itens */
  ${({ $isOpen }) =>
    !$isOpen &&
    `
    padding: 0;
    gap: 0;
    justify-content: center;
  `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.mx.red};
    color: ${({ theme }) => theme.colors.mx.white};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.mx.red};
    color: ${({ theme }) => theme.colors.mx.white};
  }
`
