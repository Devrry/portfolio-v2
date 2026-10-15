import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { launchDate } from './data'
import ComingSoon from './components/ComingSoon'
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

const launchAt = new Date(launchDate).getTime()
// ?preview in the URL shows the real site before launch (for you while you work on it)
const preview = new URLSearchParams(window.location.search).has('preview')

function Site() {
  return (
    <>
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
    </>
  )
}

export default function App() {
  const [launched, setLaunched] = useState(() => preview || Date.now() >= launchAt)
  const onLaunch = useCallback(() => setLaunched(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {launched ? (
          <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Site />
          </motion.div>
        ) : (
          <motion.div key="soon" exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.5 }}>
            <ComingSoon target={launchAt} onLaunch={onLaunch} />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
