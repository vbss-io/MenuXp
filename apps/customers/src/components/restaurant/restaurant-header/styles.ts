import styled from 'styled-components'

export const HeaderContainer = styled.header`
  &.header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: ${({ theme }) => theme.colors.mx.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 100;
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
  }
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

export const Logo = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`

export const MenuXPLogo = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`
