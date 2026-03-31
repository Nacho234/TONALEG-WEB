import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { testimonials } from '@/lib/data/testimonials'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (dir: 'left' | 'right') => {
    const el = carouselRef.current
    if (!el) return
    const cardWidth = el.firstElementChild?.clientWidth ?? 320
    const scrollAmount = cardWidth + 24
    if (dir === 'left') {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      setActiveIndex(Math.max(0, activeIndex - 1))
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setActiveIndex(Math.min(testimonials.length - 1, activeIndex + 1))
    }
  }

  return (
    <section id="resenas" className="py-28 bg-gradient-to-br from-[#fafaf9] via-white to-[#fafaf9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a96e] mb-4 block">
              Testimonios
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a1a1a] leading-tight">
              Amado por<br />Miles
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-3"
          >
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-[#e8d5b5] flex items-center justify-center text-[#1a1a1a] hover:bg-[#c9a96e] hover:text-white hover:border-[#c9a96e] transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-[#e8d5b5] flex items-center justify-center text-[#1a1a1a] hover:bg-[#c9a96e] hover:text-white hover:border-[#c9a96e] transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                className="flex-none w-80 md:w-96 snap-start"
              >
                <div className="glass-card rounded-3xl p-8 h-full hover:shadow-[0_20px_60px_rgba(201,169,110,0.12)] hover:border-[#e8d5b5] transition-all duration-300 border border-white/80">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-[#c9a96e] text-base">★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-[#1a1a1a] text-base leading-relaxed mb-8 font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[#f0ece8]">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)` }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1a1a1a] text-sm">{t.name}</div>
                      <div className="text-xs text-[#6b6b6b]">{t.role} · {t.location}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? '24px' : '6px',
                background: i === activeIndex ? '#c9a96e' : '#e8d5b5',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
