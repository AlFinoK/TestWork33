'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/entities/auth'

export const AuthInitializer = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return null
}
