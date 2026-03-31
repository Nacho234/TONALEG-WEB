export interface Ingredient {
  name: string
  origin: string
  benefit: string
  emoji: string
}

export const ingredients: Ingredient[] = [
  { name: 'Aceite de Argán', origin: 'Marruecos', benefit: 'Hidratación profunda', emoji: '🌿' },
  { name: 'Queratina Hidrolizada', origin: 'Laboratorio Suizo', benefit: 'Reparación estructural', emoji: '✨' },
  { name: 'Biotina', origin: 'Natural', benefit: 'Estimula el crecimiento', emoji: '🌱' },
  { name: 'Aceite de Rosa Mosqueta', origin: 'Chile', benefit: 'Regeneración celular', emoji: '🌹' },
  { name: 'Proteína de Seda', origin: 'Japón', benefit: 'Brillo y suavidad', emoji: '💫' },
]
