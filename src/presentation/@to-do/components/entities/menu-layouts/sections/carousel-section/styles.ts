import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

export const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
`

export const EditTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const EditContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
`

export const ImageSlot = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;
  border: 2px dashed ${({ theme }) => theme.colors.mx.gray[300]};
  background: ${({ theme }) => theme.colors.mx.white};
`

export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  &:hover {
    .image-overlay {
      opacity: 1;
    }
  }
`

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 6px;

  button {
    background: rgba(255, 255, 255, 0.9);
    color: ${({ theme }) => theme.colors.text.primary};
    border: none;

    &:hover {
      background: white;
    }
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
  border: 2px dashed ${({ theme }) => theme.colors.mx.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.mx.white};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.mx.gray[600]};

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
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}05;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    text-align: center;

    &.subtitle {
      font-size: ${({ theme }) => theme.typography.fontSizes.xs};
      font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
      opacity: 0.7;
    }
  }
`

export const AddImageButton = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`

export const ViewContainer = styled.div`
  width: 100%;
  position: relative;
`

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.mx.white};
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

export const CarouselButton = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ position }) => position}: 16px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    ${({ position }) => position}: 8px;
  }
`

export const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`

export const CarouselIndicator = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.mx.gray[400])};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.mx.gray[500])};
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
`

export const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

export const FallbackContainer = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[300]};

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
  gap: ${({ theme }) => theme.spacing.md};
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
    text-align: center;
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
  border-radius: ${({ theme }) => theme.borderRadius.md};
  z-index: 10;

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
`

export const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.mx.gray[400]};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const ValidationErrors = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`

export const ValidationError = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.mx.error}10;
  border: 1px solid ${({ theme }) => theme.colors.mx.error}30;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.mx.error};

  svg {
    color: ${({ theme }) => theme.colors.mx.error};
    flex-shrink: 0;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
`
