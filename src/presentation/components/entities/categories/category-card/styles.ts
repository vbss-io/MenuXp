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
    color: ${({ theme }) => theme.colors.white} !important;
  }
`

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
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
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
`

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  flex: 1;
`

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`

export const CardFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: flex-end;

  .button {
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const SubCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};

  strong {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.gray};
  }
`

export const SubCategoriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};

  .chip {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};

      svg {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`
