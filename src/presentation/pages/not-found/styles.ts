import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 5rem);
  background: ${({ theme }) => theme.colors.background};
`

export const NotFoundContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 600px;
  width: 100%;
  margin: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-direction: column;

  @media ${({ theme }) => theme.breakpoints.md} {
    flex-direction: row;
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.default};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};

  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
  }
`

export const Message = styled.p`
  font-family: ${({ theme }) => theme.fonts.default};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin: ${({ theme }) => theme.spacing.md} 0;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 300px;
`
