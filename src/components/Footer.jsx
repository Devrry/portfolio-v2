import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { profile } from '../data'
import { SocialLinks } from './ui'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <img src={profile.logo} alt={profile.handle} className="h-7 w-auto" />
          <p className="text-sm text-mist">
            © {new Date().getFullYear()} {profile.name}. Freelance full stack developer.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SocialLinks socials={profile.socials} />
          <motion.a
            href="#home"
            aria-label="Back to top"
            whileHover={{ y: -3 }}
            className="grid h-11 w-11 place-items-center rounded-full bg-lemon text-ink"
          >
            <ArrowUp size={18} />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
