import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

const chipsStyles = css`
  .active {
    background-color: ${({ theme }) => theme.colors.green} !important;
    border: 1px solid ${({ theme }) => theme.colors.green} !important;
    color: white !important;
  }

  .inactive {
    background-color: ${({ theme }) => theme.colors.red} !important;
    border: 1px solid ${({ theme }) => theme.colors.red} !important;
    color: white !important;
  }
`

export const Card = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  ${chipsStyles}
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;
`

export const CardDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 12px 0;
  line-height: 1.4;
`

export const CardFooter = styled.div`
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`
