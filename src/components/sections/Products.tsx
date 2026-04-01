import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionHeading from '@/components/common/SectionHeading'
import { supabase, type Product } from '@/lib/supabase'

const LINE_STYLES: Record<string, { gradient: string; accent: string }> = {
  'LINEA ARGAN':             { gradient: 'from-amber-50 to-orange-50',   accent: '#c9a96e' },
  'LINEA BIOTINA':           { gradient: 'from-green-50 to-emerald-50',  accent: '#7ab87a' },
  'LINEA ORTIGA':            { gradient: 'from-lime-50 to-green-50',     accent: '#8fad88' },
  'LINEA SILVER':            { gradient: 'from-slate-50 to-gray-100',    accent: '#9ca3af' },
  'LINEA BTX':               { gradient: 'from-violet-50 to-purple-50',  accent: '#a78bfa' },
  'LINEA CURLY':             { gradient: 'from-rose-50 to-pink-50',      accent: '#f472b6' },
  'LINEA BLONDE':            { gradient: 'from-yellow-50 to-amber-50',   accent: '#fbbf24' },
  'LINEA INTENSIVE REPAIR':  { gradient: 'from-red-50 to-rose-50',       accent: '#f87171' },
  'LINEA ESLOM KERATINA':    { gradient: 'from-teal-50 to-cyan-50',      accent: '#2dd4bf' },
  'LINEA COBRE':             { gradient: 'from-orange-50 to-amber-50',   accent: '#fb923c' },
  'LINEA COLOR':             { gradient: 'from-pink-50 to-fuchsia-50',   accent: '#e879f9' },
  'SCOTLAND':                { gradient: 'from-stone-50 to-zinc-100',    accent: '#78716c' },
  'DEFAULT':                 { gradient: 'from-amber-50 to-orange-50',   accent: '#c9a96e' },
}

function getLineStyle(line: string) {
  return LINE_STYLES[line] ?? LINE_STYLES['DEFAULT']
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('id')
      .limit(6)
      .then(({ data }) => {
        if (data) setProducts(data)
        setLoading(false)
      })
  }, [])

  return (
    <section id="productos" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="La Colección"
          title="Rituales de Lujo"
          subtitle="Cada producto ha sido formulado con los ingredientes más selectos del mundo para transformar la salud y belleza de tu cabello."
        />

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl overflow-hidden border border-[#f0ece8] animate-pulse">
                <div className="h-64 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-5 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {products.map((product) => {
              const style = getLineStyle(product.line)
              return (
                <motion.div
                  key={product.id}
                  variants={fadeUp}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-[#f0ece8] shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(201,169,110,0.15)] hover:border-[#e8d5b5] transition-all duration-400"
                >
                  {/* Product visual */}
                  <div className={`bg-gradient-to-br ${style.gradient} h-64 flex items-center justify-center relative overflow-hidden`}>
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="h-full w-full object-contain p-6" />
                    ) : (
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative"
                      >
                        <div className="relative w-20 h-36">
                          <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-28 rounded-2xl shadow-xl"
                            style={{ background: `linear-gradient(160deg, ${style.accent}cc, ${style.accent})` }}
                          />
                          <div
                            className="absolute bottom-28 left-1/2 -translate-x-1/2 w-8 h-6 rounded-t-lg"
                            style={{ background: style.accent }}
                          />
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 rounded-xl flex flex-col items-center justify-center gap-1">
                            <div className="text-white text-[6px] font-bold tracking-widest">TONALEG</div>
                            <div className="w-6 h-px bg-white/60" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: style.accent }} />
                    <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full opacity-10" style={{ background: style.accent }} />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-1">
                      <span className="text-xs font-medium text-[#c9a96e] tracking-widest uppercase">
                        {product.line.replace('LINEA ', '')}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#1a1a1a] mb-3">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">
                        {product.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-serif text-2xl font-bold text-[#1a1a1a]">
                        ${product.price.toLocaleString('es-AR')}
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

                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight size={16} className="text-[#c9a96e]" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="#catalogo"
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
