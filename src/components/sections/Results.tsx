import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, fadeLeft, fadeRight } from '@/lib/animations'
import AnimatedCounter from '@/components/common/AnimatedCounter'
import SectionHeading from '@/components/common/SectionHeading'

const stats = [
  { value: 94, suffix: '%', label: 'redujo la rotura capilar', description: 'En estudios clínicos de 4 semanas' },
  { value: 89, suffix: '%', label: 'reportó mayor brillo', description: 'Medido con espectrofotometría' },
  { value: 97, suffix: '%', label: 'recomendaría TONALEG', description: 'Según encuesta a 2,000 clientas' },
  { value: 4, suffix: 'sem.', label: 'para resultados visibles', description: 'Uso continuo recomendado' },
]

export default function Results() {
  return (
    <section className="py-28 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fce7f3 40%, #f0e6ff 70%, #fdf4ff 100%)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#a855f7]/12 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#ec4899]/12 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Resultados Reales"
          title="Ciencia que se ve. Lujo que se siente."
          subtitle="Cada fórmula TONALEG ha sido validada clínicamente para garantizar resultados medibles y sostenibles."
        />

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center group"
            >
              <div className="text-5xl md:text-6xl font-bold font-serif mb-3">
                <span className="text-gradient-gold">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <div className="text-[#1a1a1a] font-medium mb-2 text-sm">{stat.label}</div>
              <div className="text-[#6b6b6b] text-xs">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Before/After visual */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-white/60 border border-[#a855f7]/15 rounded-3xl overflow-hidden relative">
              <div className="p-8 text-center">
                <div className="text-[#6b6b6b] text-xs font-semibold tracking-widest uppercase mb-6">Antes</div>
                <div className="w-44 h-44 mx-auto mb-6 rounded-full border-4 border-[#e5e7eb] overflow-hidden bg-[#f9fafb]">
                  <img
                    src="https://res.cloudinary.com/deyt2fnfa/image/upload/v1774975097/ChatGPT_Image_31_mar_2026_13_38_07_ttcgrt.png"
                    alt="Antes"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[#6b6b6b] text-sm">Cabello opaco, frágil y sin vida</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="border border-[#a855f7]/25 rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(236,72,153,0.06) 100%)' }}>
              <div className="p-8 text-center relative">
                <div className="text-[#7c3aed] text-xs font-semibold tracking-widest uppercase mb-6">Después · 4 semanas</div>
                <div className="w-44 h-44 mx-auto mb-6 rounded-full border-4 border-[#a855f7]/30 overflow-hidden bg-white">
                  <img
                    src="https://res.cloudinary.com/deyt2fnfa/image/upload/v1774973355/2_k9sn9j.png"
                    alt="Después"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[#1a1a1a] text-sm">Cabello luminoso, fuerte y vitalizado</p>
              </div>

              {/* Sparkle effects */}
              {[
                { top: '20%', right: '8%' },
                { top: '55%', right: '5%' },
                { top: '35%', left: '5%' },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                  className="absolute text-[#a855f7] text-lg pointer-events-none"
                  style={pos}
                >
                  ✦
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
