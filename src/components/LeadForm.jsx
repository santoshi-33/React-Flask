import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BUSINESS_TYPES = [
  'SaaS / Tech',
  'E-commerce',
  'Agency',
  'Local Business',
  'D2C Brand',
  'Startup',
  'Healthcare',
  'Education',
  'Real Estate',
  'Other',
]

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

/**
 * Lead capture form.
 * Validates: name required, valid email, business type selected.
 * On success: logs payload, shows Zebaq confirmation message.
 */
export default function LeadForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = 'Your name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!emailOk(email)) e.email = 'Please enter a valid email address'
    if (!businessType) e.businessType = 'Please select a business type'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)

    // Simulate network delay for realism
    await new Promise((r) => setTimeout(r, 1100))

    const payload = {
      name: name.trim(),
      email: email.trim(),
      businessType,
      submittedAt: new Date().toISOString(),
      source: 'zebaq-landing-quiz',
    }
    console.log('[Zebaq lead captured]', payload)
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 px-8 py-10 text-center shadow-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 18 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white shadow-lg shadow-emerald-500/30"
        >
          ✓
        </motion.div>
        <h3 className="text-xl font-bold text-emerald-900">You're all set!</h3>
        <p className="mt-3 text-base text-emerald-800 leading-relaxed max-w-xs mx-auto">
          Our team at <strong>Zebaq</strong> will reach out with your personalised growth plan within 24 hours.
        </p>
        <p className="mt-4 text-xs text-emerald-600">Check your inbox (and spam folder just in case)</p>
      </motion.div>
    )
  }

  return (
    <form
      id="lead"
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xl shadow-slate-200/60"
    >
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
        Free · No commitment · Results in 24h
      </p>

      {/* Name */}
      <div className="mb-5">
        <label htmlFor="lead-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Full Name
        </label>
        <input
          id="lead-name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: '' })) }}
          placeholder="Ravi Sharma"
          autoComplete="name"
          className={`w-full rounded-xl border px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/25 ${
            errors.name ? 'border-red-400 bg-red-50 focus:border-red-400' : 'border-slate-200 focus:border-indigo-500'
          }`}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              key="err-name"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1.5 text-xs text-red-600 font-medium"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="lead-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Work Email
        </label>
        <input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: '' })) }}
          placeholder="ravi@company.com"
          autoComplete="email"
          className={`w-full rounded-xl border px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/25 ${
            errors.email ? 'border-red-400 bg-red-50 focus:border-red-400' : 'border-slate-200 focus:border-indigo-500'
          }`}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              key="err-email"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1.5 text-xs text-red-600 font-medium"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Business type */}
      <div className="mb-7">
        <label htmlFor="lead-biz" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Business Type
        </label>
        <div className="relative">
          <select
            id="lead-biz"
            value={businessType}
            onChange={(e) => { setBusinessType(e.target.value); if (errors.businessType) setErrors((p) => ({ ...p, businessType: '' })) }}
            className={`w-full appearance-none rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/25 pr-10 ${
              businessType ? 'text-slate-900' : 'text-slate-400'
            } ${
              errors.businessType ? 'border-red-400 bg-red-50 focus:border-red-400' : 'border-slate-200 focus:border-indigo-500 bg-white'
            }`}
          >
            <option value="">Select your business type…</option>
            {BUSINESS_TYPES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {/* custom chevron */}
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">▾</span>
        </div>
        <AnimatePresence>
          {errors.businessType && (
            <motion.p
              key="err-biz"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1.5 text-xs text-red-600 font-medium"
            >
              {errors.businessType}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.03, boxShadow: '0 16px 32px -8px rgba(99,102,241,0.45)' } : {}}
        whileTap={!loading ? { scale: 0.97 } : {}}
        className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Connecting to Zebaq team…
          </span>
        ) : (
          'Get My Free Growth Plan →'
        )}
      </motion.button>

      <p className="mt-4 text-center text-xs text-slate-400">
        🔒 Your data is safe. No spam, ever.
      </p>
    </form>
  )
}
