'use client'

import { LoginForm } from '@/entities/auth'
import s from './page.module.scss'

export default function LoginPage() {
  return (
    <div className={s.page}>
      <LoginForm />
    </div>
  )
}
