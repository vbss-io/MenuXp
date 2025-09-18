import { InfoIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import styled from 'styled-components'

interface InfoTooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  maxWidth?: string
}

export const InfoTooltip = ({ 
  content, 
  position = 'right',
  maxWidth = '250px'
}: InfoTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseEnter = () => {
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  const handleTouchStart = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Container>
      <Trigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        aria-label="Informações sobre esta página"
        title="Informações sobre esta página"
      >
        <InfoIcon size={20} weight="fill" />
      </Trigger>
      
      {isVisible && (
        <TooltipContent 
          $position={position} 
          $maxWidth={maxWidth}
        >
          <TooltipText>{content}</TooltipText>
          <TooltipArrow $position={position} />
        </TooltipContent>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.xs};
`

const Trigger = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.mx.blue};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.colors.mx.blue} !important;
    fill: ${({ theme }) => theme.colors.mx.blue} !important;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.mx.blue};
    background: ${({ theme }) => theme.colors.mx.blue}10;
    
    svg {
      color: ${({ theme }) => theme.colors.mx.blue} !important;
      fill: ${({ theme }) => theme.colors.mx.blue} !important;
    }
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.mx.blue};
    outline-offset: 2px;
  }
`

const TooltipContent = styled.div<{ $position: string; $maxWidth: string }>`
  position: absolute;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.black};
  padding: ${({ theme }) => theme.spacing.sm};
  max-width: ${({ $maxWidth }) => $maxWidth};
  min-width: 150px;
  width: max-content;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  ${({ $position }) => {
    switch ($position) {
      case 'top':
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 8px;
        `
      case 'bottom':
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
        `
      case 'left':
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 8px;
        `
      case 'right':
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 8px;
        `
      default:
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 8px;
        `
    }
  }}

  @media (max-width: 768px) {
    /* SOLUÇÃO ULTRA-SIMPLES: Próximo do ícone, centralizado horizontalmente */
    position: fixed !important;
    top: 20% !important;
    left: 50% !important;
    transform: translate(-50%, 0) !important;
    margin: 0 !important;
    
    /* Dimensões seguras */
    max-width: 90vw !important;
    max-height: 60vh !important;
    min-width: 200px !important;
    width: max-content !important;
    
    /* Garantir visibilidade */
    z-index: 9999 !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3) !important;
    overflow-y: auto !important;
  }
`

const TooltipText = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`

const TooltipArrow = styled.div<{ $position: string }>`
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;

  ${({ $position, theme }) => {
    switch ($position) {
      case 'top':
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-top-color: ${theme.colors.mx.black};
          border-bottom: none;
        `
      case 'bottom':
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-bottom-color: ${theme.colors.mx.black};
          border-top: none;
        `
      case 'left':
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-left-color: ${theme.colors.mx.black};
          border-right: none;
        `
      case 'right':
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-right-color: ${theme.colors.mx.black};
          border-left: none;
        `
      default:
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-top-color: ${theme.colors.mx.black};
          border-bottom: none;
        `
    }
  }}

  @media (max-width: 768px) {
    display: none;
  }
`
