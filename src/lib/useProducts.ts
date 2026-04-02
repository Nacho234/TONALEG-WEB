import { useState, useEffect } from 'react'
import { fetchProducts, type Product } from './api'

interface UseProductsResult {
  products: Product[]
  loading: boolean
  error: string | null
}

export function useProducts(params?: { linea?: string; search?: string }): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchProducts(params)
      .then((data) => { if (!cancelled) { setProducts(data); setLoading(false) } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false) } })
    return () => { cancelled = true }
  }, [params?.linea, params?.search])

  return { products, loading, error }
}
