import { motion, AnimatePresence } from 'framer-motion'

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function QuestionCard({
  question,
  selectedKey,
  onSelect,
  questionIndex,
  totalQuestions,
}) {
  return (
    <div className="w-full">
      {/* Question counter */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
          Question {questionIndex + 1}
        </span>
        <span className="text-xs font-medium text-slate-400">
          {questionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-balance text-xl font-bold text-slate-900 sm:text-2xl leading-snug">
        {question.question}
      </h2>

      {/* Options */}
      <ul className="mt-6 space-y-3" role="radiogroup" aria-label="Answer options">
        {question.options.map((opt, i) => {
          const isSelected = selectedKey === opt.key
          return (
            <li key={opt.key}>
              <motion.button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(opt.key)}
                whileHover={{ scale: 1.015, x: 2 }}
                whileTap={{ scale: 0.985 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}
                className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border-2 px-5 py-3.5 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-violet-50 shadow-lg shadow-indigo-500/10'
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-md'
                }`}
              >
                {/* shimmer on hover */}
                {!isSelected && (
                  <span className="pointer-events-none absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-indigo-50/60 group-hover:translate-x-[200%] transition-transform duration-500" aria-hidden />
                )}

                {/* Key badge */}
                <span
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                  }`}
                >
                  {opt.key}
                </span>

                {/* Option text */}
                <span
                  className={`flex-1 text-sm font-medium sm:text-base transition-colors duration-200 ${
                    isSelected ? 'text-indigo-900' : 'text-slate-700 group-hover:text-slate-900'
                  }`}
                >
                  {opt.text}
                </span>

                {/* Check mark when selected */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-xs"
                    >
                      ✓
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </li>
          )
        })}
      </ul>

      {/* Explanation callout — revealed after selection */}
      <AnimatePresence mode="wait">
        {selectedKey && (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-3 rounded-2xl border border-cyan-200/70 bg-gradient-to-br from-cyan-50 to-sky-50 px-5 py-4">
              <span className="mt-0.5 text-cyan-600 text-lg shrink-0">💡</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">
                  Pro Insight
                </p>
                <p className="text-sm text-cyan-900 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
