import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Product {
  id: number
  code: string
  name: string
  price: number
  line: string
  description: string | null
  image_url: string | null
  active: boolean
  stock: number
  created_at: string
}
