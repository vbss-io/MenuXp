import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const EditContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`

export const EditHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  background: ${({ theme }) => theme.colors.background};
`

export const EditTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const EditContent = styled.div`
  padding: 20px;
  position: relative;
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
  border: 2px dashed ${({ theme }) => theme.colors.gray};
  background: ${({ theme }) => theme.colors.background};
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
    color: ${({ theme }) => theme.colors.text};
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
  height: 100%;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }

  svg {
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 8px;
  }

  span {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 14px;
    line-height: 1.4;

    &.subtitle {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.gray};
      margin-top: 4px;
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
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
`

export const CarouselTrack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`

export const CarouselSlide = styled.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
`

export const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
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
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.gray)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.highlight)};
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`

export const PreviewContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`

export const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  background: ${({ theme }) => theme.colors.background};
`

export const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const FallbackContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`

export const FallbackContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;

  svg {
    opacity: 0.5;
  }

  span {
    font-size: 14px;
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
  gap: 16px;
  border-radius: 12px;
  z-index: 10;

  span {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
`

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors.gray};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const ValidationErrors = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`

export const ValidationError = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.red}20;
  border: 1px solid ${({ theme }) => theme.colors.red};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;

  svg {
    flex-shrink: 0;
  }
`
