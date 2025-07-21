import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.md};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}10;
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  .active {
    background-color: ${({ theme }) => theme.colors.green};
    border-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.text};
  }

  .inactive {
    background-color: ${({ theme }) => theme.colors.red};
    border-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.text};
  }
`

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  flex: 1;
`

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`
