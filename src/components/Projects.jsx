import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data'
import { BrandIcon, Section, SectionHeading, fadeUp, stagger } from './ui'

function Preview({ title, featured }) {
  return (
    <div className="relative h-full min-h-48 overflow-hidden rounded-xl border border-line bg-graphite">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-lemon/25 via-transparent to-transparent" />
      <div className="absolute inset-x-5 top-5 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      <div className="absolute inset-x-5 top-12 space-y-2">
        <div className="h-2.5 w-2/3 rounded bg-white/15" />
        <div className="h-2.5 w-1/2 rounded bg-white/10" />
        {featured && <div className="h-2.5 w-3/4 rounded bg-white/10" />}
      </div>
      <motion.span
        whileHover={{ scale: 1.08 }}
        className={`text-outline absolute right-5 bottom-3 font-bold tracking-tighter select-none ${
          featured ? 'text-7xl' : 'text-5xl'
        }`}
      >
        {title.split(' ')[0]}
      </motion.span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const { featured } = project
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className={`group flex flex-col gap-6 rounded-3xl border border-line bg-coal p-5 transition-colors hover:border-lemon/50 sm:p-6 ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2 md:items-stretch' : ''
      }`}
    >
      <Preview title={project.title} featured={featured} />

      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between font-mono text-xs text-mist">
          <span>{String(index + 1).padStart(2, '0')}</span>
          {featured && <span className="rounded-full bg-lemon px-3 py-1 font-semibold text-ink">Featured</span>}
        </div>
        <h3 className="text-2xl font-semibold transition-colors group-hover:text-lemon">{project.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-mist">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full bg-lemon/10 px-3 py-1 font-mono text-xs text-lemon">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-3">
          <a
            href={project.live}
            className="inline-flex items-center gap-1.5 rounded-full bg-lemon px-5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            Live demo <ArrowUpRight size={16} />
          </a>
          <a
            href={project.code}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2 text-sm transition-colors hover:border-lemon hover:text-lemon"
          >
            <BrandIcon name="github" className="h-4 w-4" /> Code
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading index="02" kicker="work" title="Recent projects" />
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </motion.div>
    </Section>
  )
}
