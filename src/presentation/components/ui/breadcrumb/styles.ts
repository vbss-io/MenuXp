import styled from 'styled-components'

export const Container = styled.nav`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.mx.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.mx.black};
  box-shadow: ${({ theme }) => theme.shadows.brutalistHover};
  position: relative;

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
    opacity: 0.05;
    pointer-events: none;
  }
`

export const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 1;
`

export const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.mx.black};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  a {
    color: ${({ theme }) => theme.colors.mx.black};
    text-decoration: none;
    transition: all 0.2s ease;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    border: 1px solid transparent;

    &:hover {
      color: ${({ theme }) => theme.colors.mx.black};
      background-color: ${({ theme }) => theme.colors.mx.yellow};
      border-color: ${({ theme }) => theme.colors.mx.black};
      box-shadow: ${({ theme }) => theme.shadows.brutalist};
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0px);
      box-shadow: ${({ theme }) => theme.shadows.sm};
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.mx.blue};
    transition: all 0.2s ease;
  }
`

export const CurrentPage = styled.span`
  color: ${({ theme }) => theme.colors.mx.black};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.mx.yellow};
  border: 2px solid ${({ theme }) => theme.colors.mx.black};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: ${({ theme }) => theme.shadows.brutalist};
`

export const Ellipsis = styled.span`
  color: ${({ theme }) => theme.colors.mx.blue};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  margin: 0 ${({ theme }) => theme.spacing.xs};
`
