import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const words = ['Tu', 'Cabello', 'Merece', 'Lujo']

// Floating particles
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}))

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const productY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fff8f5 40%, #ffffff 70%, #fff3ee 100%)' }}
    >
      {/* Parallax background blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">

        {/* Base mesh gradient */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,160,110,0.13) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(255,130,100,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 85%, rgba(255,180,150,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 70% 60% at 10% 20%, rgba(255,220,200,0.12) 0%, transparent 60%)
          `
        }} />

        {/* Animated blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 right-0 w-[550px] h-[550px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,140,90,0.12) 0%, rgba(255,180,140,0.06) 40%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], x: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,120,80,0.10) 0%, rgba(255,160,120,0.05) 40%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], y: [0, -20, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,200,170,0.14) 0%, transparent 65%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,150,100,0.12) 0%, transparent 65%)' }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.2,
              background: p.id % 2 === 0 ? '#ff8c5a' : '#c9a96e',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        {/* Text Content with parallax */}
        <motion.div style={{ y: textY }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-left z-10"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#f0ece8] rounded-full px-4 py-2 mb-8">
              <Sparkles size={14} className="text-[#c9a96e]" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#c9a96e]">
                Cosmética Capilar Premium
              </span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                variants={staggerContainer}
                className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-[#1a1a1a]"
              >
                {words.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block mr-4">
                    <motion.span
                      variants={{
                        hidden: { y: '110%' },
                        visible: {
                          y: 0,
                          transition: { duration: 0.9, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] },
                        },
                      }}
                      className="inline-block"
                    >
                      {i === 2 ? (
                        <span className="text-gradient-gold">{word}</span>
                      ) : (
                        word
                      )}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
            </div>

            <motion.p variants={fadeUp} className="text-xl text-[#6b6b6b] leading-relaxed mb-10 max-w-lg mt-6">
              Formulaciones científicas de alta gama, inspiradas en la naturaleza.
              Porque cada hebra merece el mejor cuidado del mundo.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.a
                href="#productos"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold"
              >
                Descubrir la Colección
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#historia"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold border border-[#1a1a1a]/20 text-[#1a1a1a] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300 bg-transparent"
              >
                Nuestra Historia
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-0 mt-12 pt-8 border-t border-[#f0ece8]">
              {[
                { value: '50K+', label: 'Clientas Satisfechas' },
                { value: '15+', label: 'Países' },
                { value: '4.9★', label: 'Valoración Media' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="text-center px-6 first:pl-0">
                    <div className="text-2xl font-bold font-serif text-[#1a1a1a]">{stat.value}</div>
                    <div className="text-xs text-[#6b6b6b] mt-1 whitespace-nowrap">{stat.label}</div>
                  </div>
                  {i < 2 && <div className="w-px h-10 bg-[#e8d5b5] flex-shrink-0" />}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Visual Side with reverse parallax */}
        <motion.div
          style={{ y: productY }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex items-center justify-center z-10"
        >
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0ece8] via-[#fafaf9] to-[#e8d5b5] rounded-[40px] transform rotate-3" />
            <div className="relative bg-gradient-to-br from-white to-[#fafaf9] rounded-[36px] p-10 shadow-2xl border border-white/80">
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#c9a96e]/20" />
              </div>

              <div className="flex flex-col items-center py-8 gap-6">
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-24 h-40 relative"
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-32 bg-gradient-to-b from-[#c9a96e] to-[#a8854d] rounded-2xl shadow-lg" />
                    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-10 h-8 bg-gradient-to-b from-[#e8d5b5] to-[#c9a96e] rounded-t-lg" />
                    <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-8 h-6 bg-[#1a1a1a] rounded-t-full" />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-14 bg-white/25 rounded-lg flex flex-col items-center justify-center gap-1">
                      <div className="text-white text-[8px] font-bold tracking-widest">TONALEG</div>
                      <div className="w-8 h-px bg-white/60" />
                      <div className="text-white/80 text-[6px] tracking-wider">SÉRUM</div>
                    </div>

                    {/* Sparkle effects on bottle */}
                    {[
                      { top: '-10px', right: '-12px' },
                      { top: '20px', left: '-14px' },
                      { bottom: '40px', right: '-16px' },
                    ].map((pos, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
                        className="absolute text-[#c9a96e] text-sm"
                        style={pos}
                      >
                        ✦
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-[#1a1a1a] mb-1">Sérum Reparador</h3>
                  <p className="text-sm text-[#6b6b6b]">Intensive Hair Repair</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {['Argán', 'Queratina', 'Biotina'].map((ing) => (
                    <span key={ing} className="text-xs px-3 py-1.5 bg-[#f0ece8] text-[#a8854d] rounded-full font-medium border border-[#e8d5b5]">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -right-6 top-1/3 glass-card rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="text-xs text-[#6b6b6b] mb-0.5">Resultado en</div>
              <div className="font-bold text-[#1a1a1a] text-sm">4 semanas</div>
              <div className="flex gap-0.5 mt-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-[#c9a96e] text-xs">★</span>)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute -left-6 bottom-1/4 glass-card rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1a1a1a]">100% Natural</div>
                  <div className="text-[10px] text-[#6b6b6b]">Cruelty Free</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#6b6b6b] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-[#c9a96e] to-transparent"
        />
      </motion.div>
    </section>
  )
}
