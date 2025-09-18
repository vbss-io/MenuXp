import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  display: flex;
  gap: 0;
  overflow: hidden;
  min-height: 100vh;
  width: 100vw;
  
  @media ${({ theme }) => theme.breakpoints.sm} {
    height: 100vh;
  }
`

export const LeftColumn = styled.div`
  flex: 1 1 50%;
  background: ${({ theme }) => theme.colors.mx.red};
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  overflow: hidden;
  position: relative;

  @media ${({ theme }) => theme.breakpoints.lg} {
    display: flex;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.mx.yellow} 0%,
      ${({ theme }) => theme.colors.mx.red} 100%
    );
    opacity: 0.1;
    pointer-events: none;
  }
`

export const RightColumn = styled.div`
  width: 100%;
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.mx.white};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/food-pattern.svg');
    background-repeat: repeat;
    background-size: 120px auto;
    opacity: 0.06;
    pointer-events: none;
    z-index: 0;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    justify-content: center;
    align-items: flex-start;
    padding: ${({ theme }) => theme.spacing.md};
  }
`

export const LoginLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  img {
    width: 132px; /* ~33% de 400px (largura máxima do Card) - aumentado 10% */
    max-width: 33%;
    height: auto;
    display: block;
  }
`

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.mx.white};
  border: 1px solid ${({ theme }) => theme.colors.mx.black};
  padding: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.brutalistCard};
  z-index: 1;

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  @media ${({ theme }) => theme.breakpoints.lg} {
    margin-left: ${({ theme }) => theme.spacing.xl};
    margin-right: 0;
  }
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.mx.white};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  margin: ${({ theme }) => theme.spacing.md} 0;
  max-width: 40%;
  box-shadow: 1px 1px 0 ${({ theme }) => theme.colors.mx.black};
`

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.mx.yellow};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.mx.white};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  opacity: 0.95;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm};

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.mx.yellow};
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const CardTitle = styled.h2`
  color: ${({ theme }) => theme.colors.mx.black};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  text-align: center;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.mx.black};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fonts.body};
`

export const InfoText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mx.black};
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`

export const ResendLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.mx.red};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  text-decoration: underline;
  font-family: ${({ theme }) => theme.typography.fonts.body};
  transition: all ${({ theme }) => theme.animations.durations.fast} ${({ theme }) => theme.animations.easings.easeInOut};
  outline: none;
  border-radius: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.mx.yellow};
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mx.yellow};
    outline-offset: 2px;
  }

  &:active {
    color: ${({ theme }) => theme.colors.mx.yellow};
    transform: translateY(0);
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.mx.gray[400]};
    cursor: not-allowed;
    text-decoration: none;
    transform: none;
    outline: none;
  }
`

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.mx.red};
  text-decoration: underline;
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  transition: all ${({ theme }) => theme.animations.durations.fast} ${({ theme }) => theme.animations.easings.easeInOut};
  outline: none;
  border-radius: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.mx.yellow};
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mx.yellow};
    outline-offset: 2px;
  }

  &:active {
    color: ${({ theme }) => theme.colors.mx.yellow};
    transform: translateY(0);
  }
`

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.mx.error};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

export const ForgotPasswordContainer = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  text-align: right;
  font-family: ${({ theme }) => theme.typography.fonts.body};
`

export const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const EmailHighlight = styled.span`
  color: ${({ theme }) => theme.colors.mx.red};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  white-space: nowrap;
  font-family: ${({ theme }) => theme.typography.fonts.body};
`
