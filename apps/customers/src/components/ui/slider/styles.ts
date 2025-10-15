import { motion } from 'framer-motion'
import styled from 'styled-components'

export const SlideOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
`

export const SlideContainer = styled(motion.div)<{ $maxWidth?: string }>`
  &.slider-container {
    background: ${({ theme }) => theme.colors.mx.white};
    width: 100%;
    max-width: ${({ $maxWidth }) => $maxWidth || '100%'};
    height: 100vh;
    overflow-y: auto;
    position: relative;
    transition: all 0.2s ease;

    @media (min-width: 768px) {
      max-width: ${({ $maxWidth }) => $maxWidth || '50%'};
    }
  }
`

export const SlideHeader = styled.div<{ $showBorder?: boolean }>`
  &.slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.lg};
    border-bottom: ${({ $showBorder, theme }) => ($showBorder ? `1px solid ${theme.colors.mx.gray[200]}` : 'none')};
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.colors.mx.white};
    z-index: 10;
    transition: all 0.2s ease;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`

export const HeaderTitle = styled.h2`
  &.slider-title {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    transition: color 0.2s ease;
  }
`

export const CloseButton = styled.button`
  &.slider-close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.text.secondary};

    &:hover {
      background: ${({ theme }) => theme.colors.mx.gray[100]};
    }
  }
`

export const SlideContent = styled.div<{ $noPadding?: boolean }>`
  padding: ${({ $noPadding, theme }) => ($noPadding ? '0' : theme.spacing.lg)};
`
