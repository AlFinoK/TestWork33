'use client'

import Image from 'next/image'
import { useSectionScroll } from '@/shared/lib'
import { useTranslations } from 'next-intl'
import { Link } from '@/shared/config'

import s from './Footer.module.scss'
import { useAuthStore } from '@/entities/auth'
import { useUserStore } from '@/entities/user'

export const Footer = () => {
  const t = useTranslations()
  const { isAuthenticated } = useAuthStore()
  const { user } = useUserStore()
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.inner}>
          <div className={s.content}>
            <div className={s.date}>
              <p>{new Date().getFullYear()}</p>
            </div>
            {isAuthenticated && (
              <div className={s.userInfo}>
                <p className={s.loggesAs}>logged as</p>
                <p className={s.userEmail}>{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
