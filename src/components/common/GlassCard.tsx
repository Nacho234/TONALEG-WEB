import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card rounded-2xl ${className}`}
      whileHover={
        hover
          ? {
              y: -8,
              boxShadow: '0 20px 60px rgba(201, 169, 110, 0.18)',
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
