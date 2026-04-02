import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { fadeLeft, fadeRight } from '@/lib/animations'

export default function Founder() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} id="historia" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — visual */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Photo frame */}
            <div className="relative">
              {/* Decorative frame offset */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-[#c9a96e]/20" />

              {/* Main photo area */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#f0ece8] to-[#e8d5b5] aspect-[4/5]">
                {/* Abstract founder portrait */}
                <div className="absolute inset-0 flex items-end justify-center pb-12">
                  <motion.div style={{ y }} className="flex flex-col items-center">
                    {/* Head */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#e8c4b8] to-[#c9a96e]/60 border-2 border-[#c9a96e]/30 shadow-lg overflow-hidden relative">
                      {/* Hair */}
                      <div className="absolute -top-2 -left-2 -right-2 h-14 bg-gradient-to-br from-[#a8854d] to-[#7a5c35] rounded-t-full" />
                      {/* Face highlight */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-16 bg-gradient-to-b from-[#f0d5c0] to-[#e8c4b8] rounded-full" />
                    </div>
                    {/* Shoulders / body */}
                    <div className="w-40 h-36 rounded-t-[60px] bg-gradient-to-b from-[#c9a96e]/50 to-[#a8854d]/35 -mt-2 shadow-inner" />
                  </motion.div>
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 to-transparent" />

                {/* Name tag */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card rounded-2xl px-5 py-3">
                    <div className="font-serif text-lg font-semibold text-[#1a1a1a]">Valentina Lagos</div>
                    <div className="text-xs text-[#c9a96e] font-medium">Fundadora & Formuladora</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating award badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -right-6 top-12 glass-card rounded-2xl px-4 py-3 shadow-xl text-center"
            >
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-xs font-semibold text-[#1a1a1a]">Premio</div>
              <div className="text-xs text-[#c9a96e]">Best Hair Brand 2024</div>
            </motion.div>
          </motion.div>

          {/* Right — story */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a96e] mb-4 block">
              Nuestra Historia
            </span>

            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-6 leading-tight">
              Nacida de la<br />
              <span className="text-gradient-gold">Pasión</span> por el Cabello
            </h2>

            <div className="space-y-4 text-[#6b6b6b] leading-relaxed mb-8">
              <p>
                Todo comenzó en un pequeño laboratorio en Buenos Aires. Valentina, química cosmética
                con más de 15 años de experiencia, soñaba con crear algo diferente: productos que
                combinaran la ciencia más avanzada con los mejores ingredientes naturales del mundo.
              </p>
              <p>
                Después de 3 años de investigación y más de 200 fórmulas descartadas, nació TONALEG.
                Un nombre. Una promesa. Una revolución en el cuidado capilar de lujo.
              </p>
            </div>

            {/* Signature */}
            <div className="border-t border-[#f0ece8] pt-6 mb-8">
              <p className="font-serif text-3xl text-[#1a1a1a]/30 italic mb-1">
                Valentina Lagos
              </p>
              <p className="text-xs text-[#6b6b6b]">Fundadora de TONALEG</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '15+', label: 'Años de experiencia' },
                { value: '200+', label: 'Fórmulas investigadas' },
                { value: '2019', label: 'Año de fundación' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl bg-[#fafaf9] border border-[#f0ece8]">
                  <div className="font-serif text-2xl font-bold text-[#c9a96e] mb-1">{stat.value}</div>
                  <div className="text-xs text-[#6b6b6b]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
