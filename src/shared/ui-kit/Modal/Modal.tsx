'use client'

import clsx from 'clsx'
import { ReactNode, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

import { Button } from '../Button'
import s from './Modal.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
  closeButton?: boolean
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  closeButton = false,
}: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={s.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={s.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={s.wrapper}>
        <div className={clsx(s.panel, className)}>
          <div className={s.top}>
            {title && (
              <h2 id="modal-title" className={s.title}>
                {title}
              </h2>
            )}
            {closeButton && (
              <Button className={s.close} variant="clear" onClick={onClose}>
                <XMarkIcon width={24} height={24} color={'rgba(55, 55, 55, 1)'} />
              </Button>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
