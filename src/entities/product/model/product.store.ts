import { create } from 'zustand'

import { Product } from '@/shared/lib'
import { productApi } from '@/shared/api'

interface ProductState {
  products: Product[]
  page: number
  limit: number
  total: number
  loading: boolean
  error: string | null

  productDetail: Product | null
  detailLoading: boolean
  detailError: string | null
  fetchProductDetail: (id: number) => Promise<void>

  fetchProducts: (page?: number) => Promise<void>
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  page: 1,
  limit: 10,
  total: 0,
  loading: false,
  error: null,

  productDetail: null,
  detailLoading: false,
  detailError: null,

  fetchProducts: async (page = 1) => {
    set({ loading: true, error: null })
    try {
      const limit = get().limit
      const data = await productApi.getProducts(page, limit)
      set({
        products: data.products,
        total: data.total,
        page,
        loading: false,
      })
    } catch (e) {
      set({ error: (e as Error).message, loading: false })
    }
  },

  fetchProductDetail: async (id: number) => {
    set({ detailLoading: true, detailError: null, productDetail: null })
    try {
      const product = await productApi.getProduct(id)
      set({ productDetail: product, detailLoading: false })
    } catch (e) {
      set({ detailError: (e as Error).message, detailLoading: false })
    }
  },
}))
