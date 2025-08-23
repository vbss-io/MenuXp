import { motion } from 'framer-motion'
import styled from 'styled-components'

export const FormContainer = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const Section = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
`

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`

export const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${({ theme }) => theme.breakpoints.md} {
    grid-template-columns: 1fr 1fr;
  }
`

export const BasicInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const ColorsGrid = styled.div`
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
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  outline: none;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};

  &::placeholder {
    color: ${({ theme }) => theme.colors.mx.gray[400]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.blue}20;
  }
`

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  outline: none;
  resize: vertical;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};

  &::placeholder {
    color: ${({ theme }) => theme.colors.mx.gray[400]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.mx.blue}20;
  }
`

export const HelpText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.gray[600]};
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.red};
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`

export const SubmitSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
`

export const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`

export const LogoPreview = styled(motion.div)`
  position: relative;
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  transition: all ${({ theme }) => theme.animations.durations.slow} ${({ theme }) => theme.animations.easings.ease};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

export const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const RemoveLogoButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.mx.red};
  color: white;
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  &:hover {
    background: ${({ theme }) => theme.colors.mx.red};
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }
`

export const LogoUploadButton = styled(motion.button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 120px;
  height: 120px;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px dashed ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.mx.black};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.slow} ${({ theme }) => theme.animations.easings.ease};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};

  &:hover {
    background: ${({ theme }) => theme.colors.mx.gray[100]};
    border-color: ${({ theme }) => theme.colors.mx.blue};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.mx.blue}20;
  }

  &:active {
    transform: translateY(0);
  }
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const StatusLabel = styled.div<{ $status: 'checking' | 'available' | 'unavailable' | 'invalid' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  margin-top: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  background: ${({ theme, $status }) => {
    switch ($status) {
      case 'checking':
        return theme.colors.mx.gray[100]
      case 'available':
        return theme.colors.mx.success
      case 'unavailable':
        return theme.colors.mx.red
      case 'invalid':
        return theme.colors.mx.red
      default:
        return 'transparent'
    }
  }};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'checking':
        return theme.colors.mx.black
      case 'available':
        return theme.colors.mx.white
      case 'unavailable':
        return theme.colors.mx.white
      case 'invalid':
        return theme.colors.mx.white
      default:
        return theme.colors.mx.black
    }
  }};
`

export const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`
