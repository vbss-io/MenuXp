import { motion } from 'framer-motion'
import styled from 'styled-components'

export const FormContainer = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Section = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`

export const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
  line-height: 1.5;
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`

export const HelpText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin: 0;
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.red};
  margin: 0;
`

export const SubmitSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing.md};
`

export const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`

export const LogoPreview = styled(motion.div)`
  position: relative;
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
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
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}10,
    ${({ theme }) => theme.colors.secondary || theme.colors.primary}10
  );
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;

  &:hover {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary}20,
      ${({ theme }) => theme.colors.secondary || theme.colors.primary}20
    );
    border-color: ${({ theme }) => theme.colors.secondary || theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}20;
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
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme, $status }) => {
    switch ($status) {
      case 'checking':
        return theme.colors.backgroundHover
      case 'available':
        return '#dcfce7'
      case 'unavailable':
        return '#fef2f2'
      case 'invalid':
        return '#fef2f2'
      default:
        return 'transparent'
    }
  }};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'checking':
        return theme.colors.secondary
      case 'available':
        return '#166534'
      case 'unavailable':
        return '#dc2626'
      case 'invalid':
        return '#dc2626'
      default:
        return theme.colors.text
    }
  }};
`
