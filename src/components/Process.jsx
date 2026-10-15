import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { process } from '../data'
import { Section, SectionHeading } from './ui'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })

  return (
    <Section id="process">
      <SectionHeading index="03" kicker="process" title="How we'll work together" />

      <div ref={ref} className="relative">
        {/* progress rail: vertical on mobile, horizontal on desktop */}
        <div className="absolute top-0 bottom-0 left-6 w-px bg-line lg:top-6 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full" />
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute top-0 bottom-0 left-6 w-px origin-top bg-lemon lg:hidden"
        />
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute top-6 left-0 hidden h-px w-full origin-left bg-lemon lg:block"
        />

        <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
          {process.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-20 lg:pl-0"
            >
              <span className="absolute top-0 left-0 grid h-12 w-12 place-items-center rounded-full border-4 border-ink bg-lemon font-mono font-bold text-ink lg:relative lg:mb-6">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-mist">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
