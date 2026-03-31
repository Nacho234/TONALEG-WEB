import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionHeading from '@/components/common/SectionHeading'
import { products } from '@/lib/data/products'

export default function Products() {
  return (
    <section id="productos" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="La Colección"
          title="Rituales de Lujo"
          subtitle="Cada producto ha sido formulado con los ingredientes más selectos del mundo para transformar la salud y belleza de tu cabello."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#f0ece8] shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(201,169,110,0.15)] hover:border-[#e8d5b5] transition-all duration-400"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#c9a96e] text-white tracking-wide shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product visual */}
              <div className={`bg-gradient-to-br ${product.gradient} h-64 flex items-center justify-center relative overflow-hidden`}>
                {/* Abstract product representation */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + product.id * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  {/* Bottle */}
                  <div className="relative w-20 h-36">
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-28 rounded-2xl shadow-xl"
                      style={{ background: `linear-gradient(160deg, ${product.accent}cc, ${product.accent})` }}
                    />
                    <div
                      className="absolute bottom-28 left-1/2 -translate-x-1/2 w-8 h-6 rounded-t-lg"
                      style={{ background: product.accent }}
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 rounded-xl flex flex-col items-center justify-center gap-1">
                      <div className="text-white text-[6px] font-bold tracking-widest">TONALEG</div>
                      <div className="w-6 h-px bg-white/60" />
                    </div>
                  </div>
                </motion.div>

                {/* Decorative circles */}
                <div
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20"
                  style={{ background: product.accent }}
                />
                <div
                  className="absolute -top-4 -left-4 w-20 h-20 rounded-full opacity-10"
                  style={{ background: product.accent }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-1">
                  <span className="text-xs font-medium text-[#c9a96e] tracking-widest uppercase">
                    {product.tagline}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1a1a1a] mb-3">
                  {product.name}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-[#1a1a1a]">
                    {product.price}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 btn-gold px-5 py-2.5 rounded-full text-sm font-semibold"
                  >
                    <ShoppingBag size={15} />
                    Añadir
                  </motion.button>
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight size={16} className="text-[#c9a96e]" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#c9a96e] hover:gap-4 transition-all duration-300"
          >
            Ver toda la colección
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
