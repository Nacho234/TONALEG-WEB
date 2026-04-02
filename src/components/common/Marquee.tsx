import { motion } from 'framer-motion'

const items = [
  'TONALEG', '✦', 'LUXURY HAIR', '✦', 'PREMIUM CARE', '✦',
  'CRUELTY FREE', '✦', 'NATURAL INGREDIENTS', '✦', 'DERMATOLOGIST TESTED', '✦',
  'SUSTAINABLY SOURCED', '✦', 'MADE WITH LOVE', '✦',
]

interface MarqueeProps {
  reverse?: boolean
  dark?: boolean
}

export default function Marquee({ reverse = false, dark = false }: MarqueeProps) {
  const repeated = [...items, ...items, ...items]

  return (
    <div
      className={`overflow-hidden py-3 ${dark ? 'bg-[#1a1a1a]' : 'bg-[#c9a96e]/8'}`}
      style={{ borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(201,169,110,0.15)', borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(201,169,110,0.15)' }}
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '33.33%'] : ['0%', '-33.33%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`text-xs font-semibold tracking-[0.25em] uppercase flex-shrink-0 ${
              item === '✦'
                ? 'text-[#c9a96e] text-[10px]'
                : dark
                ? 'text-white/30'
                : 'text-[#1a1a1a]/40'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
