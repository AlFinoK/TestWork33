'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import { UserIcon } from '@heroicons/react/20/solid'

import { loginURL } from '@/shared/lib'
import { useAuthStore } from '@/entities/auth'
import { Button, LangSwitcher, Modal, useModal, UserBox } from '@/shared/ui-kit'
import { useUserStore } from '@/entities/user'

import s from './Header.module.scss'
import { ContactInfo } from './ContactInfo'

export const Header = () => {
  const router = useRouter()
  const t = useTranslations('header')
  const { open, isOpen, close } = useModal()
  const { isAuthenticated, logout } = useAuthStore()
  const { user } = useUserStore()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev)
  const handleLogin = () => router.push(loginURL)
  const handleLogout = () => {
    logout()
    router.push(loginURL)
  }

  return (
    <>
      <header className={s.header}>
        <div className="container">
          <div className={s.inner}>
            <div className={s.left}>
              <ContactInfo />
            </div>

            <div className={clsx(s.right, isMobileMenuOpen && s.mobileMenuOpen)}>
              <LangSwitcher />

              {isAuthenticated ? (
                <>
                  <UserBox data={user} />

                  <Button
                    size="auto"
                    variant="clear"
                    onClick={isMobileMenuOpen ? handleLogout : open}
                  >
                    <UserIcon color="#D10125" width={16} height={16} />
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="clear" onClick={handleLogin}>
                    <UserIcon color="#D10125" width={16} height={16} />
                    {t('login')}
                  </Button>
                </>
              )}
              <ContactInfo className={s.mobileOnly} />
            </div>

            <Button
              variant="clear"
              size="sm"
              className={s.burger}
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
              type="button"
            >
              {[...Array(3)].map((_, i) => (
                <span key={i} className={clsx(s.burgerLine, isMobileMenuOpen && s.open)} />
              ))}
            </Button>
          </div>
        </div>
      </header>

      <Modal className={s.modal} isOpen={isOpen} onClose={close} title={t('modal.title')}>
        <p className={s.modalDescr} dangerouslySetInnerHTML={{ __html: t('modal.description') }} />
        <div className={s.modalBtns}>
          <Button variant="border" onClick={close}>
            {t('modal.cancel')}
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            {t('modal.confirm')}
          </Button>
        </div>
      </Modal>
    </>
  )
}
