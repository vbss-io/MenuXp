import Analytics from '@/presentation/components/ui/landing-page/Analytics'
import CTASection from '@/presentation/components/ui/landing-page/CTASection'
import FAQ from '@/presentation/components/ui/landing-page/FAQ'
import FeatureShowcase from '@/presentation/components/ui/landing-page/FeatureShowcase'
import Footer from '@/presentation/components/ui/landing-page/Footer'
import Hero from '@/presentation/components/ui/landing-page/hero'
import HowItWorks from '@/presentation/components/ui/landing-page/HowItWorks'
import MiniGames from '@/presentation/components/ui/landing-page/MiniGames'
import TrustBar from '@/presentation/components/ui/landing-page/TrustBar'
import ValueProps from '@/presentation/components/ui/landing-page/ValueProps'

// To-Do: Refactor componentes and page style
// Done: Hero Component
export const Home = () => {
  return (
    <div className="font-body w-full overflow-x-hidden">
      <main className="w-full">
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
