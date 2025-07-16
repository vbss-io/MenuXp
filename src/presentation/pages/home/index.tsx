import { Button } from '@vbss-ui/button'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.main`
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/image-5.jpg');
    opacity: 0.1;
    pointer-events: none;
    z-index: 0;
  }
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
  z-index: 1;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
  text-align: center;
  z-index: 1;
`

export const Home = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Title>MenuXP</Title>
      <Description>
        Plataforma moderna para gestão de restaurantes. Controle pedidos, cardápio, relatórios e operações de forma
        simples, rápida e intuitiva.
      </Description>
      <Button variant="secondary" size="lg" onClick={() => navigate('/register')}>
        Começar Agora
      </Button>
    </Container>
  )
}
