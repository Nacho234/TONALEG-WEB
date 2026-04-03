import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <section id="contacto" className="py-28" style={{ background: 'linear-gradient(135deg, #0f0a1e 0%, #1e0a3c 40%, #0a1628 70%, #1a0a2e 100%)' }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#c4b5fd]">
              Exclusivo para suscriptores
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight"
          >
            Sé la Primera en<br />Descubrir lo Nuevo
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-white/60 mb-6 leading-relaxed"
          >
            Únete a nuestra comunidad y disfruta de beneficios exclusivos desde el primer día.
          </motion.p>

          <motion.ul variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-2 text-sm text-white/60">
            {[
              '15% de descuento en tu primer pedido',
              'Acceso anticipado a nuevos lanzamientos',
              'Rituales y guías exclusivas',
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#a855f7]/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c4b5fd] text-[10px]">✓</span>
                </span>
                {benefit}
              </li>
            ))}
          </motion.ul>

          {!submitted ? (
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 px-5 py-4 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 transition-all text-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gold px-6 py-4 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Suscribirme
                <ArrowRight size={16} />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-2xl py-4 px-8 max-w-md mx-auto"
            >
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
              <span className="text-green-700 font-medium text-sm">
                ¡Bienvenida! Tu código de descuento llegará pronto a tu email.
              </span>
            </motion.div>
          )}

          <motion.p
            variants={fadeUp}
            className="text-xs text-white/30 mt-4"
          >
            Sin spam. Cancela cuando quieras. Privacidad garantizada.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
