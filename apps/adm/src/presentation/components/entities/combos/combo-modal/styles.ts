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

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`

export const ToggleLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  cursor: pointer;
  user-select: none;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  }
`

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;
`

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.mx.red};
  }

  &:checked + span:before {
    transform: translateX(20px);
  }

  &:disabled + span {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.mx.gray[300]};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: 24px;
  transition: all 0.2s ease;
  box-shadow: 1px 1px 0px ${({ theme }) => theme.colors.mx.black};

  &:before {
    content: '';
    position: absolute;
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: ${({ theme }) => theme.colors.mx.white};
    border: 1px solid ${({ theme }) => theme.colors.mx.black};
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  &:hover {
    box-shadow: 2px 2px 0px ${({ theme }) => theme.colors.mx.black};
  }
`

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const Slider = styled.input`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.mx.red};
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.mx.white};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.mx.red};
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.mx.white};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.red}20;
  }
`

export const SliderValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  min-width: 40px;
  text-align: center;
`

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`

export const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`

export const ItemInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  background: ${({ theme }) => theme.colors.mx.white};
  color: ${({ theme }) => theme.colors.mx.black};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.mx.red};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.red}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.mx.gray[500]};
  }
`

export const ItemCombobox = styled.div`
  flex: 1;
`

export const SelectedItemsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`

export const SelectedItemsTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const SelectedItemCard = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &:last-child {
    margin-bottom: 0;
  }
`

export const SelectedItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`

export const SelectedItemName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const SelectedItemPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.gray[600]};
`

export const SelectedItemQuantity = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.red};
`