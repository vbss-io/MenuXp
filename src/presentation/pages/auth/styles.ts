import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  height: 100vh;
  width: 100vw;
`

export const LeftColumn = styled.div`
  width: 90%;
  background: ${({ theme }) => theme.colors.primary};
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing.xxxl};
  overflow: hidden;

  @media ${({ theme }) => theme.breakpoints.lg} {
    display: flex;
  }
`

export const RightColumn = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;

  @media ${({ theme }) => theme.breakpoints.lg} {
    justify-content: flex-start;
  }
`

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  z-index: 1;
`

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin: ${({ theme }) => theme.spacing.md} 0;
  max-width: 40%;
`

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
`

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.85;
`

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;
`

export const CardTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
  line-height: 1.2;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
  text-align: center;
`

export const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`

export const ResendLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
    text-decoration: none;
  }
`

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.red};
`
