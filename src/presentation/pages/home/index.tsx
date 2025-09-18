import { Hero } from '@/presentation/pages/home/components/hero'
import styled from 'styled-components'

export const Home = () => {
  return (
    <HomeContainer>
      <main>
        <Hero />
      </main>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  width: 100%;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.mx.white};
  min-height: 100vh;

  main {
    width: 100%;
  }
`
