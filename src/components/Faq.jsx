import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data'
import { Section, SectionHeading } from './ui'

function Item({ faq, open, onToggle }) {
  return (
    <div className={`rounded-2xl border bg-coal transition-colors ${open ? 'border-lemon/50' : 'border-line'}`}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <span className="text-lg font-medium">{faq.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${open ? 'bg-lemon text-ink' : 'bg-graphite text-lemon'}`}
        >
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 leading-relaxed text-mist sm:px-6">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq">
      <SectionHeading index="05" kicker="faq" title="Questions clients ask" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl space-y-3"
      >
        {faqs.map((faq, i) => (
          <Item key={faq.q} faq={faq} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </motion.div>
    </Section>
  )
}
