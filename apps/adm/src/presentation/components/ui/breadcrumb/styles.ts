import styled from 'styled-components'

export const Container = styled.nav`
  padding: ${({ theme }) => theme.spacing.md};
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mx.gray[200]};
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.spacing.sm};
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
    border-radius: ${({ theme }) => theme.borderRadius.xs};

    &:hover {
      color: ${({ theme }) => theme.colors.mx.yellow};
    }

    &:active {
      color: ${({ theme }) => theme.colors.mx.yellow};
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.mx.black};
    transition: all 0.2s ease;
  }
`

export const CurrentPage = styled.span`
  color: ${({ theme }) => theme.colors.mx.white};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: #0097e0;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Ellipsis = styled.span`
  color: ${({ theme }) => theme.colors.mx.blue};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  font-family: ${({ theme }) => theme.typography.fonts.title};
  margin: 0 ${({ theme }) => theme.spacing.xs};
`

export const UserMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;

  @media (max-width: 767px) {
    display: none;
  }
`
