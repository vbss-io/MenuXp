import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ModalContent = styled.div`
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
  scroll-behavior: smooth;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${({ theme }) => theme.breakpoints.md} {
    grid-template-columns: 1fr 1fr;
  }
`

export const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: none;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  scroll-margin-bottom: 100px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: none;
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: none;
  }

  /* Unifica rótulos dos campos gerados por componentes de formulário (diretos ou internos) */
  label, h3 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    color: ${({ theme }) => theme.colors.mx.black};
    letter-spacing: 0.2px;
    text-transform: none;
  }
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  letter-spacing: 0.2px;
`

export const ModalFooter = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-left: -${({ theme }) => theme.spacing.lg};
  margin-right: -${({ theme }) => theme.spacing.lg};
  margin-bottom: 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-bottom: calc(${({ theme }) => theme.spacing.sm} + env(safe-area-inset-bottom));
  border-top: 2px solid ${({ theme }) => theme.colors.mx.black};
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(6px);
  box-shadow: none;
  min-height: auto;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -16px;
    height: 16px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    min-height: auto;
  }
`

export const FieldHint = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0px;
  display: block;
`

export const PrimaryActionButton = styled.div`
  flex: 0 0 auto;
  min-width: 160px;
  @media (max-width: 768px) {
    width: 100%;
    order: 1;
  }
`

export const SecondaryActionButton = styled.div`
  flex: 0 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    order: 2;
  }
`

export const TertiaryActionButton = styled.div`
  flex: 0 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    order: 3;
  }
`

// Estilos customizados para o botão de cancelar
export const CancelButtonStyles = styled.div`
  .cancel-button {
    &.button.ghost {
      color: ${({ theme }) => theme.colors.mx.black} !important;
      
      &:hover:not(:disabled) {
        background-color: transparent !important;
        color: ${({ theme }) => theme.colors.mx.red} !important;
        border: 1px solid ${({ theme }) => theme.colors.mx.red} !important;
        box-shadow: 3px 3px 0px ${({ theme }) => theme.colors.mx.red} !important;
        transform: translateY(-2px);
      }
    }
  }
`

// Estilo global para textarea no modal - foco preto ao invés de vermelho
export const GlobalTextareaStyles = styled.div`
  textarea:focus {
    border-color: ${({ theme }) => theme.colors.mx.black} !important;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1) !important;
    outline: none !important;
  }

  input:focus-visible, textarea:focus-visible, select:focus-visible {
    outline: 2px solid #000 !important;
    outline-offset: 2px !important;
  }
`

export const WarningText = styled.span`
  color: ${({ theme }) => theme.colors.mx.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-top: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.error}10;
  border: 1px solid ${({ theme }) => theme.colors.mx.error}30;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: inline-block;
`