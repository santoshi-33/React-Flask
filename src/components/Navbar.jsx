import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#challenge', label: 'Challenge' },
  { href: '#why', label: 'Why It Works' },
  { href: '#lead', label: 'Free Consultation' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-lg shadow-indigo-500/5 bg-white/85 backdrop-blur-xl border-b border-indigo-100/60'
          : 'bg-white/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group" aria-label="Zebaq home">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-black text-sm shadow-md shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
            Z
            <span className="absolute inset-0 rounded-lg animate-gradient-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Zebaq
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-all hover:bg-indigo-50 hover:text-indigo-700"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <motion.a
            href="#challenge"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
          >
            Start Challenge
            <span aria-hidden>→</span>
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-indigo-50 transition"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block h-0.5 w-5 bg-slate-700 rounded-full transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-5 bg-slate-700 rounded-full transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-slate-700 rounded-full transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden bg-white/95 backdrop-blur-md border-t border-indigo-100/60"
          >
            <ul className="flex flex-col px-5 py-3 gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="#challenge"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2.5 text-sm font-semibold text-white text-center"
                >
                  Start Challenge →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
