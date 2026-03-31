export interface Testimonial {
  id: number
  name: string
  location: string
  role: string
  quote: string
  rating: number
  initials: string
  color: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sofía Martínez',
    location: 'Buenos Aires, AR',
    role: 'Directora Creativa',
    quote: 'TONALEG ha transformado completamente mi cabello. Después de 4 semanas con el Sérum Reparador, noté una diferencia asombrosa en la textura y el brillo.',
    rating: 5,
    initials: 'SM',
    color: '#c9a96e',
  },
  {
    id: 2,
    name: 'Isabella Romano',
    location: 'Milano, IT',
    role: 'Modelo',
    quote: 'Como modelo, mi cabello pasa por mucho. TONALEG es la única marca que ha logrado restaurar mi cabello dañado de forma visible y duradera.',
    rating: 5,
    initials: 'IR',
    color: '#e8c4b8',
  },
  {
    id: 3,
    name: 'Valentina Cruz',
    location: 'Ciudad de México, MX',
    role: 'Estilista Profesional',
    quote: 'Recomiendo TONALEG a todos mis clientes. Los ingredientes naturales y la eficacia clínica hacen de esta línea una de las mejores del mercado.',
    rating: 5,
    initials: 'VC',
    color: '#8fad88',
  },
  {
    id: 4,
    name: 'Camille Dubois',
    location: 'París, FR',
    role: 'Periodista de Moda',
    quote: 'He probado las mejores marcas del mundo, y TONALEG rivaliza con cualquier lujo europeo. La calidad es excepcional.',
    rating: 5,
    initials: 'CD',
    color: '#a8c4d4',
  },
  {
    id: 5,
    name: 'Andrea Morales',
    location: 'Bogotá, CO',
    role: 'CEO & Emprendedora',
    quote: 'El Complejo de Aceites es un producto de culto en mi rutina diaria. Mi cabello nunca había lucido tan saludable y luminoso.',
    rating: 5,
    initials: 'AM',
    color: '#d4a8c4',
  },
]
