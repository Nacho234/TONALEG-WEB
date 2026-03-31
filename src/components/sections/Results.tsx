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
    <section className="py-28 bg-[#1a1a1a] overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#c9a96e]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#c9a96e]/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Resultados Reales"
          title="Ciencia que se ve. Lujo que se siente."
          subtitle="Cada fórmula TONALEG ha sido validada clínicamente para garantizar resultados medibles y sostenibles."
          light
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
              <div className="text-white font-medium mb-2 text-sm">{stat.label}</div>
              <div className="text-white/40 text-xs">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Before/After visual */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10 rounded-3xl p-8 text-center relative">
              <div className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-6">Antes</div>
              <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-[#3a3a3a] overflow-hidden flex items-center justify-center bg-[#252525]">
                {/* Abstract hair representation */}
                <div className="flex flex-col gap-1.5 items-center">
                  {[70, 85, 60, 75, 50].map((w, i) => (
                    <div
                      key={i}
                      className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-white/40 text-sm">Cabello opaco, frágil y sin vida</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="bg-gradient-to-br from-[#c9a96e]/20 to-[#1a1a1a] border border-[#c9a96e]/30 rounded-3xl p-8 text-center relative">
              <div className="text-[#c9a96e] text-xs font-semibold tracking-widest uppercase mb-6">Después · 4 semanas</div>
              <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-[#c9a96e]/40 overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#c9a96e]/10 to-[#1a1a1a]">
                {/* Abstract shiny hair */}
                <div className="flex flex-col gap-1.5 items-center">
                  {[90, 100, 85, 95, 80].map((w, i) => (
                    <div
                      key={i}
                      className="h-0.5 rounded"
                      style={{
                        width: `${w}%`,
                        background: 'linear-gradient(90deg, transparent, #c9a96e, #e8d5b5, #c9a96e, transparent)',
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-white/70 text-sm">Cabello luminoso, fuerte y vitalizado</p>

              {/* Sparkle effects */}
              {[
                { top: '20%', right: '15%' },
                { top: '60%', right: '8%' },
                { top: '35%', left: '10%' },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                  className="absolute text-[#c9a96e] text-lg"
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
