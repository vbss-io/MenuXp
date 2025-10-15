import styled from 'styled-components'

export const FAQSection = styled.section`
  background-color: ${({ theme }) => theme.colors.mx.gray[50]};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  width: 100%;
  overflow-x: hidden;
`

export const FAQContainer = styled.div`
  max-width: 1024px;
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

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.title};
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.colors.mx.black};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxxxl};
  }
`

export const SectionDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`
