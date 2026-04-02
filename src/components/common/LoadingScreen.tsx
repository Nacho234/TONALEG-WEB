import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 400)
          return 100
        }
        return p + Math.random() * 18 + 5
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center"
        >
          {/* Logo — igual al navbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 mb-16"
          >
            <img src="/logo.png" alt="TONALEG" className="h-14 w-auto object-contain" />
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-[#f0ece8] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#c9a96e] to-[#e8d5b5] rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#6b6b6b]/40 text-xs tracking-widest mt-4 uppercase"
          >
            Cargando experiencia
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
