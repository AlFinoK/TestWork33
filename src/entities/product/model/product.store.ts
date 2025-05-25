import { create } from 'zustand'

import { productApi } from '@/shared/api'
import { Product } from '@/shared/lib'

interface ProductState {
  products: Product[]
  page: number
  limit: number
  total: number
  loading: boolean
  error: string | null
  fetchProducts: (page?: number) => Promise<void>
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  page: 1,
  limit: 10,
  total: 0,
  loading: false,
  error: null,

  fetchProducts: async (page = 1) => {
    set({ loading: true, error: null })
    try {
      const limit = get().limit
      const data = await productApi.getProducts(page, limit)
      console.log(data)

      set({
        products: page === 1 ? data.products : [...get().products, ...data.products],
        total: data.total,
        page,
        loading: false,
      })
    } catch (e) {
      set({ error: (e as Error).message, loading: false })
    }
  },
}))
