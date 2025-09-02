import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
`

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.yellow};
`

export const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};

  svg {
    color: ${({ theme }) => theme.colors.mx.black};
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const PreviewContent = styled.div`
  padding: 0;
`

export const ViewContainer = styled.div`
  width: 100%;
  position: relative;
`

export const BannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};

  @media ${({ theme }) => theme.breakpoints.xs} {
    max-height: 200px;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    max-height: 250px;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    max-height: 300px;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    max-height: 350px;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    max-height: 400px;
  }
`

export const BannerPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  background: ${({ theme }) => theme.colors.mx.white};
  color: ${({ theme }) => theme.colors.mx.gray[500]};
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};

  @media ${({ theme }) => theme.breakpoints.xs} {
    min-height: 200px;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    min-height: 250px;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    min-height: 300px;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    min-height: 350px;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    min-height: 400px;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    text-align: center;
  }
`

export const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4%;
  pointer-events: none;
`

export const TagContainer = styled.div`
  align-self: flex-start;
  pointer-events: auto;
  margin-bottom: 2%;
`

export const TextContainer = styled.div`
  align-self: flex-start;
  pointer-events: auto;
  margin-top: 2%;
`

export const BannerTitle = styled.h2`
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 0 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  line-height: 1.1;
  max-width: 80%;
  white-space: nowrap;
`

export const BannerSubtitle = styled.p`
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
  max-width: 70%;
  white-space: nowrap;
`

export const EditContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
`

export const EditTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  color: ${({ theme }) => theme.colors.mx.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const EditContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
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

export const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  border: 2px dashed ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  background: ${({ theme }) => theme.colors.mx.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  color: ${({ theme }) => theme.colors.mx.black};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  @media ${({ theme }) => theme.breakpoints.xs} {
    padding: ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.red};
    color: ${({ theme }) => theme.colors.mx.red};
    background: ${({ theme }) => theme.colors.mx.red}05;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    font-family: ${({ theme }) => theme.typography.fonts.title};
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.subtitle {
      font-size: ${({ theme }) => theme.typography.fontSizes.xs};
      font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
      font-family: ${({ theme }) => theme.typography.fonts.body};
      opacity: 0.7;
      text-transform: none;
      letter-spacing: normal;
    }
  }
`

export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;

    @media ${({ theme }) => theme.breakpoints.xs} {
      max-height: 200px;
    }

    @media ${({ theme }) => theme.breakpoints.sm} {
      max-height: 250px;
    }

    @media ${({ theme }) => theme.breakpoints.md} {
      max-height: 300px;
    }

    @media ${({ theme }) => theme.breakpoints.lg} {
      max-height: 350px;
    }

    @media ${({ theme }) => theme.breakpoints.xl} {
      max-height: 400px;
    }
  }
`

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

  ${ImagePreview}:hover & {
    opacity: 1;
  }
`

export const UploadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  z-index: 10;

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.mx.black};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    font-family: ${({ theme }) => theme.typography.fonts.body};
  }
`

export const ValidationErrors = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const ValidationError = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.error}10;
  border: 2px solid ${({ theme }) => theme.colors.mx.error};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  color: ${({ theme }) => theme.colors.mx.error};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};

  svg {
    color: ${({ theme }) => theme.colors.mx.error};
    flex-shrink: 0;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    font-family: ${({ theme }) => theme.typography.fonts.body};
  }
`

export const FallbackContainer = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};

  @media ${({ theme }) => theme.breakpoints.xs} {
    min-height: 200px;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    min-height: 250px;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    min-height: 300px;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    min-height: 350px;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    min-height: 400px;
  }
`

export const FallbackContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  height: 100%;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.mx.gray[500]};

  @media ${({ theme }) => theme.breakpoints.xs} {
    min-height: 200px;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    min-height: 250px;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    min-height: 300px;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    min-height: 350px;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    min-height: 400px;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    text-align: center;
  }
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 2px solid ${({ theme }) => theme.colors.mx.black};
`
