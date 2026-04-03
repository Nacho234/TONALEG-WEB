import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/CartContext'

const navLinks = [
  { label: 'Productos', href: '/productos', external: false },
  { label: 'Ingredientes', href: '#ingredientes', external: true },
  { label: 'Ritual', href: '#ritual', external: true },
  { label: 'Reseñas', href: '#resenas', external: true },
  { label: 'Contacto', href: '#contacto', external: true },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const location = useLocation()
  const { count, setOpen: openCart } = useCart()

  // Scroll-driven values
  const scrollY = useMotionValue(0)
  const scrollProgress = useSpring(
    useTransform(scrollY, [0, 120], [0, 1]),
    { stiffness: 120, damping: 20 }
  )

  const navBg = useTransform(scrollProgress, [0, 1], [
    'rgba(255,255,255,0)',
    'rgba(255,255,255,0.82)',
  ])
  const navBlur = useTransform(scrollProgress, [0, 1], [0, 20])
  const navBorderOpacity = useTransform(scrollProgress, [0, 1], [0, 0.15])
  const navShadow = useTransform(scrollProgress, [0, 1], [
    '0 0px 0px rgba(168,85,247,0)',
    '0 4px 32px rgba(168,85,247,0.12)',
  ])
  const navPy = useTransform(scrollProgress, [0, 1], [20, 12])

  // Gold line under logo that grows on scroll
  const logoLineWidth = useTransform(scrollProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollY])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          backgroundColor: navBg,
          backdropFilter: useTransform(navBlur, (v) => `blur(${v}px) saturate(180%)`),
          WebkitBackdropFilter: useTransform(navBlur, (v) => `blur(${v}px) saturate(180%)`),
          boxShadow: navShadow,
          borderBottom: useTransform(navBorderOpacity, (v) => `1px solid rgba(168,85,247,${v})`),
          paddingTop: navPy,
          paddingBottom: navPy,
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo with animated underline */}
          <Link to="/" className="flex items-center relative group">
            <img src="/logo.png" alt="TONALEG" className="h-9 w-auto object-contain" />
            <motion.div
              style={{ width: logoLineWidth }}
              className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#a855f7] to-transparent"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href
              return link.external ? (
                <a
                  key={link.href}
                  href={location.pathname === '/' ? link.href : `/${link.href}`}
                  onMouseEnter={() => setActiveLink(link.href)}
                  onMouseLeave={() => setActiveLink(null)}
                  className="relative text-sm font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors duration-300 tracking-wide py-1"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 h-px bg-[#a855f7] rounded-full"
                    animate={{ width: activeLink === link.href ? '100%' : '0%' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onMouseEnter={() => setActiveLink(link.href)}
                  onMouseLeave={() => setActiveLink(null)}
                  className="relative text-sm font-medium tracking-wide py-1 transition-colors duration-300"
                  style={{ color: isActive ? '#1a1a1a' : '#6b6b6b' }}
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 h-px bg-[#a855f7] rounded-full"
                    animate={{ width: isActive || activeLink === link.href ? '100%' : '0%' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </Link>
              )
            })}
          </div>

          {/* CTA + Cart */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart button */}
            <motion.button
              onClick={() => openCart(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-full border border-[#a855f7]/30 flex items-center justify-center text-[#6b6b6b] hover:text-[#a855f7] hover:border-[#a855f7] transition-all duration-300"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#a855f7] text-white text-[9px] font-bold flex items-center justify-center"
                >
                  {count > 9 ? '9+' : count}
                </motion.span>
              )}
            </motion.button>

            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 25px rgba(201,169,110,0.45)' }}
              whileTap={{ scale: 0.96 }}
              className="btn-gold px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide"
            >
              Comprar Ahora
            </motion.a>
          </div>

          {/* Mobile: cart + menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => openCart(true)}
              className="relative p-2 text-[#1a1a1a] hover:text-[#a855f7] transition-colors"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#a855f7] text-white text-[8px] font-bold flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#1a1a1a] hover:text-[#a855f7] transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(24px)' }}
          >
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-20 right-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)' }} />
              <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,196,184,0.1) 0%, transparent 70%)' }} />
            </div>

            <img src="/logo.png" alt="TONALEG" className="h-10 w-auto mb-4 relative" />

            {navLinks.map((link, i) =>
              link.external ? (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-2xl font-semibold text-[#1a1a1a] hover:text-[#a855f7] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-px bg-[#a855f7] transition-all duration-300 rounded-full" />
                </motion.a>
              ) : (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-2xl font-semibold text-[#1a1a1a] hover:text-[#a855f7] transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-px bg-[#a855f7] transition-all duration-300 rounded-full" />
                  </Link>
                </motion.div>
              )
            )}

            <motion.a
              href="#contacto"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.07 }}
              onClick={() => setMenuOpen(false)}
              className="btn-gold px-8 py-3 rounded-full text-base font-semibold mt-4"
            >
              Comprar Ahora
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
