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

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: ${({ theme }) => theme.colors.mx.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xxs};
  }

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    text-transform: uppercase;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.muted};
  }
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
  border-radius: ${({ theme }) => theme.borderRadius.sm};
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

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.mx.red};
    cursor: pointer;
  }
`

export const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  cursor: pointer;
  user-select: none;
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

export const FieldHint = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0px;
  display: block;
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

export const Section = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: none;
  background: ${({ theme }) => theme.colors.mx.white};
  overflow: hidden;

  &[open] summary .chevron {
    transform: rotate(90deg);
  }
`

export const SectionSummary = styled.summary`
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.black};
  user-select: none;

  .left {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    text-transform: uppercase;
  }
`

export const SectionContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Counter = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
  text-align: right;
`

export const FooterActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
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

export const PrimaryActionButton = styled.div`
  flex: 0 0 auto;
  min-width: 200px;
  @media (max-width: 768px) {
    width: 100%;
    order: 1;
  }
`

export const SecondaryActionButton = styled.div`
  flex: 0 0 auto;
  min-width: 200px;
  @media (max-width: 768px) {
    width: 100%;
    order: 2;
  }
`

export const TertiaryActionButton = styled.div`
  flex: 0 0 auto;
  min-width: 200px;
  @media (max-width: 768px) {
    width: 100%;
    order: 3;
  }
`

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 1.3;
`

export const SectionSubtitle = styled.p`
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mx.gray[600]};
  margin: 0;
  opacity: 0.7;
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