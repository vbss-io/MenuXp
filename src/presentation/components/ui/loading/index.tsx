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
  width: ${({ size }) => (size ? `${size}px` : '1.5rem')};
  height: ${({ size }) => (size ? `${size}px` : '1.5rem')};
  border: 4px solid ${({ theme }) => theme.colors.secondary};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

interface LoadingProps {
  size?: number
}

export const Loading = ({ size }: LoadingProps) => {
  return (
    <Container>
      <Spinner size={size} />
    </Container>
  )
}
