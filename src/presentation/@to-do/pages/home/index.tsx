// import Analytics from '@/presentation/@to-do/components/ui/landing-page/Analytics'
// import CTASection from '@/presentation/@to-do/components/ui/landing-page/CTASection'
// import FAQ from '@/presentation/@to-do/components/ui/landing-page/FAQ'
// import FeatureShowcase from '@/presentation/@to-do/components/ui/landing-page/FeatureShowcase'
// import Footer from '@/presentation/@to-do/components/ui/landing-page/Footer'
// import HowItWorks from '@/presentation/@to-do/components/ui/landing-page/HowItWorks'
// import MiniGames from '@/presentation/@to-do/components/ui/landing-page/MiniGames'
// import TrustBar from '@/presentation/@to-do/components/ui/landing-page/TrustBar'
// import ValueProps from '@/presentation/@to-do/components/ui/landing-page/ValueProps'
import { Hero } from '@/presentation/pages/home/components/hero'

// To-Do: Refactor componentes and page style
// Done: Hero Component
export const Home = () => {
  return (
    <div className="font-body w-full overflow-x-hidden">
      <main className="w-full">
        <Hero />
        {/* <TrustBar /> */}
        {/* <ValueProps /> */}
        {/* <FeatureShowcase /> */}
        {/* <HowItWorks /> */}
        {/* <MiniGames /> */}
        {/* <Analytics /> */}
        {/* <CTASection /> */}
        {/* <FAQ /> */}
      </main>
      {/* <Footer /> */}
    </div>
  )
}
