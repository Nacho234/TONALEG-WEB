import { motion } from 'framer-motion'
import { fadeLeft, staggerContainer, fadeUp } from '@/lib/animations'
import { ingredients } from '@/lib/data/ingredients'

export default function Ingredients() {
  return (
    <section id="ingredientes" className="py-28" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fdf4ff 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden p-10 min-h-[480px] flex flex-col justify-between border border-[#a855f7]/20 shadow-[0_20px_60px_rgba(168,85,247,0.15)]" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, #ffffff 50%, rgba(236,72,153,0.06) 100%)' }}>
              {/* Decorative large text */}
              <div className="absolute top-6 right-6 font-serif text-[120px] font-bold leading-none select-none" style={{ color: 'rgba(168,85,247,0.06)' }}>
                N
              </div>

              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a855f7] mb-4 block">
                  Origen & Pureza
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                  De la Naturaleza<br />a Tu Cabello
                </h3>
                <p className="text-[#6b6b6b] text-base leading-relaxed">
                  Seleccionamos ingredientes de los ecosistemas más ricos del planeta,
                  procesados con tecnología de punta para preservar su potencia natural.
                </p>
              </div>

              {/* Map decoration */}
              <div className="flex gap-4 mt-8">
                {['🇲🇦', '🇨🇭', '🇨🇱', '🇯🇵'].map((flag, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-lg border border-[#a855f7]/20"
                  >
                    {flag}
                  </motion.div>
                ))}
                <div className="flex items-center">
                  <span className="text-xs text-[#6b6b6b] font-medium">+12 países</span>
                </div>
              </div>
            </div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-5 -right-5 rounded-2xl p-5 shadow-xl border border-[#a855f7]/20 bg-white"
            >
              <div className="text-3xl font-bold font-serif text-[#7c3aed]">97%</div>
              <div className="text-xs text-[#6b6b6b] mt-1">Ingredientes<br />de origen natural</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a855f7] mb-4 block">
                Ingredientes Estrella
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-4 leading-tight">
                Lo Mejor que<br />Ofrece la Tierra
              </h2>
              <p className="text-lg text-[#6b6b6b] leading-relaxed">
                Cada ingrediente ha sido elegido por su eficacia comprobada y su
                pureza excepcional. Nunca comprometemos la calidad.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {ingredients.map((ing, i) => (
                <motion.div
                  key={ing.name}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, delay: i * 0.1 },
                    },
                  }}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-white border border-[#a855f7]/15 hover:border-[#a855f7]/40 hover:shadow-md hover:shadow-purple-100 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {ing.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#1a1a1a] text-sm mb-0.5">{ing.name}</div>
                    <div className="text-xs text-[#a855f7] font-medium">{ing.benefit}</div>
                  </div>
                  <div className="text-xs text-[#6b6b6b] text-right">
                    <div className="font-medium">Origen</div>
                    <div>{ing.origin}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
