import { create } from 'zustand'

import { authApi } from '@/shared/api'
import { useUserStore } from '@/entities/user'
import { useErrorStore, User } from '@/shared/lib'

import { authService } from './authService'

type AuthState = {
  isAuthenticated: boolean
  authChecked: boolean
  loading: boolean
  personalData: User | null
  checkAuth: () => Promise<void>
  signIn: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  authChecked: false,
  loading: false,
  personalData:
    typeof window !== 'undefined' && localStorage.getItem('personaldata')
      ? JSON.parse(localStorage.getItem('personaldata')!)
      : null,

  checkAuth: async () => {
    const isValid = await authService.checkAuth()

    if (!isValid) {
      useUserStore.getState().clearUser()
      localStorage.removeItem('personaldata')
      set({ isAuthenticated: false, authChecked: true, personalData: null })
      return
    }

    try {
      const data = await authApi.getCurrentUser()
      useUserStore.getState().setUser(data)
      localStorage.setItem('personaldata', JSON.stringify(data))
      set({ isAuthenticated: true, authChecked: true, personalData: data })
    } catch (error) {
      useUserStore.getState().clearUser()
      localStorage.removeItem('personaldata')
      set({ isAuthenticated: false, authChecked: true, personalData: null })
    }
  },

  signIn: async (username, password) => {
    set({ loading: true })
    useErrorStore.getState().clearServerError()

    try {
      await authService.signIn(username, password)

      const data = await authApi.getCurrentUser()
      useUserStore.getState().setUser(data)
      localStorage.setItem('personaldata', JSON.stringify(data))
      set({ isAuthenticated: true, loading: false, personalData: data })
    } catch (error: any) {
      useErrorStore
        .getState()
        .setServerError(error?.response?.data?.message || error.message || 'error')
      set({ loading: false })
      throw error
    }
  },

  logout: () => {
    authService.logout()
    localStorage.removeItem('personaldata')
    useUserStore.getState().clearUser()
    set({ isAuthenticated: false, authChecked: true, personalData: null })
  },
}))
