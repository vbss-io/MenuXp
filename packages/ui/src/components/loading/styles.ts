import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Spinner = styled.div<{ size?: number }>`
  &.loading-spinner {
    width: ${({ size }) => (size ? `${size}px` : '1.5rem')};
    height: ${({ size }) => (size ? `${size}px` : '1.5rem')};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-top: 2px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    transition: all ${({ theme }) => `${theme.animations.durations.normal} ${theme.animations.easings.ease}`};
  }
`
