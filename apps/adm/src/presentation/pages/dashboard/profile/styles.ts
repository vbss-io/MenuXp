import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.mx.white};
`

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  overflow: hidden;
`

export const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.white};
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.mx.white};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.mx.black};
    border-radius: 2px;
  }
`

export const TabButton = styled.button<{ $isActive: boolean }>`
  background: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.red : theme.colors.mx.white)};
  border: none;
  border-right: 1px solid ${({ theme }) => theme.colors.mx.black};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.white : theme.colors.mx.black)};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  white-space: nowrap;
  position: relative;

  &:hover {
    background: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.red : theme.colors.mx.red)}20;
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.white : theme.colors.mx.red)};
    transform: translateY(-2px);
    box-shadow: 0 4px 0px ${({ theme }) => theme.colors.mx.black};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.red};
  }

  &:last-child {
    border-right: none;
  }
`

export const TabContent = styled.div`
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.mx.white};
`
