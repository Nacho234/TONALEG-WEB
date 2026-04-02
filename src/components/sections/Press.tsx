import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'

const publications = [
  { name: 'VOGUE', style: 'font-serif text-2xl font-bold tracking-widest', quote: '"Una revolución en el cuidado capilar de lujo."' },
  { name: 'ALLURE', style: 'font-sans text-xl font-bold tracking-[0.15em]', quote: '"Los mejores productos capilares del año."' },
  { name: 'ELLE', style: 'font-serif text-3xl font-bold italic', quote: '"Ciencia y naturaleza en perfecta armonía."' },
  { name: "HARPER'S BAZAAR", style: 'font-sans text-sm font-bold tracking-[0.2em]', quote: '"Imprescindible en tu ritual de belleza."' },
  { name: 'GLAMOUR', style: 'font-serif text-2xl font-bold tracking-wide', quote: '"Resultados visibles desde la primera semana."' },
]

export default function Press() {
  return (
    <section className="py-20 border-y border-[#f0ece8] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-[#6b6b6b] mb-12"
        >
          Visto en
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-start justify-center gap-10 md:gap-14"
        >
          {publications.map((pub) => (
            <motion.div
              key={pub.name}
              variants={fadeUp}
              whileHover={{ opacity: 1 }}
              className="opacity-40 hover:opacity-100 transition-all duration-400 cursor-default text-[#1a1a1a] text-center group"
            >
              <span className={pub.style}>{pub.name}</span>
              <p className="text-xs text-[#6b6b6b] mt-2 max-w-[160px] leading-relaxed italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {pub.quote}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
