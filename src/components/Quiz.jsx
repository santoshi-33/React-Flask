import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuestionCard from './QuestionCard'
import Result from './Result'

/** Quiz question bank — swap for CMS/API later */
export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'Which headline converts better?',
    options: [
      { key: 'A', text: 'We provide marketing services' },
      { key: 'B', text: 'Get 3x more leads in 30 days' },
      { key: 'C', text: 'Welcome to our company' },
      { key: 'D', text: 'Click here' },
    ],
    correct: 'B',
    explanation: 'Specific, measurable results ("3x", "30 days") increase urgency and trust — making the reader visualise the outcome before they click.',
  },
  {
    id: 'q2',
    question: 'Which CTA performs best?',
    options: [
      { key: 'A', text: 'Submit' },
      { key: 'B', text: 'Click here' },
      { key: 'C', text: 'Get My Free Audit' },
      { key: 'D', text: 'Next' },
    ],
    correct: 'C',
    explanation: 'Clear value + first-person phrasing + low friction beats generic labels. "Get My Free Audit" reduces cognitive load and communicates benefit.',
  },
  {
    id: 'q3',
    question: 'Which content strategy drives the best results?',
    options: [
      { key: 'A', text: 'Random posts when inspired' },
      { key: 'B', text: 'Value-driven storytelling' },
      { key: 'C', text: 'Only promotional content' },
      { key: 'D', text: 'Copying competitors' },
    ],
    correct: 'B',
    explanation: 'Value + storytelling builds trust and retention. People buy from brands they feel connected to — stories create that connection.',
  },
  {
    id: 'q4',
    question: 'What increases social media engagement most?',
    options: [
      { key: 'A', text: 'Long, dense paragraphs' },
      { key: 'B', text: 'Strong hooks + visuals' },
      { key: 'C', text: 'Posts with no captions' },
      { key: 'D', text: 'Plain text with no formatting' },
    ],
    correct: 'B',
    explanation: 'Pattern interrupts (hooks) stop the scroll; visuals hold attention. The first 1–2 seconds decide if someone keeps reading or moves on.',
  },
  {
    id: 'q5',
    question: 'What is the most effective way to convert leads?',
    options: [
      { key: 'A', text: 'No CTA — let them decide' },
      { key: 'B', text: 'Aggressive hard selling' },
      { key: 'C', text: 'Offer genuine value first' },
      { key: 'D', text: 'Ignore user objections' },
    ],
    correct: 'C',
    explanation: 'Reciprocity is one of the strongest psychological triggers. When you give first, prospects feel compelled to give back — converting at far higher rates.',
  },
]

/** Score: 20 points per correct answer, 100 total */
function computeScore(answersMap) {
  return QUIZ_QUESTIONS.reduce((sum, q, i) => {
    return sum + (answersMap[i] === q.correct ? 20 : 0)
  }, 0)
}

/**
 * Main quiz orchestrator.
 * Phases: intro → quiz (1 question/screen, progress bar, slide) → result
 *
 * UX principles applied:
 * - Progress triggers completion bias
 * - Explanation per question educates & builds rapport
 * - Short delay between questions gives perceived polish
 * - "Next" disabled until option chosen (reduces bad answers)
 */
export default function Quiz() {
  const [phase, setPhase] = useState('intro') // 'intro' | 'quiz' | 'result'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedKey, setSelectedKey] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [resultScore, setResultScore] = useState(0)

  const total = QUIZ_QUESTIONS.length
  const progress = phase === 'quiz' ? ((currentIndex + 1) / total) * 100 : 0

  const resetQuiz = () => {
    setPhase('intro')
    setCurrentIndex(0)
    setAnswers({})
    setSelectedKey(null)
    setShowLeadForm(false)
    setTransitioning(false)
    setResultScore(0)
  }

  const startQuiz = () => {
    setPhase('quiz')
    setCurrentIndex(0)
    setSelectedKey(null)
    setAnswers({})
    setShowLeadForm(false)
    setResultScore(0)
  }

  const goNext = () => {
    if (!selectedKey) return
    setTransitioning(true)
    window.setTimeout(() => {
      const nextAnswers = { ...answers, [currentIndex]: selectedKey }
      setAnswers(nextAnswers)
      if (currentIndex < total - 1) {
        setCurrentIndex((i) => i + 1)
        setSelectedKey(null)
      } else {
        setResultScore(computeScore(nextAnswers))
        setPhase('result')
      }
      setTransitioning(false)
    }, 280)
  }

  return (
    <section id="challenge" className="relative px-4 py-16 sm:px-6 sm:py-24">
      {/* Subtle background ornament */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-violet-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <span className="inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Marketing Challenge
          </span>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Test Your Marketing IQ
          </h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-md mx-auto">
            If you're not testing offers &amp; CTAs,{' '}
            <span className="font-semibold text-indigo-700">you're leaving growth on the table</span>{' '}
            that competitors may already be capturing.
          </p>
        </motion.div>

        {/* Phase transitions */}
        <AnimatePresence mode="wait">

          {/* ── INTRO CARD ── */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-2xl shadow-slate-200/50 text-center"
            >
              {/* Decorative icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 250, damping: 18 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-4xl shadow-xl shadow-indigo-500/25"
              >
                🧠
              </motion.div>

              <h3 className="text-2xl font-extrabold text-slate-900">Marketing Challenge</h3>
              <p className="mt-2 text-slate-500">5 quick questions to stress-test your strategy</p>

              {/* Mini stats */}
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {[
                  { val: '5', lbl: 'questions' },
                  { val: '60s', lbl: 'to complete' },
                  { val: '100', lbl: 'max score' },
                ].map((s) => (
                  <div key={s.lbl} className="rounded-2xl bg-indigo-50 px-3 py-3">
                    <p className="text-lg font-black text-indigo-700">{s.val}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.lbl}</p>
                  </div>
                ))}
              </div>

              <motion.button
                type="button"
                id="quiz-begin-btn"
                onClick={startQuiz}
                whileHover={{ scale: 1.04, boxShadow: '0 16px 32px -8px rgba(99,102,241,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/25"
              >
                Begin Challenge 🚀
              </motion.button>
              <p className="mt-3 text-xs text-slate-400">No signup required · 100% free</p>
            </motion.div>
          )}

          {/* ── QUIZ QUESTIONS ── */}
          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden"
            >
              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-100">
                <motion.div
                  className="progress-bar h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              <div className="p-7 sm:p-10">
                {/* Steps indicator */}
                <div className="mb-2 flex gap-2 justify-center">
                  {QUIZ_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i < currentIndex
                          ? 'bg-indigo-500 w-6'
                          : i === currentIndex
                          ? 'bg-indigo-400 w-6'
                          : 'bg-slate-200 w-3'
                      }`}
                    />
                  ))}
                </div>

                {/* Question area */}
                <div className={`relative mt-6 ${transitioning ? 'pointer-events-none opacity-50' : ''}`}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 32, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -32, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <QuestionCard
                        question={QUIZ_QUESTIONS[currentIndex]}
                        selectedKey={selectedKey}
                        onSelect={setSelectedKey}
                        questionIndex={currentIndex}
                        totalQuestions={total}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-xs text-slate-400 font-medium">
                    {transitioning ? 'Loading next…' : selectedKey ? 'Great choice! Hit Next.' : 'Select an answer to continue'}
                  </p>
                  <motion.button
                    type="button"
                    id="quiz-next-btn"
                    disabled={!selectedKey || transitioning}
                    onClick={goNext}
                    whileHover={selectedKey && !transitioning ? { scale: 1.05 } : {}}
                    whileTap={selectedKey && !transitioning ? { scale: 0.96 } : {}}
                    className={`rounded-2xl px-7 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 ${
                      selectedKey && !transitioning
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 shadow-indigo-500/25 hover:shadow-indigo-500/40'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {currentIndex === total - 1 ? 'See My Results →' : 'Next →'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── RESULTS ── */}
          {phase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Result
                score={resultScore}
                onRestart={resetQuiz}
                showForm={showLeadForm}
                onShowForm={() => setShowLeadForm(true)}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}
