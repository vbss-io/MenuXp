import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  background: ${({ theme }) => theme.colors.gray}10;
`

export const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`

export const ViewContainer = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

export const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`

export const EditTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`

export const EditContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  border: 2px dashed ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.gray};

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
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-align: center;

    &.subtitle {
      font-size: ${({ theme }) => theme.fontSizes.xs};
      font-weight: ${({ theme }) => theme.fontWeights.normal};
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
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`

export const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.gray};
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
  background: ${({ theme }) => theme.colors.red}10;
  border: 1px solid ${({ theme }) => theme.colors.red}30;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.red};

  svg {
    color: ${({ theme }) => theme.colors.red};
    flex-shrink: 0;
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`

export const FallbackContainer = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};

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
  color: ${({ theme }) => theme.colors.gray};

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
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-align: center;
  }
`
