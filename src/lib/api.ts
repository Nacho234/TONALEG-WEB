const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface ApiProduct {
  id: number
  nombre: string
  tagline: string
  descripcion: string
  precio: string | number
  badge?: string | null
  linea: string
  tipo_cabello: string[]
  destacado: boolean
}

export interface Product {
  id: number
  name: string
  tagline: string
  description: string
  price: number
  badge?: string
  gradient: string
  accent: string
  featured: boolean
  line: string
  hairType: string[]
}

const LINE_STYLES: Record<string, { gradient: string; accent: string }> = {
  'Anti Caída':       { gradient: 'from-green-50 to-lime-50',      accent: '#4d7c0f' },
  'Ácido':            { gradient: 'from-orange-50 to-amber-50',     accent: '#b87333' },
  'Almendras':        { gradient: 'from-amber-50 to-orange-50',     accent: '#c9a96e' },
  'Argán':            { gradient: 'from-orange-50 to-amber-50',     accent: '#d97706' },
  'Bacha':            { gradient: 'from-sky-50 to-blue-50',         accent: '#0ea5e9' },
  'Biotina':          { gradient: 'from-green-50 to-emerald-50',    accent: '#10b981' },
  'Blonde':           { gradient: 'from-yellow-50 to-amber-50',     accent: '#f59e0b' },
  'BTX':              { gradient: 'from-violet-50 to-purple-50',    accent: '#a78bfa' },
  'Coco':             { gradient: 'from-amber-50 to-orange-50',     accent: '#d4b896' },
  'Color':            { gradient: 'from-violet-50 to-purple-50',    accent: '#7c3aed' },
  'Curly':            { gradient: 'from-pink-50 to-rose-50',        accent: '#ec4899' },
  'Eslom Keratina':   { gradient: 'from-teal-50 to-cyan-50',        accent: '#2dd4bf' },
  'Intensive Repair': { gradient: 'from-indigo-50 to-blue-50',      accent: '#4f46e5' },
  'Oxidantes':        { gradient: 'from-slate-50 to-blue-50',       accent: '#94a3b8' },
  'Scotland':         { gradient: 'from-stone-50 to-slate-100',     accent: '#475569' },
  'Semi Di Lino':     { gradient: 'from-yellow-50 to-amber-50',     accent: '#c4a882' },
  'Shampoo y Enjuague': { gradient: 'from-teal-50 to-cyan-50',      accent: '#0d9488' },
  'Silver':           { gradient: 'from-slate-50 to-gray-100',      accent: '#64748b' },
  'Terminación':      { gradient: 'from-amber-50 to-yellow-50',     accent: '#b45309' },
  'Tinturas':         { gradient: 'from-amber-50 to-orange-50',     accent: '#c4913a' },
}

const DEFAULT_STYLE = { gradient: 'from-stone-50 to-gray-100', accent: '#6b7280' }

function mapProduct(p: ApiProduct): Product {
  const style = LINE_STYLES[p.linea] ?? DEFAULT_STYLE
  return {
    id: p.id,
    name: p.nombre,
    tagline: p.tagline,
    description: p.descripcion,
    price: Number(p.precio),
    badge: p.badge ?? undefined,
    gradient: style.gradient,
    accent: style.accent,
    featured: p.destacado,
    line: p.linea,
    hairType: p.tipo_cabello,
  }
}

export async function fetchProducts(params?: { linea?: string; search?: string }): Promise<Product[]> {
  const url = new URL(`${API_URL}/api/productos`)
  if (params?.linea) url.searchParams.set('linea', params.linea)
  if (params?.search) url.searchParams.set('search', params.search)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Error al cargar productos')
  const data: ApiProduct[] = await res.json()
  return data.map(mapProduct)
}
