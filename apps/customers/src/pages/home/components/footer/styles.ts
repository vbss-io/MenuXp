import styled from 'styled-components'

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.mx.black};
  color: ${({ theme }) => theme.colors.mx.white};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  width: 100%;
  overflow-x: hidden;
`

export const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media ${({ theme }) => theme.breakpoints.md} {
    grid-template-columns: 2fr 1fr 1fr;
  }
`

export const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const Logo = styled.img`
  width: 7rem;
  height: auto;
`

export const BrandDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.mx.gray[300]};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  margin: 0;
  max-width: 28rem;
`

export const LinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const LinksTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.white};
  margin: 0;
`

export const LinksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
`

export const LinksItem = styled.li`
  margin: 0;
`

export const Link = styled.a`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.mx.gray[300]};
  text-decoration: none;
  transition: color ${({ theme }) => theme.animations.durations.normal} ${({ theme }) => theme.animations.easings.ease};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.mx.white};
  }

  &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.mx.white};
    text-decoration: underline;
  }
`

export const FooterDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.mx.gray[800]};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`

export const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  justify-content: space-between;

  @media ${({ theme }) => theme.breakpoints.md} {
    flex-direction: row;
    gap: 0;
  }
`

export const Copyright = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mx.gray[400]};
  text-align: center;

  @media ${({ theme }) => theme.breakpoints.md} {
    text-align: left;
  }
`

export const DeveloperInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const DeveloperText = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mx.gray[400]};
`

export const DeveloperLink = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    opacity: 0.8;
  }
`

export const DeveloperLogo = styled.img`
  height: 1.5rem;
  width: auto;
`
