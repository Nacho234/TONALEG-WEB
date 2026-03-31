import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, FlaskConical, Recycle } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const promises = [
  { icon: Leaf, label: '100% Natural', sublabel: 'Ingredientes puros' },
  { icon: ShieldCheck, label: 'Cruelty Free', sublabel: 'Sin pruebas en animales' },
  { icon: FlaskConical, label: 'Testado Clínicamente', sublabel: 'Aval dermatológico' },
  { icon: Recycle, label: 'Sostenible', sublabel: 'Empaque eco-friendly' },
]

export default function BrandStrip() {
  return (
    <section className="py-10 border-y border-[#f0ece8] bg-gradient-to-r from-[#fafaf9] via-white to-[#fafaf9]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[#f0ece8]">
          {promises.map(({ icon: Icon, label, sublabel }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex items-center gap-3 md:justify-center px-4 md:px-8"
            >
              <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#c9a96e]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1a1a1a]">{label}</div>
                <div className="text-xs text-[#6b6b6b]">{sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
