'use client'

import React from 'react'

import { UserBox } from '@/shared/ui-kit'
import { useUserStore } from '@/entities/user'

export const User = () => {
  const { user } = useUserStore()

  return <UserBox data={user} />
}
