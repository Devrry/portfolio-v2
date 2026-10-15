import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Full-screen countdown only: no name, photo or hints about what's launching.

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
    <span className="relative inline-flex h-[1em] w-[0.62em] justify-center overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Unit({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 * index, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <span className="flex text-[28vw] leading-none font-bold tracking-tighter text-lemon tabular-nums sm:text-[14vw] lg:text-[12.5vw]">
        {String(value)
          .padStart(2, '0')
          .split('')
          .map((d, i) => (
            <Digit key={i} value={d} />
          ))}
      </span>
      <span className="mt-2 font-mono text-xs tracking-[0.3em] text-mist uppercase sm:mt-4 sm:text-sm">{label}</span>
    </motion.div>
  )
}

function Colon() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="hidden self-start text-[8vw] leading-[1.2] font-bold text-lemon/40 sm:block"
      aria-hidden="true"
    >
      :
    </motion.span>
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

  const units = [
    [left.days, 'Days'],
    [left.hours, 'Hours'],
    [left.minutes, 'Minutes'],
    [left.seconds, 'Seconds'],
  ]

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lemon/20 blur-[140px]"
      />

      <div className="relative flex flex-col items-center py-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-lemon/30 bg-lemon/5 px-4 py-1.5 text-sm text-lemon sm:mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lemon opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lemon" />
          </span>
          New portfolio launching in
        </motion.p>

        <div
          role="timer"
          aria-label={`${left.days} days, ${left.hours} hours, ${left.minutes} minutes, ${left.seconds} seconds left`}
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:items-start sm:gap-[2vw]"
        >
          {units.map(([value, label], i) => (
            <div key={label} className="contents">
              {i > 0 && <Colon />}
              <Unit value={value} label={label} index={i} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 max-w-2xl sm:mt-14"
        >
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            A freelance full stack developer is <span className="text-lemon">getting ready.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">
            When the timer hits zero, a brand-new portfolio goes live, featuring custom business systems, websites
            and capstone projects for clients across the Philippines. See you on{' '}
            <span className="text-white">{launch}</span>.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
