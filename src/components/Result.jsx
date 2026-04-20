import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import LeadForm from './LeadForm'

/** Returns tiered message config based on score */
function getScoreConfig(score) {
  if (score >= 80)
    return {
      emoji: '🚀',
      headline: "You're ahead of most businesses!",
      sub: "Impressive! You understand marketing fundamentals. Let's amplify what's working.",
      color: 'emerald',
      ringFrom: '#10b981',
      ringTo: '#6ee7b7',
      badge: 'Marketing Savant',
    }
  if (score >= 50)
    return {
      emoji: '⚡',
      headline: "You're close, but missing key growth tactics.",
      sub: "With a few strategic tweaks you could significantly outperform competitors.",
      color: 'amber',
      ringFrom: '#f59e0b',
      ringTo: '#fde68a',
      badge: 'Growth Potential',
    }
  return {
    emoji: '⚠️',
    headline: "You're losing potential customers every day.",
    sub: "Don't worry — this is fixable. Most businesses are in the same boat before working with us.",
    color: 'rose',
    ringFrom: '#f43f5e',
    ringTo: '#fda4af',
    badge: 'Needs Attention',
  }
}

/** Animated score ring SVG */
function ScoreRing({ score }) {
  const radius = 72
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
      {/* Rotating shimmer border */}
      <div
        className="spin-slow absolute inset-0 rounded-full opacity-30"
        style={{ background: `conic-gradient(from 0deg, #6366f1, #a855f7, #06b6d4, #6366f1)` }}
        aria-hidden
      />
      <div className="absolute inset-2 rounded-full bg-white" aria-hidden />

      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 160 160"
        width="192"
        height="192"
        aria-hidden
      >
        {/* Track */}
        <circle cx="80" cy="80" r={radius} fill="none" strokeWidth="10" stroke="#e2e8f0" />
        {/* Progress */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="10"
          stroke="url(#scoreGrad)"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          style={{ strokeDasharray: circumference }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Score text */}
      <div className="relative text-center z-10">
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 16 }}
          className="text-5xl font-black tabular-nums tracking-tight text-slate-900"
        >
          {score}
        </motion.p>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">/ 100</p>
      </div>
    </div>
  )
}

export default function Result({ score, onRestart, showForm, onShowForm }) {
  const config = getScoreConfig(score)
  const confettiFired = useRef(false)

  // Confetti burst for high scorers
  useEffect(() => {
    if (score >= 80 && !confettiFired.current) {
      confettiFired.current = true
      const t = setTimeout(() => {
        confetti({ particleCount: 160, spread: 80, origin: { y: 0.5 }, colors: ['#6366f1', '#a855f7', '#06b6d4', '#fbbf24'] })
        setTimeout(() => confetti({ particleCount: 60, spread: 50, origin: { x: 0.2, y: 0.6 } }), 300)
        setTimeout(() => confetti({ particleCount: 60, spread: 50, origin: { x: 0.8, y: 0.6 } }), 450)
      }, 500)
      return () => clearTimeout(t)
    }
  }, [score])

  return (
    <div className="mx-auto max-w-lg">
      {/* Score card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        className="rounded-3xl border border-slate-200/60 bg-gradient-to-br from-white via-indigo-50/30 to-white p-8 shadow-2xl shadow-indigo-200/30 text-center"
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6 ${
            config.color === 'emerald'
              ? 'bg-emerald-100 text-emerald-700'
              : config.color === 'amber'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-rose-100 text-rose-700'
          }`}
        >
          {config.badge}
        </motion.span>

        {/* Score ring */}
        <ScoreRing score={score} />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <p className="text-2xl font-bold text-slate-900">
            {config.emoji} {config.headline}
          </p>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{config.sub}</p>
        </motion.div>

        {/* Loss-aversion hook */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 rounded-2xl border border-amber-200/60 bg-amber-50/80 px-5 py-4 text-left"
        >
          <p className="text-sm font-semibold text-amber-900">
            📊 Based on your answers, your current strategy may be costing you leads.
          </p>
          <p className="mt-1 text-xs text-amber-700 leading-relaxed">
            Businesses without a clear funnel lose up to <strong>67% of potential customers</strong> before the first touchpoint.
          </p>
        </motion.div>

        {/* CTAs */}
        <div className="mt-8 space-y-3">
          <AnimatePresence>
            {!showForm && (
              <motion.div
                key="get-plan-btn"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  type="button"
                  onClick={onShowForm}
                  whileHover={{ scale: 1.03, boxShadow: '0 16px 32px -8px rgba(99,102,241,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25"
                >
                  Want a custom growth plan? Get Free Consultation →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={onRestart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-600 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
          >
            ↩ Restart Quiz
          </motion.button>
        </div>
      </motion.div>

      {/* Lead form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="lead-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-slate-900">Want a custom growth plan?</h3>
              <p className="mt-2 text-sm text-slate-500">
                Tell us a bit about yourself and we'll reach out with tailored insights.
              </p>
            </div>
            <LeadForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
