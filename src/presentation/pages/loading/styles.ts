import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.mx.red} 0%,
      ${({ theme }) => theme.colors.mx.yellow} 100%
    );
    opacity: 0.05;
    pointer-events: none;
  }
`

export const LoadingContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100vh;
  margin: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 1;
`

export const LoadingWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.mx.yellow} 0%,
      ${({ theme }) => theme.colors.mx.red} 100%
    );
    opacity: 0.05;
    pointer-events: none;
    border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  }
`
