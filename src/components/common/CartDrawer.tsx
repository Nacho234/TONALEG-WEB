import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/CartContext'

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQuantity, total, clearCart } = useCart()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/25 z-[200]"
            style={{ cursor: 'auto' }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[201] flex flex-col shadow-2xl"
            style={{ cursor: 'auto' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0ece8]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#c9a96e]" />
                <span className="font-serif text-lg font-semibold text-[#1a1a1a]">
                  Tu Carrito
                </span>
                {items.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#c9a96e] text-white text-[10px] font-bold flex items-center justify-center">
                    {items.reduce((a, i) => a + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f0ece8] flex items-center justify-center text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#f0ece8] flex items-center justify-center">
                    <ShoppingBag size={24} className="text-[#c9a96e]" />
                  </div>
                  <p className="font-serif text-lg text-[#1a1a1a]">Tu carrito está vacío</p>
                  <p className="text-sm text-[#6b6b6b]">Agregá productos para comenzar.</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="btn-gold px-6 py-2.5 rounded-full text-sm font-semibold mt-2"
                  >
                    Ver productos
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-4 py-4 border-b border-[#f0ece8] last:border-0">
                        {/* Product thumbnail */}
                        <div
                          className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${item.product.accent}20, ${item.product.accent}40)`,
                          }}
                        >
                          <div
                            className="w-6 h-10 rounded-lg shadow-md"
                            style={{
                              background: `linear-gradient(160deg, ${item.product.accent}cc, ${item.product.accent})`,
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#c9a96e] mb-0.5">
                                {item.product.line}
                              </p>
                              <p className="text-sm font-semibold text-[#1a1a1a] leading-snug">
                                {item.product.name}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-[#6b6b6b]/40 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-2 border border-[#e8d5b5] rounded-full px-1 py-0.5">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full hover:bg-[#f0ece8] flex items-center justify-center text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-semibold text-[#1a1a1a] w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full hover:bg-[#f0ece8] flex items-center justify-center text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="font-serif text-base font-bold text-[#1a1a1a]">
                              ${(item.product.price * item.quantity).toLocaleString('es-AR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#f0ece8] bg-[#fafaf9]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#6b6b6b]">Subtotal</span>
                  <span className="font-serif text-xl font-bold text-[#1a1a1a]">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>
                <p className="text-xs text-[#6b6b6b]/60 mb-5">Envío calculado al finalizar la compra</p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-gold py-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
                >
                  Finalizar compra
                  <ArrowRight size={16} />
                </motion.button>

                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-xs text-[#6b6b6b]/50 hover:text-[#6b6b6b] transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
