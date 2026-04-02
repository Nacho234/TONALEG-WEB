import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from '@/lib/data/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, qty: number) => void
  clearCart: () => void
  count: number
  total: number
  open: boolean
  setOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)

  function addItem(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setOpen(true)
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.product.id !== id))
  }

  function updateQuantity(id: number, qty: number) {
    if (qty <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  const count = items.reduce((acc, i) => acc + i.quantity, 0)
  const total = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, count, total, open, setOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
