export interface Product {
  id: number
  name: string
  tagline: string
  description: string
  price: string
  badge?: string
  gradient: string
  accent: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Sérum Reparador',
    tagline: 'Intensive Hair Repair',
    description: 'Fórmula concentrada con queratina hidrolizada y aceite de argán que restaura la fibra capilar desde la raíz.',
    price: '$89.00',
    badge: 'Bestseller',
    gradient: 'from-amber-50 to-orange-50',
    accent: '#c9a96e',
  },
  {
    id: 2,
    name: 'Complejo de Aceites',
    tagline: 'Nourishing Oil Complex',
    description: 'Blend exclusivo de 7 aceites preciosos que aportan nutrición profunda, brillo y suavidad incomparables.',
    price: '$75.00',
    badge: 'Nuevo',
    gradient: 'from-rose-50 to-pink-50',
    accent: '#e8c4b8',
  },
  {
    id: 3,
    name: 'Tratamiento Cuero Cabelludo',
    tagline: 'Scalp Renewal Treatment',
    description: 'Solución científicamente desarrollada para equilibrar el cuero cabelludo, estimular el crecimiento y eliminar la descamación.',
    price: '$95.00',
    gradient: 'from-emerald-50 to-teal-50',
    accent: '#8fad88',
  },
]
