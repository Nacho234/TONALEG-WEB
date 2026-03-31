import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import BrandStrip from '@/components/sections/BrandStrip'
import Products from '@/components/sections/Products'
import Ingredients from '@/components/sections/Ingredients'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import Results from '@/components/sections/Results'
import Press from '@/components/sections/Press'
import EmailCapture from '@/components/sections/EmailCapture'

export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <BrandStrip />
        <Products />
        <Ingredients />
        <HowItWorks />
        <Results />
        <Testimonials />
        <Press />
        <EmailCapture />
      </main>
      <Footer />
    </div>
  )
}
