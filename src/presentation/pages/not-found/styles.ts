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

export const NotFoundContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 600px;
  width: 100%;
  margin: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 1;
`

export const TitleContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  /* letter-spacing herdado do global */
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.extrabold};
  text-shadow: 2px 2px 0 ${({ theme }) => theme.colors.mx.black}20;

  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxl};
  }
`

export const Message = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
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

export const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 300px;
`
