import React from 'react'

import { Button } from '../Button'
import s from './Pagination.module.scss'

interface PaginationProps {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className={s.root}>
      <Button variant="primary" size="md" onClick={onPrev} disabled={page === 1}>
        Prev
      </Button>
      <span className={s.pageInfo}>
        Page {page} of {totalPages}
      </span>
      <Button variant="primary" size="md" onClick={onNext} disabled={page === totalPages}>
        Next
      </Button>
    </div>
  )
}
