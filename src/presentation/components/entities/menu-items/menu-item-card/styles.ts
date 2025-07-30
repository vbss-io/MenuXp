import styled from 'styled-components'
import { motion } from 'framer-motion'

// Estilos globais para o Chip
const globalStyles = `
  .active {
    background-color: #10b981 !important;
    color: white !important;
  }
  
  .inactive {
    background-color: #ef4444 !important;
    color: white !important;
  }
`

export const Card = styled(motion.div)`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  ${globalStyles}
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

export const CardInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #374151;

  span {
    background: #f3f4f6;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 500;
  }
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

export const ImagesContainer = styled.div`
  margin-bottom: 16px;
`

export const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  flex-shrink: 0;
`

export const OptionalsSection = styled.div`
  margin-bottom: 16px;
`

export const OptionalsList = styled.div`
  margin-top: 8px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`

export const OptionalItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`
