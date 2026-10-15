import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Wrench } from 'lucide-react'
import { profile } from '../data'
import { SocialLinks, fadeUp, stagger } from './ui'

function timeLeft(target) {
  const ms = Math.max(0, target - Date.now())
  return {
    ms,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  }
}

function Digit({ value }) {
  return (
    <span className="relative inline-flex h-[1.1em] w-[0.62em] justify-center overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Unit({ value, label }) {
  const digits = String(value).padStart(2, '0').split('')
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center rounded-2xl border border-line bg-coal/80 px-3 py-4 backdrop-blur sm:min-w-28 sm:px-6 sm:py-6"
    >
      <span className="flex text-4xl leading-none font-bold text-lemon tabular-nums sm:text-6xl">
        {digits.map((d, i) => (
          <Digit key={i} value={d} />
        ))}
      </span>
      <span className="mt-2 font-mono text-[11px] tracking-widest text-mist uppercase sm:text-xs">{label}</span>
    </motion.div>
  )
}

export default function ComingSoon({ target, onLaunch }) {
  const [left, setLeft] = useState(() => timeLeft(target))

  useEffect(() => {
    const id = setInterval(() => {
      const next = timeLeft(target)
      setLeft(next)
      if (next.ms === 0) {
        clearInterval(id)
        onLaunch()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [target, onLaunch])

  const launch = new Date(target).toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/3 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-lemon/20 blur-[140px]"
      />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <img src={profile.logo} alt={profile.handle} className="h-8 w-auto" />
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-lemon px-5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105"
        >
          <Mail size={16} /> Contact me
        </a>
      </header>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-lemon/30 bg-lemon/5 px-4 py-1.5 text-sm text-lemon"
          >
            <motion.span
              animate={{ rotate: [0, -20, 20, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}
              className="inline-flex"
            >
              <Wrench size={15} />
            </motion.span>
            Upgrading my portfolio
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-6xl">
            Something <span className="text-lemon">new</span> is
            <br className="hidden sm:block" /> coming soon.
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mist lg:mx-0">
            I'm {profile.name}, a freelance full stack developer. I'm putting the finishing touches on my new
            portfolio. It launches on <span className="text-white">{launch}</span>.
          </motion.p>

          <motion.div
            variants={stagger(0.08)}
            className="mt-10 grid grid-cols-4 gap-2 sm:inline-grid sm:gap-4"
            role="timer"
            aria-label={`${left.days} days, ${left.hours} hours, ${left.minutes} minutes left`}
          >
            <Unit value={left.days} label="Days" />
            <Unit value={left.hours} label="Hours" />
            <Unit value={left.minutes} label="Minutes" />
            <Unit value={left.seconds} label="Seconds" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <p className="mb-4 text-sm text-mist">
              Need a system or capstone project now? I'm still taking projects. Message me:
            </p>
            <SocialLinks socials={profile.socials} className="justify-center lg:justify-start" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-4 top-[12%] bottom-0 rounded-t-full bg-gradient-to-b from-lemon via-lemon/70 to-lemon/0"
          />
          <img
            src={profile.photo}
            alt={profile.name}
            className="relative mx-auto h-[540px] w-auto [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
          />
        </motion.div>
      </div>
    </main>
  )
}
