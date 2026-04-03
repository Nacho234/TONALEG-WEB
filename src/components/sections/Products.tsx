import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { staggerContainer, fadeUp } from '@/lib/animations'
import SectionHeading from '@/components/common/SectionHeading'

const categories = [
  { label: 'Shampoo',        cat: 'shampoo',       emoji: '🧴', bg: 'from-sky-50 to-blue-100',       accent: '#0ea5e9' },
  { label: 'Acondicionador', cat: 'acondicionador', emoji: '💧', bg: 'from-teal-50 to-emerald-100',   accent: '#10b981' },
  { label: 'Ampollas',       cat: 'ampollas',       emoji: '💊', bg: 'from-violet-50 to-purple-100',  accent: '#8b5cf6' },
  { label: 'Sin Enjuague',   cat: 'sin-enjuague',   emoji: '✨', bg: 'from-yellow-50 to-amber-100',   accent: '#f59e0b' },
  { label: 'Máscaras',       cat: 'mascaras',       emoji: '🫙', bg: 'from-rose-50 to-pink-100',      accent: '#f43f5e' },
  { label: 'Promos',         cat: 'promos',         emoji: '🎁', bg: 'from-orange-50 to-red-100',     accent: '#ef4444' },
  { label: 'Color',          cat: 'color',          emoji: '🎨', bg: 'from-amber-50 to-orange-100',   accent: '#c4913a' },
  { label: 'Terminación',    cat: 'terminacion',    emoji: '💫', bg: 'from-stone-50 to-slate-100',    accent: '#b45309' },
  { label: 'Profesionales',  cat: 'profesionales',  emoji: '🏆', bg: 'from-slate-50 to-gray-100',     accent: '#475569' },
  { label: 'Barbería',       cat: 'barberia',       emoji: '💈', bg: 'from-zinc-50 to-neutral-100',   accent: '#3f3f46' },
]

export default function Products() {
  return (
    <section id="productos" className="py-28" style={{ background: 'linear-gradient(180deg, #faf5ff 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="La Colección"
          title="Explorá por categoría"
          subtitle="Encontrá el producto ideal para cada necesidad. Seleccioná una categoría y descubrí toda la línea."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.cat} variants={fadeUp}>
              <Link
                to={`/productos?cat=${cat.cat}`}
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-[#a855f7]/15 bg-gradient-to-br hover:shadow-[0_8px_30px_rgba(168,85,247,0.2)] hover:border-[#a855f7]/40 transition-all duration-300 h-36"
                style={{ background: `linear-gradient(135deg, ${cat.accent}0d, ${cat.accent}1a)` }}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {cat.emoji}
                </span>
                <span className="text-sm font-semibold text-[#1a1a1a] text-center tracking-wide">
                  {cat.label}
                </span>
                <ArrowRight
                  size={14}
                  className="text-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
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
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#a855f7] hover:gap-4 transition-all duration-300"
          >
            Ver toda la colección
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
