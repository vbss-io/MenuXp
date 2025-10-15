import styled from 'styled-components'

export const IframeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`

export const IframeHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.gray[50]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const IframeTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const IframeUrl = styled.code`
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.mx.gray[100]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
`

export const IframeWrapper = styled.div`
  flex: 1;
  position: relative;
  height: calc(100vh - 120px);
  min-height: 600px;

  iframe {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    min-height: 600px;
  }
`

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  background: ${({ theme }) => theme.colors.mx.white};
  border-radius: ${({ theme }) => theme.borderRadius.brutalist};
  border: 2px dashed ${({ theme }) => theme.colors.mx.gray[300]};
`

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
  max-width: 400px;
`

export const ErrorIcon = styled.div`
  font-size: 48px;
  flex-shrink: 0;
`

export const ErrorTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

export const ErrorDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`
