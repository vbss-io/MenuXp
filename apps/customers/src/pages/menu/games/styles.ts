import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 400px;
  width: 100%;
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 20px;
  text-align: center;
`

export const DevelopmentMessage = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  opacity: 0.8;
`
