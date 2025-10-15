import styled from 'styled-components';

export const TabsContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`

export const TabsHeader = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  overflow: hidden;
`

export const TabButton = styled.button<{ $isActive: boolean; $isFirst: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-right: ${({ $isFirst, theme }) => ($isFirst ? 'none' : `1px solid ${theme.colors.mx.black}`)};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.mx.yellow : theme.colors.mx.gray[200])};
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.mx.black : theme.colors.text.secondary)};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.mx.yellow : theme.colors.mx.gray[300])};
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.mx.red};
  }

  &:last-child {
    border-right: none;
  }
`

export const TabContent = styled.div`
  width: 100%;
`
