import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

const chipsStyles = css`
  .active {
    background-color: ${({ theme }) => theme.colors.mx.success} !important;
    border: 2px solid ${({ theme }) => theme.colors.mx.black} !important;
    color: ${({ theme }) => theme.colors.mx.white} !important;
  }

  .inactive {
    background-color: ${({ theme }) => theme.colors.mx.error} !important;
    border: 2px solid ${({ theme }) => theme.colors.mx.black} !important;
    color: ${({ theme }) => theme.colors.mx.white} !important;
  }
`

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 200px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0px);
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

  ${chipsStyles}
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

export const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`

export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.mx.red};
  flex-shrink: 0;
`

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  flex: 1;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;

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

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
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

    &.white:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.mx.gray[100]};
      border-color: ${({ theme }) => theme.colors.mx.black};
      transform: translateY(-2px);
      box-shadow: 0 4px 0 ${({ theme }) => theme.colors.mx.black};
      color: ${({ theme }) => theme.colors.mx.black};
    }

    &.ghost:hover:not(:disabled) {
      background-color: transparent !important;
      color: ${({ theme }) => theme.colors.mx.red} !important;
      border: 1px solid ${({ theme }) => theme.colors.mx.red} !important;
      box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.red} !important;
      transform: translateY(-2px);
    }

    &.primary:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.mx.blue} !important;
      color: ${({ theme }) => theme.colors.mx.white} !important;
      border: 1px solid ${({ theme }) => theme.colors.mx.blue} !important;
      box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.blue} !important;
      transform: translateY(-2px);
    }
  }

  .button.edit-button {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    background: ${({ theme }) => theme.colors.mx.white};
    color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: 0 4px 0 ${({ theme }) => theme.colors.mx.blue};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.mx.blue};
      color: ${({ theme }) => theme.colors.mx.white};
      border-color: ${({ theme }) => theme.colors.mx.white};
      box-shadow: 0 4px 0 ${({ theme }) => theme.colors.mx.blue};
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0px);
      box-shadow: 0 2px 0 ${({ theme }) => theme.colors.mx.blue};
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xs};
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
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  strong {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    color: ${({ theme }) => theme.colors.mx.black};
    letter-spacing: 0.2px;
    text-transform: none;
  }
`

export const SubCategoriesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const EmptySubCategoriesText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.muted};
  font-style: italic;
`

export const SubCategoriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const SubCategoryChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.blue};
  color: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  text-transform: uppercase;
  letter-spacing: 0px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  max-width: 200px; /* NOVO */

  &:hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.mx.black};
    outline-offset: 2px;
  }

  span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const DeleteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    background: ${({ theme }) => theme.colors.mx.black}20;
    transform: scale(1.1);
  }
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 60%;
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.mx.gray[700]};
    white-space: nowrap;
  }
`

export const FocusableButton = styled.button`
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.mx.black};
    outline-offset: 2px;
    z-index: 10;
  }
`

export const StatusBadge = styled.div`
  .chip {
    border-radius: 9999px !important;
  }
`
