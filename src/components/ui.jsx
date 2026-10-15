import { motion } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 md:py-32 ${className}`}>
      {children}
    </section>
  )
}

export function SectionHeading({ index, kicker, title }) {
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-14"
    >
      <motion.p variants={fadeUp} className="mb-3 font-mono text-sm text-lemon">
        {index} / {kicker}
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </motion.h2>
    </motion.div>
  )
}

const brandPaths = {
  facebook:
    'M9.1 23.69v-7.98H6.63v-3.67H9.1v-1.58c0-4.09 1.85-5.98 5.86-5.98.4 0 .96.04 1.47.1.39.04.77.11 1.14.2v3.32a8.6 8.6 0 0 0-.65-.03 26.8 26.8 0 0 0-.73-.01c-.71 0-1.26.1-1.68.31-.29.15-.52.36-.68.62-.26.42-.37 1-.37 1.75v1.3h3.92l-.39 2.1-.29 1.56h-3.25v8.25C19.4 23.24 24 18.18 24 12.04c0-6.63-5.37-12-12-12S0 5.42 0 12.04c0 5.63 3.87 10.35 9.1 11.65Z',
  github:
    'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  x: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z',
}

export function BrandIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={brandPaths[name]} />
    </svg>
  )
}

const socialLabels = { facebook: 'Facebook', github: 'GitHub', linkedin: 'LinkedIn', x: 'X (Twitter)' }

export function SocialLinks({ socials, className = '' }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {Object.entries(socials).map(([key, href]) => (
        <motion.a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={socialLabels[key]}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="grid h-11 w-11 place-items-center rounded-full border border-line text-mist transition-colors hover:border-lemon hover:text-lemon"
        >
          <BrandIcon name={key} />
        </motion.a>
      ))}
    </div>
  )
}
