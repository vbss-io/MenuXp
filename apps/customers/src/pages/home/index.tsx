import styled from 'styled-components'

import Analytics from '@/pages/home/components/analytics'
import CTASection from '@/pages/home/components/cta-section'
import FAQ from '@/pages/home/components/faq'
import FeatureShowcase from '@/pages/home/components/feature-showcase'
import Footer from '@/pages/home/components/footer'
import { Header } from '@/pages/home/components/header'
import { Hero } from '@/pages/home/components/hero'
import HowItWorks from '@/pages/home/components/how-it-works'
import MiniGames from '@/pages/home/components/mini-games'
import Plans from '@/pages/home/components/plans'
import TrustBar from '@/pages/home/components/trust-bar'
import ValueProps from '@/pages/home/components/value-props'

export const Home = () => {
  return (
    <HomeContainer>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ValueProps />
        <FeatureShowcase />
        <HowItWorks />
        <MiniGames />
        <Plans />
        <Analytics />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
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
    margin-top: 5rem;
  }
`
