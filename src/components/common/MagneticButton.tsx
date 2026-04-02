import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      className="inline-block"
    >
      <Tag href={href} onClick={onClick} className={className}>
        {children}
      </Tag>
    </motion.div>
  )
}
