import { useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Quiz from '../components/Quiz'

/* ── Fade-in animation variant ─────────────────────────────── */
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

/* ── Social proof ticker data ──────────────────────────────── */
const proofItems = [
  { icon: '🏢', text: '100+ brands scaled' },
  { icon: '📈', text: '2x avg engagement increase' },
  { icon: '🇮🇳', text: 'India\'s growth partner' },
  { icon: '🎯', text: 'Conversion-first strategy' },
  { icon: '🔍', text: 'SEO that actually ranks' },
  { icon: '📱', text: 'Social media mastery' },
  { icon: '🌐', text: 'Web solutions that convert' },
  { icon: '⭐', text: '4.9 avg client rating' },
]

/* ── WHY THIS WORKS cards ──────────────────────────────────── */
const whyCards = [
  {
    emoji: '🎯',
    title: 'Gamification increases engagement',
    body: 'Quizzes trigger curiosity and completion bias — visitors stay up to 5× longer and are more likely to share.',
    stat: '5× longer visits',
    color: 'from-indigo-500 to-violet-600',
  },
  {
    emoji: '⏱️',
    title: 'Users spend more time on interactive pages',
    body: 'Time-on-site is a key quality signal for algorithms and trust-builder for humans. Every extra minute matters.',
    stat: '+3 min session time',
    color: 'from-violet-500 to-pink-500',
  },
  {
    emoji: '📈',
    title: 'Higher engagement = better conversion',
    body: 'Each answer is a micro-commitment. Psychology shows repeated yeses dramatically increase willingness to convert.',
    stat: '+47% lead quality',
    color: 'from-cyan-500 to-indigo-500',
  },
]

/* ── Services teaser ───────────────────────────────────────── */
const services = [
  { icon: '🔍', name: 'SEO', desc: 'Rank higher, get found faster' },
  { icon: '📱', name: 'Social Media', desc: 'Content that drives real engagement' },
  { icon: '✨', name: 'Branding', desc: 'Identity that stands out & sticks' },
  { icon: '🌐', name: 'Web Solutions', desc: 'Sites designed to convert visitors' },
]

export default function Home() {
  const challengeRef = useRef(null)

  const scrollToChallenge = () => {
    challengeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <Hero onStartChallenge={scrollToChallenge} />

      {/* ── 2. SOCIAL PROOF TICKER ────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-indigo-100/60 bg-white/70 backdrop-blur-sm py-3.5">
        <div className="ticker-track">
          {[...proofItems, ...proofItems].map((item, i) => (
            <div
              key={i}
              className="mx-4 flex shrink-0 items-center gap-2.5 rounded-full border border-slate-200/70 bg-white px-5 py-2 text-xs font-semibold text-slate-700 shadow-sm whitespace-nowrap"
            >
              <span className="text-base" aria-hidden>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. QUIZ SECTION ──────────────────────────────────── */}
      <div ref={challengeRef}>
        <Quiz />
      </div>

      {/* ── 4. SERVICES TEASER ──────────────────────────────── */}
      <motion.section
        {...fade}
        className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8"
      >
        <div className="text-center mb-10">
          <span className="inline-block rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
            What We Do
          </span>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Full-Stack Growth for Your Business
          </h2>
          <p className="mt-2 text-slate-500 max-w-xl mx-auto text-sm">
            From first impression to final conversion — we've got every growth lever covered.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group card-hover relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 text-center shadow-lg shadow-slate-200/30"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl group-hover:bg-indigo-100 transition-colors">
                {s.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 5. WHY THIS WORKS ─────────────────────────────────── */}
      <motion.section
        {...fade}
        id="why"
        className="relative px-5 py-16 sm:px-8 sm:py-20"
      >
        {/* BG accent */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-700 mb-3">
              The Science
            </span>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Why This Works
            </h2>
            <p className="mt-2 text-slate-500 max-w-lg mx-auto text-sm">
              Psychology-first UX: curiosity, progress, reward — without heavy friction.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="card-hover group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-7 shadow-lg shadow-slate-200/40"
              >
                {/* Gradient top stroke */}
                <div className={`absolute left-0 top-0 h-1 w-full rounded-t-3xl bg-gradient-to-r ${card.color}`} aria-hidden />

                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-3xl text-white shadow-lg`}>
                  {card.emoji}
                </div>
                <h3 className="font-bold text-slate-900 leading-snug">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{card.body}</p>

                {/* Stat badge */}
                <div className="mt-4 inline-flex items-center rounded-full border border-indigo-200/60 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                  {card.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 6. FINAL CTA BAND ─────────────────────────────────── */}
      <motion.section
        {...fade}
        className="relative overflow-hidden mx-4 mb-16 sm:mx-8 rounded-3xl"
      >
        <div className="animate-gradient-bg absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />

        <div className="relative px-8 py-16 text-center text-white sm:py-20">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Ready to Stop Losing Customers?
          </motion.h2>
          <p className="mt-4 text-white/80 max-w-md mx-auto">
            Take the 60-second quiz and get a personalised growth plan from the Zebaq team — completely free.
          </p>
          <motion.a
            href="#challenge"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 32px -4px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-indigo-700 shadow-2xl transition-shadow"
          >
            🚀 Start Free Challenge
          </motion.a>
          <p className="mt-3 text-xs text-white/50">No signup · No credit card · 100% free</p>
        </div>
      </motion.section>

      {/* ── 7. FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-slate-200/60 bg-white/80 px-5 py-10 text-center">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-black text-xs shadow-md">
              Z
            </span>
            <span className="text-base font-extrabold tracking-tight text-slate-900">Zebaq</span>
          </div>
          <p className="text-sm text-slate-500">
            India-based digital marketing agency · SEO · Social · Branding · Web
          </p>
          <p className="mt-2 text-xs text-slate-400">
            © {new Date().getFullYear()} Zebaq. Built as a portfolio concept. · All growth metrics are illustrative.
          </p>
        </div>
      </footer>
    </div>
  )
}
