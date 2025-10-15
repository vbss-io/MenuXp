import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 200px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }

  &:active {
    transform: translateY(0px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

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
    opacity: 0.02;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: auto;
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  flex: 1;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  flex-shrink: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`

export const ImagesContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`

export const ImagesLabel = styled.strong`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.mx.gray[500]};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

export const CardInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`

export const CardFooter = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
  position: relative;
  z-index: 1;
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: flex-end;

  .button {
    transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

    &:hover {
      background-color: ${({ theme }) => theme.colors.mx.red};
      color: ${({ theme }) => theme.colors.mx.white};
      transform: translateY(-1px);
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const OptionalsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;

  button {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.mx.black};

    &:hover {
      background: ${({ theme }) => theme.colors.mx.gray[100]};
    }
  }
`

export const OptionalsList = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`

export const OptionalItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: ${({ theme }) => theme.colors.mx.black};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.mx.gray[600]};
  }
`
