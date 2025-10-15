import styled from 'styled-components'

export const NavigationContainer = styled.nav`
  &.navigation-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.mx.white};
    border-top: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
    padding: 8px 0;
    z-index: 1000;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
`

export const NavigationList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`

export const NavigationItem = styled.li`
  &.navigation-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px) translateZ(0);
    }
  }
`

export const IconWrapper = styled.div`
  &.icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: transform, background-color;

    &:hover {
      transform: scale(1.05) translateZ(0);
      background-color: rgba(0, 0, 0, 0.2);
      box-shadow: ${({ theme }) => theme.shadows.sm};
    }

    &:active {
      transform: scale(0.95) translateZ(0);
    }

    svg {
      flex-shrink: 0;
    }
  }
`
