import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
`

export const ResetButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  color: ${({ theme }) => theme.colors.mx.black};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 2px 2px 0px ${({ theme }) => theme.colors.mx.black};
  transition: all ${({ theme }) => theme.animations.durations.fast} ${({ theme }) => theme.animations.easings.ease};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 2px 2px 0px ${({ theme }) => theme.colors.mx.black};
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 2px ${({ theme }) => theme.colors.mx.white},
      0 0 0 4px ${({ theme }) => theme.colors.mx.blue};
  }
`

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media ${({ theme }) => theme.breakpoints.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  color: ${({ theme }) => theme.colors.mx.black};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.fast} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.blue};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.blue}40;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  color: ${({ theme }) => theme.colors.mx.black};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  transition: all ${({ theme }) => theme.animations.durations.fast} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.blue};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.blue}40;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const QuickRangesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`

interface QuickRangeButtonProps {
  $isActive?: boolean
}

export const QuickRangeButton = styled.button<QuickRangeButtonProps>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.yellow : theme.colors.mx.white)};
  color: ${({ theme }) => theme.colors.mx.black};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  text-transform: uppercase;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.fast} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    background: ${({ theme, $isActive }) => ($isActive ? theme.colors.mx.yellow : theme.colors.mx.gray[100])};
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 2px ${({ theme }) => theme.colors.mx.white},
      0 0 0 4px ${({ theme }) => theme.colors.mx.blue};
  }
`
