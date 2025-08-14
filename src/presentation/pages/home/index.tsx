import Analytics from '@/presentation/components/Analytics'
import CTASection from '@/presentation/components/CTASection'
import FAQ from '@/presentation/components/FAQ'
import FeatureShowcase from '@/presentation/components/FeatureShowcase'
import Footer from '@/presentation/components/Footer'
import Hero from '@/presentation/components/Hero'
import HowItWorks from '@/presentation/components/HowItWorks'
import MiniGames from '@/presentation/components/MiniGames'
import NavBar from '@/presentation/components/NavBar'
import TrustBar from '@/presentation/components/TrustBar'
import ValueProps from '@/presentation/components/ValueProps'
// import { useNavigate } from 'react-router-dom'
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

// const Title = styled.h1`
//   font-size: ${({ theme }) => theme.fontSizes.xxl};
//   font-weight: ${({ theme }) => theme.fontWeights.bold};
//   color: ${({ theme }) => theme.colors.primary};
//   margin-bottom: ${({ theme }) => theme.spacing.md};
//   text-align: center;
//   z-index: 1;
// `

// const Description = styled.p`
//   font-size: ${({ theme }) => theme.fontSizes.md};
//   color: ${({ theme }) => theme.colors.text};
//   margin-bottom: ${({ theme }) => theme.spacing.xl};
//   max-width: 400px;
//   text-align: center;
//   z-index: 1;
// `

export const Home = () => {
  // const navigate = useNavigate()
  return (
    <div className="font-body">
      <NavBar />
      <main>
        <Hero />
        <TrustBar />
        <ValueProps />
        <FeatureShowcase />
        <HowItWorks />
        <MiniGames />
        <Analytics />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
