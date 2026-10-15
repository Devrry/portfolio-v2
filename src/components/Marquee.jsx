import { motion } from 'framer-motion'

const items = ['Business Systems', 'Capstone Projects', 'Websites', 'E-commerce', 'Dashboards', 'Booking Systems', 'POS & Inventory', 'APIs', 'Maintenance']

export default function Marquee() {
  return (
    <div className="relative -rotate-1 overflow-hidden border-y border-line bg-lemon py-4 text-ink">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex w-max gap-10 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-xl font-bold tracking-tight uppercase">
            {item} <span aria-hidden="true">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
