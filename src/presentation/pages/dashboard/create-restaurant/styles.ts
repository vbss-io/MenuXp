import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 10rem);
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
`

export const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 480px;
`

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const FileInput = styled.input`
  display: none;
`

export const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  min-height: 20px;
`

export const StatusLabel = styled.span<{ $status: string }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  ${({ $status }) => {
    switch ($status) {
      case 'checking':
        return 'color: #3b82f6;'
      case 'available':
        return 'color: #10b981;'
      case 'unavailable':
      case 'invalid':
        return 'color: #ef4444;'
      default:
        return 'color: transparent;'
    }
  }}
`
