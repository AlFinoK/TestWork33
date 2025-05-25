'use client'

import { useTranslations } from 'next-intl'

import s from './Footer.module.scss'
import { useAuthStore } from '@/entities/auth'
import { useUserStore } from '@/entities/user'

export const Footer = () => {
  const t = useTranslations('footer')
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
                <p className={s.loggedAs}>{t('loggedAs')}</p>
                <p className={s.userEmail}>{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
