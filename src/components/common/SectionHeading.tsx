import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {label && (
        <span className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 ${light ? 'text-[#c4b5fd]' : 'text-[#a855f7]'}`}>
          {label}
        </span>
      )}
      <h2
        className={`font-serif text-4xl md:text-5xl font-semibold leading-tight mb-4 ${
          light ? 'text-white' : 'text-[#1a1a1a]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} leading-relaxed ${
            light ? 'text-white/70' : 'text-[#6b6b6b]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
