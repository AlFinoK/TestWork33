import { create } from 'zustand'

import { Product } from '@/shared/lib'

interface CartState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  clearCart: () => void
  isInCart: (productId: number) => boolean
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => {
    if (get().items.find((item) => item.id === product.id)) return
    set((state) => ({ items: [...state.items, product] }))
  },

  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== productId) })),

  clearCart: () => set({ items: [] }),

  isInCart: (productId) => {
    return get().items.some((item) => item.id === productId)
  },
}))
