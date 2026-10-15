import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Check, Globe, GraduationCap, LayoutDashboard, Plug, ShoppingCart, Wrench } from 'lucide-react'
import { capstone, services } from '../data'
import { Section, SectionHeading, fadeUp, stagger } from './ui'

const icons = { layout: LayoutDashboard, globe: Globe, cart: ShoppingCart, chart: BarChart3, plug: Plug, wrench: Wrench }

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading index="01" kicker="services" title="What I can build for you" />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => {
          const Icon = icons[s.icon]
          return (
            <motion.a
              key={s.title}
              href="#contact"
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-coal p-7 transition-colors hover:border-lemon/50"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-lemon/0 blur-3xl transition-colors duration-500 group-hover:bg-lemon/15" />
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-lemon/10 text-lemon transition-colors group-hover:bg-lemon group-hover:text-ink">
                <Icon size={24} />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{s.title}</h3>
              <p className="flex-1 leading-relaxed text-mist">{s.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-lemon opacity-0 transition-opacity group-hover:opacity-100">
                Get a quote <ArrowRight size={16} />
              </span>
            </motion.a>
          )
        })}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-5 overflow-hidden rounded-3xl bg-lemon p-7 text-ink sm:p-10"
      >
        <GraduationCap
          aria-hidden="true"
          strokeWidth={1.25}
          className="pointer-events-none absolute -right-8 -bottom-10 h-56 w-56 opacity-15 sm:h-72 sm:w-72"
        />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-lemon">
              <GraduationCap size={16} /> For students
            </span>
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{capstone.title}</h3>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink/75">{capstone.description}</p>
          </div>
          <div>
            <ul className="space-y-3">
              {capstone.points.map((pt) => (
                <li key={pt} className="flex items-center gap-3 font-medium">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-lemon">
                    <Check size={14} />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              onClick={() => window.dispatchEvent(new CustomEvent('select-project-type', { detail: 'Capstone project' }))}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-lemon"
            >
              Inquire about your capstone
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
