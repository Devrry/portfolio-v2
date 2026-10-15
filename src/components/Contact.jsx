import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Check, Clock, Copy, Loader2, Mail, Send, ShieldCheck } from 'lucide-react'
import { inquiry, profile } from '../data'
import { Section, SectionHeading, SocialLinks, fadeUp, stagger } from './ui'

const inputClass =
  'w-full rounded-xl border border-line bg-graphite px-4 py-3 text-white placeholder:text-mist/60 outline-none transition-colors focus:border-lemon'

function Chips({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt
        return (
          <motion.button
            key={opt}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(opt)}
            aria-pressed={active}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active ? 'border-lemon bg-lemon font-medium text-ink' : 'border-line bg-graphite text-mist hover:border-lemon/50 hover:text-white'
            }`}
          >
            {opt}
          </motion.button>
        )
      })}
    </div>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({
    name: '',
    email: '',
    business: '',
    type: inquiry.projectTypes[0],
    budget: '',
    timeline: '',
    message: '',
  })

  // Lets other sections (e.g. the capstone banner) pre-select a project type
  useEffect(() => {
    const onSelect = (e) => setForm((f) => ({ ...f, type: e.detail }))
    window.addEventListener('select-project-type', onSelect)
    return () => window.removeEventListener('select-project-type', onSelect)
  }, [])

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))
  const bind = (key) => ({ value: form[key], onChange: (e) => set(key)(e.target.value) })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  // Sends the inquiry to your inbox through Web3Forms (https://web3forms.com).
  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: inquiry.web3formsKey,
          subject: `New inquiry: ${form.type} — ${form.name}`,
          from_name: 'devrry portfolio',
          botcheck: e.target.botcheck.checked,
          name: form.name,
          email: form.email,
          'Business / school': form.business || '—',
          'Project type': form.type,
          Budget: form.budget || '—',
          Timeline: form.timeline || '—',
          message: form.message,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      setStatus('sent')
      setForm((f) => ({ ...f, business: '', budget: '', timeline: '', message: '' }))
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact">
      <SectionHeading index="06" kicker="hire me" title="Let's build your system" />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="text-lg leading-relaxed text-mist">
            Tell me about your business and what you need built. I'll get back to you with questions, a proposal and a
            quote. The first consultation is free.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-8 space-y-4">
            <li className="flex items-center gap-3">
              <Clock size={20} className="text-lemon" /> Reply within 24 hours
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-lemon" /> Clear quote before any work starts
            </li>
            <li className="flex items-center gap-3">
              <Check size={20} className="text-lemon" /> Support after launch
            </li>
          </motion.ul>

          <motion.button
            variants={fadeUp}
            onClick={copyEmail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 flex w-full items-center gap-4 rounded-2xl border border-line bg-coal p-5 text-left transition-colors hover:border-lemon/60"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lemon text-ink">
              <Mail size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-mist">Prefer email?</span>
              <span className="block truncate text-lg font-medium">{profile.email}</span>
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'done' : 'copy'}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="text-lemon"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.div variants={fadeUp} className="mt-8">
            <p className="mb-4 text-sm text-mist">Or message me on</p>
            <SocialLinks socials={profile.socials} />
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative space-y-6 rounded-3xl border border-line bg-coal p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-mist">Your name *</span>
              <input required placeholder="Juan Dela Cruz" className={inputClass} {...bind('name')} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-mist">Email *</span>
              <input required type="email" placeholder="juan@business.com" className={inputClass} {...bind('email')} />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm text-mist">Business, company or school</span>
            <input placeholder="Optional" className={inputClass} {...bind('business')} />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-mist">What do you need?</span>
            <select className={inputClass} {...bind('type')}>
              {inquiry.projectTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <div>
            <span className="mb-3 block text-sm text-mist">Estimated budget</span>
            <Chips options={inquiry.budgets} value={form.budget} onChange={set('budget')} />
          </div>
          <div>
            <span className="mb-3 block text-sm text-mist">Timeline</span>
            <Chips options={inquiry.timelines} value={form.timeline} onChange={set('timeline')} />
          </div>

          <label className="block">
            <span className="mb-2 block text-sm text-mist">Project details *</span>
            <textarea
              required
              rows={5}
              placeholder="Describe your business and the features your system needs..."
              className={`${inputClass} resize-none`}
              {...bind('message')}
            />
          </label>

          {/* honeypot: hidden from people, bots tick it and get rejected */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-lemon py-4 font-semibold text-ink disabled:cursor-wait disabled:opacity-80"
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send project inquiry
                <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-200"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                Something went wrong and your message wasn't sent. Please try again, or email me directly at{' '}
                {profile.email}.
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {status === 'sent' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="status"
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-3xl bg-coal/95 p-8 text-center backdrop-blur"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  className="grid h-20 w-20 place-items-center rounded-full bg-lemon text-ink"
                >
                  <Check size={40} strokeWidth={3} />
                </motion.span>
                <h3 className="text-2xl font-bold">Message sent!</h3>
                <p className="max-w-sm text-mist">
                  Thanks, {form.name.split(' ')[0]}! I got your inquiry and will reply to {form.email} within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-2 rounded-full border border-line px-5 py-2 text-sm transition-colors hover:border-lemon hover:text-lemon"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </Section>
  )
}
