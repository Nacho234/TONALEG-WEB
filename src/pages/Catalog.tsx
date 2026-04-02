import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ShoppingBag, ChevronDown, ChevronUp, ArrowLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products, LINES, HAIR_TYPES } from '@/lib/data/products'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useCart } from '@/lib/CartContext'
import Navbar from '@/components/layout/Navbar'

const PRICE_MIN = 0
const PRICE_MAX = 160

// ── Price Slider (single handle, max) ────────────────────────────────────────

function PriceSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number
  max: number
  value: number
  onChange: (v: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const pct = ((value - min) / (max - min)) * 100

  const calcValue = useCallback(
    (clientX: number): number => {
      const track = trackRef.current
      if (!track) return max
      const { left, width } = track.getBoundingClientRect()
      const ratio = Math.min(Math.max((clientX - left) / width, 0), 1)
      return Math.round(min + ratio * (max - min))
    },
    [min, max]
  )

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragging.current = true
  }

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging.current) return
      onChange(calcValue(e.clientX))
    },
    [calcValue, onChange]
  )

  const onPointerUp = useCallback(() => { dragging.current = false }, [])

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [onPointerMove, onPointerUp])

  return (
    <div className="px-1 pt-2 pb-1 select-none">
      <div className="flex justify-between mb-3">
        <span className="text-[10px] text-[#6b6b6b]">${min}</span>
        <span className="text-xs font-semibold text-[#1a1a1a]">Hasta ${value}</span>
      </div>

      <div ref={trackRef} className="relative h-1.5 rounded-full bg-[#e8d5b5] mx-2">
        {/* Filled */}
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#c9a96e] to-[#a8854d]"
          style={{ width: `${pct}%` }}
        />
        {/* Handle */}
        <motion.div
          onPointerDown={onPointerDown}
          whileHover={{ scale: 1.25 }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-[#c9a96e] shadow-md shadow-[#c9a96e]/30 cursor-grab active:cursor-grabbing z-10 touch-none"
          style={{ left: `${pct}%` }}
        />
      </div>

      <div className="flex justify-end mt-3">
        <span className="text-[10px] text-[#6b6b6b]">${max}</span>
      </div>
    </div>
  )
}

// ── Toggle chip ───────────────────────────────────────────────────────────────

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
          : 'bg-white text-[#6b6b6b] border-[#e8d5b5] hover:border-[#c9a96e] hover:text-[#c9a96e]'
      }`}
    >
      {children}
    </button>
  )
}

// ── Collapsible filter group ──────────────────────────────────────────────────

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-[#f0ece8] pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 cursor-pointer"
      >
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1a1a1a]">{title}</span>
        {open ? <ChevronUp size={14} className="text-[#6b6b6b]" /> : <ChevronDown size={14} className="text-[#6b6b6b]" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

type Filters = {
  priceMax: number
  lines: string[]
  hairTypes: string[]
}

const DEFAULT_FILTERS: Filters = {
  priceMax: PRICE_MAX,
  lines: [],
  hairTypes: [],
}

export default function Catalog() {
  const { addItem } = useCart()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  function toggleArr(key: 'lines' | 'hairTypes', value: string) {
    setFilters((prev) => {
      const arr = prev[key]
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] }
    })
  }

  const priceActive = filters.priceMax < PRICE_MAX

  const activeCount = (priceActive ? 1 : 0) + filters.lines.length + filters.hairTypes.length

  function clearAll() { setFilters(DEFAULT_FILTERS) }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    const result = products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.tagline.toLowerCase().includes(q)) return false
      if (p.price > filters.priceMax) return false
      if (filters.lines.length > 0 && !filters.lines.includes(p.line)) return false
      if (filters.hairTypes.length > 0 && !filters.hairTypes.some((t) => p.hairType.includes(t))) return false
      return true
    })
    return [...result].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'name-asc') return a.name.localeCompare(b.name, 'es')
      // default: línea alfabética → id dentro de cada línea
      const lineDiff = a.line.localeCompare(b.line, 'es')
      return lineDiff !== 0 ? lineDiff : a.id - b.id
    })
  }, [filters, search, sort])

  const FiltersPanel = (
    <div>
      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 text-xs text-[#c9a96e] font-semibold mb-5 hover:underline cursor-pointer"
        >
          <X size={12} />
          Limpiar filtros ({activeCount})
        </button>
      )}

      {/* Price slider */}
      <div className="border-b border-[#f0ece8] pb-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1a1a1a]">Precio</span>
          {priceActive && (
            <button
              onClick={() => setFilters((f) => ({ ...f, priceMax: PRICE_MAX }))}
              className="text-[10px] text-[#c9a96e] hover:underline cursor-pointer"
            >
              Restablecer
            </button>
          )}
        </div>
        <PriceSlider
          min={PRICE_MIN}
          max={PRICE_MAX}
          value={filters.priceMax}
          onChange={(v) => setFilters((f) => ({ ...f, priceMax: v }))}
        />
      </div>

      <FilterGroup title="Línea">
        {LINES.map((l) => (
          <Toggle key={l} active={filters.lines.includes(l)} onClick={() => toggleArr('lines', l)}>
            {l}
          </Toggle>
        ))}
      </FilterGroup>

      <FilterGroup title="Tipo de cabello">
        {HAIR_TYPES.map((h) => (
          <Toggle key={h} active={filters.hairTypes.includes(h)} onClick={() => toggleArr('hairTypes', h)}>
            {h}
          </Toggle>
        ))}
      </FilterGroup>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page header */}
      <div className="pt-32 pb-12 px-6 border-b border-[#f0ece8] bg-gradient-to-br from-[#fafaf9] to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#c9a96e] transition-colors duration-200 mb-6 group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Volver al inicio
            </Link>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a96e] block mb-3">
              La Colección Completa
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1a1a1a] leading-tight mb-8">
              Todos los Productos
            </h1>

            {/* Search bar */}
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-10 py-3 rounded-full border border-[#e8d5b5] bg-white text-sm text-[#1a1a1a] placeholder-[#6b6b6b]/50 focus:outline-none focus:border-[#c9a96e] focus:ring-2 focus:ring-[#c9a96e]/15 transition-all"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#f0ece8] flex items-center justify-center text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12">

          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6b6b6b] mb-6">Filtrar por</p>
              {FiltersPanel}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <p className="text-sm text-[#6b6b6b]">
                <span className="font-semibold text-[#1a1a1a]">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'producto' : 'productos'}
              </p>

              <div className="flex items-center gap-3">
                {/* Sort selector */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="text-sm border border-[#e8d5b5] rounded-full px-4 py-2 text-[#1a1a1a] bg-white focus:outline-none focus:border-[#c9a96e] transition-colors cursor-pointer appearance-none pr-8"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  <option value="default">Ordenar: Línea</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="name-asc">Nombre: A → Z</option>
                </select>

                {/* Mobile filters button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium text-[#1a1a1a] border border-[#e8d5b5] rounded-full px-4 py-2 hover:border-[#c9a96e] transition-colors cursor-pointer"
                >
                  <SlidersHorizontal size={15} />
                  Filtros
                  {activeCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#c9a96e] text-white text-[10px] font-bold flex items-center justify-center">
                      {activeCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Active filter tags */}
            <AnimatePresence>
              {activeCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {priceActive && (
                    <span className="inline-flex items-center gap-1.5 bg-[#f0ece8] text-[#1a1a1a] text-xs font-medium px-3 py-1.5 rounded-full">
                      Hasta ${filters.priceMax}
                      <button
                        onClick={() => setFilters((f) => ({ ...f, priceMax: PRICE_MAX }))}
                        className="text-[#6b6b6b] hover:text-[#1a1a1a] cursor-pointer"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  )}
                  {[...filters.lines, ...filters.hairTypes].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 bg-[#f0ece8] text-[#1a1a1a] text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => {
                          if (filters.lines.includes(tag)) toggleArr('lines', tag)
                          else toggleArr('hairTypes', tag)
                        }}
                        className="text-[#6b6b6b] hover:text-[#1a1a1a] cursor-pointer"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-[#6b6b6b]">
                <div className="text-4xl mb-4">🔍</div>
                <p className="font-serif text-xl text-[#1a1a1a] mb-2">Sin resultados</p>
                <p className="text-sm">Probá con otros filtros.</p>
                <button onClick={clearAll} className="mt-6 text-sm text-[#c9a96e] font-semibold hover:underline cursor-pointer">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={fadeUp}
                      layout
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -6, transition: { duration: 0.25 } }}
                      className="group rounded-3xl overflow-hidden bg-white border border-[#f0ece8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(201,169,110,0.13)] hover:border-[#e8d5b5] transition-all duration-300"
                    >
                      {/* Visual */}
                      <div
                        className="h-52 flex items-center justify-center relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${product.accent}18, ${product.accent}30)` }}
                      >
                        {product.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="bg-[#1a1a1a] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                              {product.badge}
                            </span>
                          </div>
                        )}
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="relative"
                        >
                          <div className="relative w-16 h-28">
                            <div
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-xl shadow-lg"
                              style={{
                                background: `linear-gradient(160deg, ${product.accent}cc, ${product.accent})`,
                                height: '5.5rem',
                                width: '3rem',
                              }}
                            />
                            <div
                              className="absolute left-1/2 -translate-x-1/2 w-7 h-5 rounded-t-md"
                              style={{ background: product.accent, bottom: '5.5rem' }}
                            />
                            <div
                              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-0.5"
                              style={{ width: '2.5rem' }}
                            >
                              <div className="text-white text-[5px] font-bold tracking-widest">TONALEG</div>
                              <div className="w-5 h-px bg-white/50" />
                            </div>
                          </div>
                        </motion.div>
                        <div
                          className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-20"
                          style={{ background: product.accent }}
                        />
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#c9a96e] block mb-1">
                          {product.line}
                        </span>
                        <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mb-1.5">{product.name}</h3>
                        <p className="text-xs text-[#6b6b6b] leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.hairType.map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 bg-[#f0ece8] text-[#6b6b6b] rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-xl font-bold text-[#1a1a1a]">
                            ${product.price.toLocaleString('es-AR')}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addItem(product)}
                            className="flex items-center gap-1.5 btn-gold px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
                          >
                            <ShoppingBag size={13} />
                            Añadir
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-lg font-semibold text-[#1a1a1a]">Filtros</span>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-2 text-[#6b6b6b] hover:text-[#1a1a1a] cursor-pointer">
                    <X size={20} />
                  </button>
                </div>
                {FiltersPanel}
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-6 btn-gold py-3 rounded-full text-sm font-semibold cursor-pointer"
                >
                  Ver {filtered.length} productos
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
