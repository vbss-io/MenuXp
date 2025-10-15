import { styled } from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
`

export const Content = styled.div`
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 80px;
`

export const RestaurantNotFound = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const MenuNotFound = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.mx.black};
`

export const ChildContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ChildBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 8px 0;

  &:hover {
    opacity: 0.8;
  }
`
