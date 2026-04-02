import { Routes, Route } from 'react-router-dom'
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
import Founder from '@/components/sections/Founder'
import CustomCursor from '@/components/common/CustomCursor'
import CartDrawer from '@/components/common/CartDrawer'
import LoadingScreen from '@/components/common/LoadingScreen'
import Marquee from '@/components/common/Marquee'
import SectionIndicator from '@/components/common/SectionIndicator'
import Catalog from '@/pages/Catalog'

function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <LoadingScreen />
      <SectionIndicator />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <BrandStrip />
        <Products />
        <Founder />
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

export default function App() {
  return (
    <>
      <CustomCursor />
      <CartDrawer />
      <div style={{ cursor: 'none' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalog />} />
        </Routes>
      </div>
    </>
  )
}
