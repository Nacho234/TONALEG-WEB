import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }
    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      observer.disconnect()
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#c9a96e]"
        animate={{
          x: pos.x - (hovered ? 20 : 16),
          y: pos.y - (hovered ? 20 : 16),
          width: hovered ? 40 : 32,
          height: hovered ? 40 : 32,
          opacity: visible ? (hovered ? 0.6 : 0.4) : 0,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#c9a96e]"
        animate={{
          x: pos.x - (hovered ? 3 : 4),
          y: pos.y - (hovered ? 3 : 4),
          width: hovered ? 6 : 8,
          height: hovered ? 6 : 8,
          opacity: visible ? 1 : 0,
          scale: clicked ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30, mass: 0.2 }}
      />
    </>
  )
}
