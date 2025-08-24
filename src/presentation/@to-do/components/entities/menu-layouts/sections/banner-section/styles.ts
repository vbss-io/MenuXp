import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

export const ViewContainer = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`

export const BannerImage = styled.img`
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
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4) 100%);
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
  margin: 0 0 2% 0;
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
`

export const EditContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
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

export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

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
  transition: opacity 0.2s ease;

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
