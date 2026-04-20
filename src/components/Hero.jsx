import { motion } from 'framer-motion'

const stats = [
  { num: '100+', label: 'Brands Scaled' },
  { num: '2x', label: 'Avg Engagement Boost' },
  { num: '60s', label: 'To See Your Score' },
  { num: '0₹', label: 'To Get Started' },
]

export default function Hero({ onStartChallenge }) {
  return (
    <section className="relative overflow-hidden noise">
      {/* ── Animated gradient backdrop ── */}
      <div className="animate-gradient-bg absolute inset-0 opacity-[0.08]" aria-hidden />

      {/* ── Floating orbs ── */}
      <div className="orb-a pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-violet-400/20 blur-3xl" aria-hidden />
      <div className="orb-b pointer-events-none absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-cyan-400/15 blur-3xl" aria-hidden />
      <div className="orb-c pointer-events-none absolute left-1/3 bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-2xl" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-700 shadow-sm mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          India · SEO · Social · Branding · Web
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
        >
          Is Your Marketing{' '}
          <span className="gradient-text">Actually Working?</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl leading-relaxed"
        >
          Take this <strong className="text-slate-800 font-semibold">60-second challenge</strong> and discover exactly where you're leaving growth on the table.
        </motion.p>

        {/* CTA cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.32, type: 'spring', stiffness: 220, damping: 20 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            type="button"
            id="hero-cta-btn"
            onClick={onStartChallenge}
            whileHover={{ scale: 1.04, boxShadow: '0 20px 40px -8px rgba(99,102,241,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/30 transition-shadow"
          >
            {/* shimmer sweep */}
            <span className="absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-white/20 group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" aria-hidden />
            <span>🚀</span>
            Start Free Challenge
          </motion.button>

          <motion.a
            href="#why"
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-700 transition-colors"
          >
            How it works ↓
          </motion.a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xs text-slate-400"
        >
          Built as a concept for Zebaq · No credit card required · Free forever
        </motion.p>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm px-4 py-4 text-center shadow-sm card-hover"
            >
              <p className="text-2xl font-black gradient-text">{s.num}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave separator */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" aria-hidden />
    </section>
  )
}
