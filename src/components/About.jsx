import { motion } from 'framer-motion'
import { profile, skills, stats } from '../data'
import { Section, SectionHeading, fadeUp, stagger } from './ui'

export default function About() {
  return (
    <Section id="about">
      <SectionHeading index="04" kicker="about" title={`Meet ${profile.handle}`} />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="space-y-5 text-lg leading-relaxed text-mist">
            {profile.about.map((p, i) => (
              <motion.p key={i} variants={fadeUp}>
                {p}
              </motion.p>
            ))}
          </div>

          <motion.p variants={fadeUp} className="mt-10 mb-4 font-mono text-sm text-lemon">
            Tech I work with
          </motion.p>
          <motion.ul variants={stagger(0.03)} className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <motion.li
                key={s}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="rounded-full border border-line bg-coal px-4 py-1.5 font-mono text-sm text-mist transition-colors hover:border-lemon hover:text-lemon"
              >
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid h-fit grid-cols-2 gap-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-line bg-coal p-6 transition-colors hover:border-lemon/60"
            >
              <p className="text-4xl font-bold text-lemon">{s.value}</p>
              <p className="mt-2 text-sm text-mist transition-colors group-hover:text-white">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
