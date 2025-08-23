import styled from 'styled-components'

export const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  @media ${({ theme }) => theme.breakpoints.md} {
    display: flex;
  }
`

export const NavLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  color: ${({ theme }) => theme.colors.mx.gray[700]};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.mx.black};
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mx.black};
    outline-offset: 2px;
  }
`
