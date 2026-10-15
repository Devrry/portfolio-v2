import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Zap } from 'lucide-react'
import { profile } from '../data'
import { SocialLinks, fadeUp, stagger } from './ui'

function RotatingWord() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2400)
    return () => clearInterval(id)
  }, [])

  // Every word sits in the same grid cell, so the box is always as wide as the
  // longest one and the layout (and the portrait beside it) never shifts.
  return (
    <span className="inline-grid overflow-hidden pb-1 align-bottom whitespace-nowrap">
      {profile.roles.map((role, i) => {
        const offset = (i - index + profile.roles.length) % profile.roles.length
        const state = offset === 0 ? 'active' : offset === profile.roles.length - 1 ? 'leaving' : 'waiting'
        return (
          <motion.span
            key={role}
            aria-hidden={state !== 'active'}
            initial={false}
            animate={state}
            variants={{
              active: { y: '0%', opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              leaving: { y: '-100%', opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              waiting: { y: '100%', opacity: 0, transition: { duration: 0 } },
            }}
            className="text-lemon [grid-area:1/1]"
          >
            {role}
          </motion.span>
        )
      })}
    </span>
  )
}

function Portrait() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[320px] sm:max-w-md"
    >
      {/* lemon backdrop so the dark suit stands out from the dark page */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-4 top-[12%] bottom-0 rounded-t-full bg-gradient-to-b from-lemon via-lemon/70 to-lemon/0"
      />
      <div className="absolute inset-x-0 top-[8%] bottom-0 rounded-t-full border border-lemon/30" />

      <img
        src={profile.photo}
        alt={profile.name}
        className="relative z-10 mx-auto h-[400px] w-auto sm:h-[540px] lg:h-[600px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
      />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[22%] -left-2 z-20 rounded-2xl border border-line bg-coal/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-8"
      >
        <p className="text-2xl font-bold text-lemon">1.5 yrs</p>
        <p className="text-xs text-mist">Freelancing</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[52%] -right-2 z-20 flex items-center gap-2 rounded-2xl bg-lemon px-4 py-3 font-semibold text-ink shadow-xl sm:-right-6"
      >
        <Zap size={18} /> Full stack
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[10%] left-0 z-20 flex items-center gap-2 rounded-full border border-line bg-coal/90 px-4 py-2 text-sm shadow-xl backdrop-blur sm:-left-4"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Open for projects
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/4 right-0 h-[520px] w-[520px] rounded-full bg-lemon/20 blur-[140px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <motion.div variants={stagger(0.12)} initial="hidden" animate="show" className="order-2 lg:order-1">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-lemon/30 bg-lemon/5 px-4 py-1.5 text-sm text-lemon"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lemon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lemon" />
            </span>
            Available for freelance work
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-6xl">
            I build custom
            <br />
            <RotatingWord />
            <br />
            for your business.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            {profile.tagline}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 flex items-center gap-2 text-sm text-mist">
            <MapPin size={16} className="text-lemon" /> {profile.location} · Serving clients across the Philippines
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-lemon px-7 py-3.5 font-semibold text-ink shadow-[0_0_40px_-8px] shadow-lemon/60"
            >
              Start a project
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-medium transition-colors hover:border-lemon hover:text-lemon"
            >
              See my work
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <SocialLinks socials={profile.socials} />
          </motion.div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <Portrait />
        </div>
      </div>
    </section>
  )
}
