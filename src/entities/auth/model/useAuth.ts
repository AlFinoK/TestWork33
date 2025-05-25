'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { authApi, tokenService } from '@/shared/api'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)

  const signIn = async (username: string, password: string) => {
    setLoading(true)
    try {
      const res = await authApi.login(username, password)

      const { accessToken, refreshToken } = res
      tokenService.saveTokens({ accessToken, refreshToken })
      toast.success('Успешный вход')
      return res
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Ошибка входа'
      toast.error(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    tokenService.clearTokens()
    toast('Вы вышли из системы')
  }

  const getToken = () => tokenService.getAccessToken() || ''

  return {
    signIn,
    signOut,
    getToken,
    loading,
  }
}
