import { useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react'
import { products } from '@/lib/data/products'
import MagneticButton from '@/components/common/MagneticButton'
import { fadeUp } from '@/lib/animations'

// Extended product list for a full carousel feel
const carouselProducts = [
  ...products,
  {
    id: 4,
    name: 'Mascarilla Nutritiva',
    tagline: 'Deep Nourishing Mask',
    description: 'Tratamiento semanal con karité y aceite de macadamia para una nutrición profunda e intensa.',
    price: '$68.00',
    badge: 'Promo',
    gradient: 'from-purple-50 to-violet-50',
    accent: '#b8a8d4',
  },
  {
    id: 5,
    name: 'Bruma Protectora',
    tagline: 'Heat Protection Mist',
    description: 'Escudo termoprotector de 230°C con proteínas de seda que define y protege cada hebra.',
    price: '$55.00',
    gradient: 'from-sky-50 to-blue-50',
    accent: '#a8c4d4',
  },
]

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const CARD_WIDTH = 340
  const GAP = 24

  const goTo = (index: number) => {
    const target = Math.max(0, Math.min(index, carouselProducts.length - 1))
    setCurrent(target)
    animate(x, -(target * (CARD_WIDTH + GAP)), { type: 'spring', stiffness: 200, damping: 28 })
  }

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a855f7] mb-3 block">
              Colección Completa
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a1a1a] leading-tight">
              Cada Producto,<br />Una Experiencia
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-3"
          >
            <MagneticButton
              onClick={() => goTo(current - 1)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                current === 0
                  ? 'border-[#ede9fe] text-[#1a1a1a]/20 cursor-not-allowed'
                  : 'border-[#ddd6fe] text-[#1a1a1a] hover:bg-[#a855f7] hover:text-white hover:border-[#a855f7]'
              }`}
            >
              <ArrowLeft size={18} />
            </MagneticButton>
            <MagneticButton
              onClick={() => goTo(current + 1)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                current === carouselProducts.length - 1
                  ? 'border-[#ede9fe] text-[#1a1a1a]/20 cursor-not-allowed'
                  : 'border-[#ddd6fe] text-[#1a1a1a] hover:bg-[#a855f7] hover:text-white hover:border-[#a855f7]'
              }`}
            >
              <ArrowRight size={18} />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Carousel */}
        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -((carouselProducts.length - 1) * (CARD_WIDTH + GAP)), right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              const offset = info.offset.x
              if (offset < -60) goTo(current + 1)
              else if (offset > 60) goTo(current - 1)
              else goTo(current)
            }}
          >
            {carouselProducts.map((product, i) => (
              <motion.div
                key={product.id}
                style={{ minWidth: CARD_WIDTH }}
                animate={{ scale: i === current ? 1 : 0.95, opacity: i === current ? 1 : 0.6 }}
                transition={{ duration: 0.4 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="rounded-3xl overflow-hidden bg-white border border-[#ede9fe] shadow-[0_4px_30px_rgba(0,0,0,0.04)] select-none">
                  {/* Image area */}
                  <div className={`bg-gradient-to-br ${product.gradient} h-56 flex items-center justify-center relative overflow-hidden`}>
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#a855f7] text-white">
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3 + i * 0.4, repeat: Infinity }}
                      className="w-16 h-32 relative"
                    >
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-24 rounded-2xl shadow-xl"
                        style={{ background: `linear-gradient(160deg, ${product.accent}cc, ${product.accent})` }}
                      />
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/20 rounded-lg flex flex-col items-center justify-center gap-1">
                        <div className="text-white text-[5px] font-bold tracking-widest">TONALEG</div>
                      </div>
                    </motion.div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-20" style={{ background: product.accent }} />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-xs font-medium text-[#a855f7] tracking-widest uppercase mb-1">{product.tagline}</div>
                    <h3 className="font-serif text-xl font-semibold text-[#1a1a1a] mb-2">{product.name}</h3>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed mb-5 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl font-bold text-[#1a1a1a]">{product.price}</span>
                      <button className="flex items-center gap-2 btn-gold px-4 py-2.5 rounded-full text-sm font-semibold">
                        <ShoppingBag size={14} /> Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {carouselProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 6,
                background: i === current ? '#a855f7' : '#ddd6fe',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
