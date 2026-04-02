import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'productos', label: 'Productos' },
  { id: 'ingredientes', label: 'Ingredientes' },
  { id: 'ritual', label: 'Ritual' },
  { id: 'resenas', label: 'Reseñas' },
  { id: 'contacto', label: 'Contacto' },
]

export default function SectionIndicator() {
  const [active, setActive] = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActive(s.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 10 }}
      transition={{ duration: 0.3 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 pointer-events-none"
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center gap-2 justify-end pointer-events-auto"
          title={s.label}
        >
          <motion.span
            animate={{ opacity: active === s.id ? 1 : 0, x: active === s.id ? 0 : 4 }}
            className="text-[10px] font-semibold tracking-widest uppercase text-[#c9a96e] hidden group-hover:block"
          >
            {s.label}
          </motion.span>
          <motion.div
            animate={{
              width: active === s.id ? 20 : 6,
              backgroundColor: active === s.id ? '#c9a96e' : '#d4c5b0',
            }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full"
          />
        </a>
      ))}
    </motion.div>
  )
}
