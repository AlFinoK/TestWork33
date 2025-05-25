'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '../Button'
import s from './Pagination.module.scss'

interface PaginationProps {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPrev, onNext }) => {
  const t = useTranslations('pagination')

  return (
    <div className={s.root}>
      <Button variant="primary" size="sm" onClick={onPrev} disabled={page === 1}>
        {t('prev')}
      </Button>
      <span className={s.pageInfo}>
        {t('page')} {page} {t('of')} {totalPages}
      </span>
      <Button variant="primary" size="sm" onClick={onNext} disabled={page === totalPages}>
        {t('next')}
      </Button>
    </div>
  )
}
