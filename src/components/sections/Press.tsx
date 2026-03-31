import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'

const publications = [
  { name: 'VOGUE', style: 'font-serif text-2xl font-bold tracking-widest' },
  { name: 'ALLURE', style: 'font-sans text-xl font-bold tracking-[0.15em]' },
  { name: 'ELLE', style: 'font-serif text-3xl font-bold italic' },
  { name: "HARPER'S BAZAAR", style: 'font-sans text-sm font-bold tracking-[0.2em]' },
  { name: 'GLAMOUR', style: 'font-serif text-2xl font-bold tracking-wide' },
]

export default function Press() {
  return (
    <section className="py-16 border-y border-[#f0ece8] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-[#6b6b6b] mb-10"
        >
          Visto en
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16"
        >
          {publications.map((pub) => (
            <motion.div
              key={pub.name}
              variants={fadeUp}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="opacity-30 hover:opacity-80 transition-all duration-300 cursor-default text-[#1a1a1a]"
            >
              <span className={pub.style}>{pub.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
