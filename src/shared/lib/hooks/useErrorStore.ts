import { create } from 'zustand'

type ErrorStoreState = {
  serverError: any | null
  setServerError: (error: any | null) => void
  clearServerError: () => void
}

export const useErrorStore = create<ErrorStoreState>((set) => ({
  serverError: null,
  setServerError: (error) => set({ serverError: error }),
  clearServerError: () => set({ serverError: null }),
}))
