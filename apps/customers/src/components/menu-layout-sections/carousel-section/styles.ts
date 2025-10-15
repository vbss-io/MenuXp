import { motion } from 'framer-motion'
import styled from 'styled-components'

export const EditContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
  background: ${({ theme }) => theme.colors.mx.yellow};
`

export const EditTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.mx.black};

  svg {
    color: ${({ theme }) => theme.colors.mx.black};
  }
`

export const EditContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`

export const SectionTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

export const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const ImagePreview = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
  background: ${({ theme }) => theme.colors.mx.white};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  }
`

export const RemoveButton = styled(motion.button)`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mx.red};
  color: ${({ theme }) => theme.colors.mx.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.mx.red};
    transform: scale(1.1);
  }
`

export const RemovedOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.mx.red};
  color: ${({ theme }) => theme.colors.mx.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  white-space: nowrap;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
`

export const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  border: 2px dashed ${({ theme }) => theme.colors.mx.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  background: ${({ theme }) => theme.colors.mx.white};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.mx.gray[600]};

  &:hover {
    border-color: ${({ theme }) => theme.colors.mx.blue};
    color: ${({ theme }) => theme.colors.mx.blue};
    background: ${({ theme }) => theme.colors.mx.blue}05;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  }

  span {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    text-align: center;

    &.subtitle {
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
      font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
      opacity: 0.7;
    }
  }
`

export const UploadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  z-index: 10;

  span {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
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
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.red}10;
  border: 2px solid ${({ theme }) => theme.colors.mx.red};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  color: ${({ theme }) => theme.colors.mx.red};

  svg {
    color: ${({ theme }) => theme.colors.mx.red};
    flex-shrink: 0;
  }

  span {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
`

export const ModalFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
`

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
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
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

export const PreviewContent = styled.div`
  padding: 0;
`

export const FallbackContainer = styled.div`
  width: 100%;
  min-height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[300]};
`

export const FallbackContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  height: 100%;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.mx.gray[500]};

  span {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    text-align: center;
  }
`

export const ViewContainer = styled.div`
  &.carousel-view-container {
    width: 100%;
    position: relative;
  }
`

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`

export const CarouselTrack = styled.div`
  display: flex;
  width: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`

export const CarouselSlide = styled.div`
  flex: 0 0 100%;
  width: 100%;
  position: relative;
`

export const CarouselImage = styled.img`
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
`

export const CarouselPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 120px;
  gap: ${({ theme }) => theme.spacing.sm};

  @media ${({ theme }) => theme.breakpoints.xs} {
    min-height: 120px;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    min-height: 150px;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    min-height: 180px;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    min-height: 200px;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    min-height: 220px;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    text-align: center;
  }
`

export const CarouselButton = styled.button<{ position: 'left' | 'right' }>`
  &.carousel-button {
    position: absolute;
    top: 50%;
    ${({ position }) => position}: 16px;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: ${({ theme }) => theme.colors.mx.white};
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 2;
    border: 2px solid ${({ theme }) => theme.colors.mx.white};

    &:hover {
      background: ${({ theme }) => theme.colors.mx.black};
      transform: translateY(-50%) scale(1.1) translateZ(0);
    }

    &:active {
      transform: translateY(-50%) scale(0.95) translateZ(0);
    }

    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
      ${({ position }) => position}: 8px;
    }
  }
`

export const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const CarouselIndicator = styled.button<{ active: boolean }>`
  &.carousel-indicator {
    width: 12px;
    height: 12px;
    background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.secondary)};
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &.active {
      background: ${({ theme }) => theme.colors.primary};
    }

    &:not(.active) {
      background: ${({ theme }) => theme.colors.secondary};
    }

    &:hover {
      transform: scale(1.2) translateZ(0);
    }

    &:active {
      transform: scale(0.9) translateZ(0);
    }
  }
`
