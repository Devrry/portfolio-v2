import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Projects from './components/Projects'
import Process from './components/Process'
import About from './components/About'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
