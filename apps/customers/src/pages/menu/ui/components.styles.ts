import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: background-color ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
`

export const ControlsBar = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const LayoutSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

export const LayoutButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.mx.black : theme.colors.mx.white)};
  color: ${({ $active, theme }) => ($active ? theme.colors.mx.white : theme.colors.mx.black)};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-transform: capitalize;
  cursor: pointer;
  transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`

export const ComponentSelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.mx.white};
  color: ${({ theme }) => theme.colors.mx.black};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  min-width: 120px;

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`

export const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
`
