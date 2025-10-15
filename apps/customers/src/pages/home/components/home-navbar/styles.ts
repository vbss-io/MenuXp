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
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.colors.mx.gray[700]};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border: 2px solid transparent;

  &:hover {
    color: ${({ theme }) => theme.colors.mx.black};
    background-color: ${({ theme }) => theme.colors.mx.yellow};
    border-color: ${({ theme }) => theme.colors.mx.black};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.brutalist};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.mx.black};
    outline-offset: 2px;
  }
`
